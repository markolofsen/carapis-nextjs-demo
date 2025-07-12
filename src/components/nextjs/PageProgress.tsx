import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { Box, LinearProgress } from '@mui/material';

const PageProgress = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const progressTimer = useRef<NodeJS.Timeout | null>(null);

    // Simulate realistic progress
    const startFakeProgress = () => {
        // Clear any existing timer
        if (progressTimer.current) {
            clearInterval(progressTimer.current);
        }

        setProgress(0);

        // Quickly go to 20% to show immediate feedback
        setTimeout(() => setProgress(20), 50);

        // Then slowly increase to 90% (never reach 100% until actually complete)
        progressTimer.current = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 90) {
                    if (progressTimer.current) {
                        clearInterval(progressTimer.current);
                    }
                    return 90;
                }

                // Slow down as we get closer to 90%
                const increment = 90 - prevProgress;
                return prevProgress + (increment / 10);
            });
        }, 300);
    };

    const completeProgress = () => {
        // Clear any existing timer
        if (progressTimer.current) {
            clearInterval(progressTimer.current);
            progressTimer.current = null;
        }

        // Jump to 100% and then hide after animation duration
        setProgress(100);
        setTimeout(() => {
            setLoading(false);
            setProgress(0);
        }, 300);
    };

    useEffect(() => {
        const handleRouteChangeStart = (url: string, { shallow }: { shallow: boolean }) => {
            if (!shallow) {
                setLoading(true);
                startFakeProgress();
            }
        };

        const handleRouteChangeComplete = () => {
            completeProgress();
        };

        const handleRouteChangeError = () => {
            completeProgress();
        };

        router.events.on('routeChangeStart', handleRouteChangeStart);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        router.events.on('routeChangeError', handleRouteChangeError);

        return () => {
            if (progressTimer.current) {
                clearInterval(progressTimer.current);
            }
            router.events.off('routeChangeStart', handleRouteChangeStart);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            router.events.off('routeChangeError', handleRouteChangeError);
        };
    }, [router.events]);

    if (!loading && progress === 0) {
        return null;
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 9999,
                    height: '3px',
                    opacity: loading ? 1 : 0,
                    transition: 'opacity 300ms linear',
                }}
            >
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: '100%',
                        '& .MuiLinearProgress-bar': {
                            transition: 'transform 0.2s linear',
                        },
                        bgcolor: 'divider',
                    }}
                />
            </Box>
        </>
    );
};

export default PageProgress; 