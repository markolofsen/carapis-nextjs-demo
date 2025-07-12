import React from 'react';

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { settings } from '@/core/settings';

import type { DehydratedState } from '@tanstack/react-query';

interface TanStackProviderProps {
    dehydratedState: DehydratedState
    children: React.ReactNode
}

export default function TanStackProvider({ children, dehydratedState }: TanStackProviderProps) {
    const [queryClient] = React.useState(() => new QueryClient())

    if (settings.isProd || true) {
        return (
            children
        )
    }

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
            <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition='top-right'
            />
        </QueryClientProvider>
    )
}