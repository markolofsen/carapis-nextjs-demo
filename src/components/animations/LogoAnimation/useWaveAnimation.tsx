import { useEffect, useState } from 'react';

import { animated, easings, to, useSpring } from '@react-spring/web';

interface Props {
    pathRef?: React.RefObject<SVGPathElement | null>;
    disableHoverEffect?: boolean;
}

export const useWaveAnimation = ({ pathRef, disableHoverEffect = false }: Props) => {
    const [isHovered, setIsHovered] = useState(false);

    // Paths: normal and two wave variants
    const normalPath = 'M0 45.5386C0 20.4723 20.4723 0 45.5413 0C70.5274 0 91.0008 20.4723 91.0008 45.5386V82.4567C91.0008 88.1796 87.0496 90.354 83.0203 85.2779C79.1522 80.4406 76.2503 73.9124 73.9124 73.9124C70.1247 73.9124 67.3034 91.001 59.7255 91.001C52.1504 91.001 49.3292 73.9124 45.5415 73.9124C41.6705 73.9124 38.8506 91.001 31.2742 91.001C23.6979 91.001 20.8765 73.9124 17.0875 73.9124C14.7508 73.9124 11.8489 80.4406 7.97946 85.2779C3.94876 90.3538 0 88.1796 0 82.4567V45.5386Z';
    const wavePath1 = 'M0 45.5C0 20.5 20.5 0 45.5 0C70.5 0 91 20.5 91 45.5V82.5C91 91 87 95 83 90C79 85 76 77 74 77C70 77 67 93 60 93C52 93 49 72 45.5 72C42 72 39 93 31 93C24 93 21 77 17 77C15 77 12 85 8 90C4 95 0 91 0 82.5V45.5Z'; // Variant 1
    const wavePath2 = 'M0 45.5C0 20.5 20.5 0 45.5 0C70.5 0 91 20.5 91 45.5V82.5C91 93 87 97 83 92C79 87 77 79 74 79C70 79 67 95 59.5 95C52 95 49 71 45.5 71C42 71 39 95 31.5 95C24 95 21 79 17 79C15 79 12 87 8 92C4 97 0 93 0 82.5V45.5Z'; // Variant 2

    // Animation for 'd' attribute with random path selection (accelerated)
    const { d } = useSpring({
        from: { d: normalPath },
        to: async (next) => {
            while (true) {
                const nextWavePath = Math.random() > 0.5 ? wavePath1 : wavePath2;
                await next({ d: nextWavePath });
                await next({ d: normalPath });
            }
        },
        config: {
            tension: (!disableHoverEffect && isHovered) ? 350 : 130,
            friction: (!disableHoverEffect && isHovered) ? 25 : 22,
            duration: (!disableHoverEffect && isHovered) ? 200 : 900, // Reduced by ~2x
        },
    });

    // Убираем дрожание при наведении, возвращаем пустой объект трансформации
    const transform = to([0, 0], () => 'translate(0px, 0px)');

    // Mouse hover handlers
    useEffect(() => {
        // Если эффект отключен, не добавляем обработчики
        if (disableHoverEffect) return;

        const svgElement = pathRef?.current?.closest('svg');
        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);
        svgElement?.addEventListener('mouseenter', handleMouseEnter);
        svgElement?.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            svgElement?.removeEventListener('mouseenter', handleMouseEnter);
            svgElement?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [pathRef, disableHoverEffect]);

    // Return animated values: only shape change (d)
    return {
        d, // Animated 'd' attribute
        transform, // Теперь нет дрожания
    };
};
