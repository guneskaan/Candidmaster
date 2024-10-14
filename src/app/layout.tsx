"use client";

import '@rainbow-me/rainbowkit/styles.css';
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '../wagmi';

const inter = Inter({ subsets: ["latin"] });
const client = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={client}>
            <RainbowKitProvider>
              <ThemeProvider attribute="class">
                <Navbar />
                <main className="flex-grow"> {/* Allow main content to grow */}
                  {children}
                </main>
                <Footer /> {/* Footer stays at the bottom */}
              </ThemeProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
