"use client";

import { Poppins } from "next/font/google";
import { SnackbarProvider } from "notistack";
import { Suspense } from "react";

import Header from "@/components/header";
import Footer from "@/components/footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Unneu</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossOrigin="true" async />
        <script
          src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
          crossOrigin="true" async />
        <script
          src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="true" async />
      </head>

      <body className={`${poppins.className} h-screen`}>
        <SnackbarProvider>
          <Suspense>
            <Header />
            {children}
            <Footer />
          </Suspense>
        </SnackbarProvider>
      </body>
    </html>
  );
}
