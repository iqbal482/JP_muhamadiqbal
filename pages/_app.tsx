require("typeface-roboto");
import "../styles/globals.css";
import { Alert, AlertColor, Snackbar, ThemeProvider } from "@mui/material";
import { theme } from "@utils/theme";
import { AppProps } from "next/app";
import createEmotionCache from "@utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { SessionProvider } from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';
import { ReactElement, ReactNode, useState } from "react";
import { NextPage } from "next";

const clientSideEmotionCache = createEmotionCache();


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

/**
 * 描述
 * @date 2022-09-11
 * @param {any} {Component
 * @param {any} emotionCache=clientSideEmotionCache
 * @param {any} pageProps
 * @return {any}
 */
function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const getLayout = Component.getLayout || ((page) => page);
  const [alert, showAlert] = useState({open: false, message: "", severity: "success"});
  const page = getLayout(
      <Component {...pageProps} showAlert={showAlert} />
  );
  
  return (
    <>
      <NextNProgress />
      <SessionProvider session={pageProps.session}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            {page}
            <Snackbar
              sx={{ position: "fixed", top: 75 }}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={alert.open}
              autoHideDuration={6000}
              onClose={() => showAlert({ ...alert, open: false })}
            >
              <Alert
                onClose={() => showAlert({ ...alert, open: false })}
                severity={alert.severity as AlertColor}
                sx={{ width: "100%" }}
              >
                {alert.message}
              </Alert>
            </Snackbar>
          </ThemeProvider>
        </CacheProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
