"use client";

import theme from '@/theme';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { AuthContextProvider } from '../utils/authContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  </ThemeProvider>
  );
}

export default MyApp;