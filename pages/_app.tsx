import 'styles/main.css';
import 'styles/chrome-bug.css';
import { useEffect, useState } from 'react';
import React from 'react';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  Paper
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import Layout from 'components/Layout';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import NextApp, { AppProps, AppContext } from 'next/app';
import { MyUserContextProvider } from 'utils/useUser';
import type { Database } from 'types_db';
import { getCookie, setCookie } from 'cookies-next';

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark'
  };
};

export default function App({
  Component,
  pageProps,
  ...props
}: any & { colorScheme: ColorScheme }) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30
    });
  };

  return (
    <>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              theme={{ colorScheme }}
              withGlobalStyles
              withNormalizeCSS
            >
              <NotificationsProvider>
                <Paper>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </Paper>
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </MyUserContextProvider>
      </SessionContextProvider>
    </>
  );
}
