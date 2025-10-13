
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Header from "@/components/UI/header";
import { Provider } from "@/providers/provider";
import { SITE_CONFIG } from "@/config/site.config";
import { layoutConfig } from "@/config/layout.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Header />
          <main className={`flex flex-col w-full justify-start items-center`} 
            style={{
              height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`
            }}>
            {children}
          </main>
          <footer 
            className={`w-full flex justify-center items-center py-3`}
            style={{height: layoutConfig.footerHeight}}
          >
            <p>{SITE_CONFIG.description}</p>
          </footer>
        </Provider>
        
      </body>
    </html>
  );
}
