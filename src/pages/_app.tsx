import * as React from 'react';

import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';

import Seo from '@/components/nextjs/Seo';
import { ConfirmProvider } from '@carapis/nextjs/components';
import { AuthProvider } from '@carapis/nextjs/context';
import { createEmotionCache, ThemeProvider } from '@carapis/nextjs/theme';

import { settings } from '@/core/settings';
import { determinePageConfig, PageWithConfig } from '@carapis/nextjs/utils';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Routes from '@/core/routes';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// Extends the NextComponentType type to support our static properties
type AppPropsWithConfig = AppProps & {
  Component: PageWithConfig;
  emotionCache?: ReturnType<typeof createEmotionCache>;
};

export default function MyApp(props: AppPropsWithConfig) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  // Use the helper function to get the final config
  const pageConfig = determinePageConfig(Component, pageProps, settings.app.title, settings.app.description);

  return (
    <AppCacheProvider {...props} emotionCache={emotionCache}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000}>
            <Seo pageConfig={pageConfig} />
            <AuthProvider
              config={{
                apiUrl: settings.apiUrl,
                routes: {
                  auth: Routes.auth.default.path,
                  defaultCallback: Routes.home.path,
                  defaultAuthCallback: Routes.auth.default.path,
                },
              }}
            >
              <ConfirmProvider>
                <Component {...pageProps} />
              </ConfirmProvider>
            </AuthProvider>
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
