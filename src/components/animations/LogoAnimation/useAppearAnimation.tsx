import {
  config,
  SpringRef,
  SpringValue,
  SpringValues,
  useSpring,
} from '@react-spring/web';

// Define the type for target/animated properties
interface AppearProps {
    opacity: number;
    scale: number;
}

// Define the return type for the hook
// SpringValues<T> creates a style object type with SpringValue<...> based on T
// SpringRef<T> refers to the target value type T
type UseAppearAnimationReturn = [SpringValues<AppearProps>, SpringRef<AppearProps>];

// Hook now returns both styles and API for control
export const useAppearAnimation = (): UseAppearAnimationReturn => {
    // useSpring is typed via target values (AppearProps)
    const [styles, api] = useSpring<AppearProps>(() => ({
        from: {
            opacity: 0,
            scale: 0, // Start with zero scale
        },
    }));

    // Types styles (SpringValues<AppearProps>) and api (SpringRef<AppearProps>)
    // should now be inferred correctly
    return [styles, api];
}; 