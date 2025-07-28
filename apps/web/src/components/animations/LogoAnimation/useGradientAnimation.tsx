import { config, useSpring } from '@react-spring/web';

// Initial gradient coordinates
const initialCoords = {
    x1: 0,
    y1: 17.7866,
    x2: 63.0613,
    y2: 104.496,
};

// Oscillation range - Increased
const amplitude = 30;

export const useGradientAnimation = () => {
    const animatedCoords = useSpring({
        from: {
            x1: initialCoords.x1 - amplitude / 2,
            y1: initialCoords.y1 + amplitude / 2,
            x2: initialCoords.x2 + amplitude / 2,
            y2: initialCoords.y2 - amplitude / 2,
        },
        to: {
            x1: initialCoords.x1 + amplitude / 2,
            y1: initialCoords.y1 - amplitude / 2,
            x2: initialCoords.x2 - amplitude / 2,
            y2: initialCoords.y2 + amplitude / 2,
        },
        // Speed up the animation
        config: { ...config.gentle, duration: 2500 },
        loop: { reverse: true }, // Loop with reverse
    });

    return animatedCoords;
}; 