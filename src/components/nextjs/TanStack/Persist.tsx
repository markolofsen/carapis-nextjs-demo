'use client';

import React, { useEffect, useRef, useState } from 'react';

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { settings } from '@/core/settings';

import type { DehydratedState } from '@tanstack/react-query';

interface TanStackProviderProps {
    dehydratedState: DehydratedState;
    children: React.ReactNode;
}

export default function TanStackProvider({ children, dehydratedState }: TanStackProviderProps) {
    const [isHydrated, setIsHydrated] = useState(false);
    const [queryClient] = React.useState(() => new QueryClient());

    // Ensure hydration happens after the first render on the client side
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (typeof window === 'undefined' || !isHydrated) {
        // SSR: return children immediately during SSR, skip hydration mismatch
        return <>{children}</>;
    }

    // Create persister for localStorage
    const persister = createSyncStoragePersister({
        storage: window.localStorage,
    });

    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister,
                maxAge: 1000 * 60 * 60 * 24, // 24h
                buster: 'v1.0.0', // update when release
            }}
        >
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={dehydratedState}>
                    {children}
                </HydrationBoundary>
                {settings.isDev && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
        </PersistQueryClientProvider>
    );
}
