import { useCallback, useEffect, useRef, useState } from 'react';

import {
  config as springConfig,
  SpringValue,
  to,
  useSpring,
} from '@react-spring/web';

interface Props {
    svgRef: React.RefObject<SVGSVGElement | null>;
    leftPupilRef: React.RefObject<SVGCircleElement | null>;
    rightPupilRef: React.RefObject<SVGCircleElement | null>;
    followCursor: boolean;
}

// Return type for the hook
interface FollowCursorReturn {
    pupilSprings: {
        x: SpringValue<number>;
        y: SpringValue<number>;
    };
}

const IDLE_TIMEOUT = 5000; // 5 seconds
const EYE_RADIUS = 7; // Sclera radius
const PUPIL_PADDING = 2; // Padding so pupils don't stick to the edge

// Helper function to get a random point in a circle
const getRandomPointInCircle = (radius: number) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    return {
        x: distance * Math.cos(angle),
        y: distance * Math.sin(angle),
    };
};

export const useFollowCursor = ({ svgRef, leftPupilRef, rightPupilRef, followCursor }: Props): FollowCursorReturn => {
    const [pupilTarget, setPupilTarget] = useState({ x: 0, y: 0 });
    const [isIdle, setIsIdle] = useState(false);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const idleIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastMoveTimeRef = useRef<number>(Date.now());

    // Animation for both pupils (now unified)
    const pupilSprings = useSpring({
        x: pupilTarget.x,
        y: pupilTarget.y,
        config: isIdle ? springConfig.wobbly : { tension: 400, friction: 30 }, // Different speed for tracking and idle
    });

    // Function to calculate pupil position relative to the cursor
    const calculatePupilPosition = useCallback((event: MouseEvent) => {
        if (!svgRef.current) return { x: 0, y: 0 };

        const rect = svgRef.current.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Use SVG center as the base point (can be refined if needed)
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Approximate eye centers relative to SVG center
        // These values might need adjustment depending on viewBox and size
        const leftEyeRelCenter = { x: 29.9 - 45.5, y: 41.3 - 45 }; // Approximate relative coordinates
        const rightEyeRelCenter = { x: 61.2 - 45.5, y: 41.3 - 45 };

        const calculateOffset = (relCenter: { x: number, y: number }) => {
            // Absolute eye center
            const eyeCenterX = rect.left + rect.width / 2 + relCenter.x * (rect.width / 91); // Scale by viewBox width
            const eyeCenterY = rect.top + rect.height / 2 + relCenter.y * (rect.height / 90); // Scale by viewBox height

            const dx = mouseX - eyeCenterX;
            const dy = mouseY - eyeCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = EYE_RADIUS - PUPIL_PADDING;
            const clampedDistance = Math.min(distance, maxDistance);
            const angle = Math.atan2(dy, dx);
            return {
                x: clampedDistance * Math.cos(angle),
                y: clampedDistance * Math.sin(angle),
            };
        }

        // Return the average offset for simplicity, as pupils move synchronously
        const leftOffset = calculateOffset(leftEyeRelCenter);
        const rightOffset = calculateOffset(rightEyeRelCenter);
        return {
            x: (leftOffset.x + rightOffset.x) / 2,
            y: (leftOffset.y + rightOffset.y) / 2,
        };
    }, [svgRef]);

    // Start/Stop random movement in idle mode
    useEffect(() => {
        if (isIdle && followCursor) {
            const moveEyesRandomly = () => {
                const target = getRandomPointInCircle(EYE_RADIUS - PUPIL_PADDING);
                setPupilTarget(target);
            };
            moveEyesRandomly(); // Move immediately
            idleIntervalRef.current = setInterval(moveEyesRandomly, Math.random() * 1000 + 1000); // Interval 1-2 sec
        } else {
            if (idleIntervalRef.current) {
                clearInterval(idleIntervalRef.current);
                idleIntervalRef.current = null;
            }
            // If exited idle and tracking is enabled, return to center (or cursor if it moved)
            if (!isIdle && followCursor) {
                // Smoothly return to center if cursor hasn't moved since idle started
                // Or it will update in handleMouseMove
                if (Date.now() - lastMoveTimeRef.current > IDLE_TIMEOUT) {
                    setPupilTarget({ x: 0, y: 0 });
                }
            }
        }
        return () => {
            if (idleIntervalRef.current) {
                clearInterval(idleIntervalRef.current);
            }
        };
    }, [isIdle, followCursor]);

    // Mouse move handler
    useEffect(() => {
        if (!followCursor) {
            // Reset when tracking is disabled
            setIsIdle(false);
            setPupilTarget({ x: 0, y: 0 });
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            if (idleIntervalRef.current) clearInterval(idleIntervalRef.current);
            return;
        }

        const handleMouseMove = (event: MouseEvent) => {
            lastMoveTimeRef.current = Date.now();
            if (isIdle) {
                setIsIdle(false); // Exit idle mode
            }
            setPupilTarget(calculatePupilPosition(event));

            // Reset and start idle timer
            if (idleTimerRef.current) {
                clearTimeout(idleTimerRef.current);
            }
            idleTimerRef.current = setTimeout(() => {
                setIsIdle(true);
            }, IDLE_TIMEOUT);
        };

        window.addEventListener('mousemove', handleMouseMove);
        // Initialize timer on enable
        idleTimerRef.current = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (idleTimerRef.current) {
                clearTimeout(idleTimerRef.current);
            }
            // Clear interval on unmount or when followCursor is disabled
            if (idleIntervalRef.current) {
                clearInterval(idleIntervalRef.current);
            }
        };
    }, [followCursor, isIdle, calculatePupilPosition]); // Add isIdle and calculatePupilPosition to dependencies

    return { pupilSprings }; // Return springs for use in the component
};
