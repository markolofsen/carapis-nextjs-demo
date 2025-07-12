import { memo, useEffect, useRef } from "react";

import { purple } from "@mui/material/colors";
import { darken, lighten, useTheme } from "@mui/material/styles";

import { animated, config, to, useSpring } from "@react-spring/web";

// hooks
import { useAppearAnimation } from "./useAppearAnimation";
import { useFollowCursor } from "./useFollowCursor";
import { useGradientAnimation } from "./useGradientAnimation";
import { useLogoSound } from "./useLogoSound";
import { useWaveAnimation } from "./useWaveAnimation";

// Create typed animated components to avoid TypeScript issues
const AnimatedPath = animated("path");
const AnimatedCircle = animated("circle");
const AnimatedLinearGradient = animated("linearGradient");
const AnimatedSvg = animated("svg");

interface Props {
  size: number;
  followCursor?: boolean;
  float?: boolean; // Prop for floating animation
  disableHoverEffect?: boolean; // Prop to disable hover jitter effect
}

// Type for gradient stop point
interface GradientStop {
  offset: string;
  stopColor: string;
}

// Main component
const LogoAnimation = ({
  size,
  followCursor = false,
  float = false,
  disableHoverEffect = true,
}: Props) => {
  const theme = useTheme();

  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);

  // Use hooks for animations & sound
  const pathAnimation = useWaveAnimation({ pathRef, disableHoverEffect });
  const { pupilSprings } = useFollowCursor({
    svgRef,
    leftPupilRef,
    rightPupilRef,
    followCursor,
  });
  const gradientAnimation = useGradientAnimation();
  const { playLaughSound } = useLogoSound();
  // Get styles and API for appear/laugh animation
  const [appearStyles, appearApi] = useAppearAnimation();

  // Add float animation spring
  const [floatStyles] = useSpring(() => ({
    from: { y: 0, x: 0, rotation: 0 },
    to: async (next) => {
      // Only animate if float is enabled
      if (float) {
        while (true) {
          // Generate random movement targets
          const targetY = -5 - Math.random() * 8; // Random vertical position (-5 to -13)
          const targetX = Math.random() * 20 - 10; // Random horizontal movement (-10 to 10)
          const rotation = Math.random() * 6 - 3; // Small random rotation (-3 to 3 degrees)

          // Float to random position with slight rotation
          await next({
            y: targetY,
            x: targetX,
            rotation: rotation,
            config: {
              duration: 2000 + Math.random() * 1000,
              easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t), // Custom easing for more ghost-like movement
            },
          });

          // Return to different random position
          await next({
            y: 2 + Math.random() * 5, // Random bottom position (2 to 7)
            x: Math.random() * 16 - 8, // Different horizontal position (-8 to 8)
            rotation: Math.random() * 4 - 2, // Different rotation (-2 to 2 degrees)
            config: {
              duration: 2000 + Math.random() * 1000,
              easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
            },
          });
        }
      }
    },
    config: { tension: 50, friction: 20 },
  }));

  // Start appear animation on mount
  useEffect(() => {
    appearApi.start({
      to: { opacity: 1, scale: 1 },
      config: { ...config.wobbly, tension: 250, friction: 15 }, // Appear config
    });
  }, [appearApi]);

  // Create interpolation for pupil transform style
  const pupilTransform = to(
    [pupilSprings.x, pupilSprings.y],
    (x, y) => `translate(${x}px, ${y}px)`
  );

  const handleClick = () => {
    playLaughSound();
    // Start "laugh" animation (scaling up and back)
    appearApi.start({
      to: async (next) => {
        await next({ scale: 1.15 }); // Scale up a bit more
        await next({ scale: 1 }); // Return to normal
      },
      // Enhance wobbly effect for laugh
      config: { ...config.wobbly, tension: 150, friction: 8 },
    });
  };

  // Define gradient colors based on theme, using lighten/darken
  const lightStops: GradientStop[] = [
    { offset: "0", stopColor: purple[600] },
    { offset: "0.5", stopColor: theme.palette.primary.dark },
    { offset: "1", stopColor: theme.palette.primary.main },
  ];

  const darkStops: GradientStop[] = [
    { offset: "0", stopColor: purple[600] },
    { offset: "0.5", stopColor: theme.palette.primary.dark },
    { offset: "1", stopColor: theme.palette.primary.main },
  ];

  const activeStops = theme.palette.mode === "dark" ? darkStops : lightStops;

  return (
    // Wrap SVG in animated for applying appear animation
    <AnimatedSvg
      ref={svgRef} // ref may also cause errors here, so we ignore
      width={size}
      height={size}
      viewBox="0 -5 91 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        opacity: appearStyles.opacity, // Apply animated opacity
        scale: appearStyles.scale, // Apply animated scale
        // Add transform-origin for scaling from center
        transformOrigin: "center",
        // Add floating animation if enabled
        transform: float
          ? to(
              [floatStyles.x, floatStyles.y, floatStyles.rotation],
              (x, y, rot) => `translate(${x}px, ${y}px) rotate(${rot}deg)`
            )
          : "none",
      }}
    >
      <AnimatedPath
        ref={pathRef}
        fillRule="evenodd"
        clipRule="evenodd"
        d={pathAnimation.d}
        fill="url(#paint0_linear_7709_680)"
        style={{ transform: pathAnimation.transform }}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M61.1779 31.2742C66.6593 31.2742 71.091 35.706 71.091 41.2681C71.091 46.7495 66.6591 51.1813 61.1779 51.1813C55.6158 51.1813 51.1813 46.7493 51.1813 41.2681C51.1813 35.706 55.6158 31.2742 61.1779 31.2742ZM29.9038 31.2742C24.3418 31.2742 19.9087 35.706 19.9087 41.2681C19.9087 46.7495 24.3418 51.1813 29.9038 51.1813C35.384 51.1813 39.8171 46.7493 39.8171 41.2681C39.8171 35.706 35.384 31.2742 29.9038 31.2742Z"
        fill="#F1F0F0" // Eye whites
      />
      <AnimatedCircle
        ref={leftPupilRef}
        cx="29.9"
        cy="41.3"
        r="3.5"
        fill="#0B1319" // Left pupil
        style={{ transform: pupilTransform }}
      />
      <AnimatedCircle
        ref={rightPupilRef}
        cx="61.2"
        cy="41.3"
        r="3.5"
        fill="#0B1319" // Right pupil
        style={{ transform: pupilTransform }}
      />
      <defs>
        <AnimatedLinearGradient
          id="paint0_linear_7709_680"
          x1={gradientAnimation.x1}
          y1={gradientAnimation.y1}
          x2={gradientAnimation.x2}
          y2={gradientAnimation.y2}
          gradientUnits="userSpaceOnUse"
        >
          {/* Render gradient stops dynamically */}
          {activeStops.map((stop, index) => (
            <stop key={index} offset={stop.offset} stopColor={stop.stopColor} />
          ))}
        </AnimatedLinearGradient>
      </defs>
    </AnimatedSvg>
  );
};

export default memo(LogoAnimation);
