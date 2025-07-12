import { useRouter } from 'next/router';
import { useEffect } from 'react';

import ReactGA from 'react-ga4';

import { settings } from '@/core/settings';

const isGAEnabled = settings.isProd && settings.googleTagId;

export const Analytics = {
    init: () => {
        if (!isGAEnabled) return;
        ReactGA.initialize(settings.googleTagId);
    },

    pageview: (path: string) => {
        if (!isGAEnabled) return;
        ReactGA.send({ hitType: 'pageview', page: path });
    },

    event: (name: string, params: Record<string, any> = {}) => {
        if (!isGAEnabled) return;
        ReactGA.event(name, params);
    },

    setUser: (userId: string) => {
        if (!isGAEnabled) return;
        ReactGA.set({ user_id: userId });
    },
};

export const useGoogleAnalytics = () => {
    const router = useRouter();

    useEffect(() => {
        if (!isGAEnabled) return;

        Analytics.init();
        Analytics.pageview(window.location.pathname + window.location.search);

        const handleRouteChange = (url: string) => {
            Analytics.pageview(url);
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return null;
};

