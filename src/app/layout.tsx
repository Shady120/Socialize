"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navabar from "./_Navabar/Navabar";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "./theme";
import { Toaster } from 'react-hot-toast';
import { store } from "./lib/store";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import AuthGuard from "./AuthGuard/AuthGuard";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
 

export default function RootLayout({
 
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store} >
        <Navabar/>
        <AuthGuard >
        {children}
        </AuthGuard>
        <Toaster/>
        </Provider>
        </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
