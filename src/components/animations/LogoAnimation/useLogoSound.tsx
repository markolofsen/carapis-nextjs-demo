import { useCallback, useEffect, useRef } from 'react';

const LAUGH_SOUND_URL = '/static/sounds/logo_laugh.wav'; // Path to the laugh sound file

export const useLogoSound = () => {
    const laughSoundRef = useRef<HTMLAudioElement | null>(null);

    // Initialize and clean up the audio element
    useEffect(() => {
        // Create audio object only on the client side
        if (typeof window !== 'undefined') {
            laughSoundRef.current = new Audio(LAUGH_SOUND_URL);
            // Preload (optional, might improve playback speed on first click)
            laughSoundRef.current.load();
        }

        return () => {
            // Cleanup on unmount
            if (laughSoundRef.current) {
                laughSoundRef.current.pause(); // Stop if playing
                laughSoundRef.current = null; // Remove reference
            }
        };
    }, []); // Empty dependency array to run only once

    // Function to play the sound
    const playLaughSound = useCallback(() => {
        if (laughSoundRef.current) {
            laughSoundRef.current.currentTime = 0; // Start from the beginning
            laughSoundRef.current.play().catch((error) => {
                // Ignore autoplay errors (e.g., if user hasn't interacted with the page)
                console.error("Audio play failed:", error);
            });
        }
    }, []);

    // Return the play function
    return {
        playLaughSound,
    };
}; 