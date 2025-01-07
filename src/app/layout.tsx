"use client";
// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// redux setup
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";

const interRegular = localFont({
  src: "./fonts/Inter_18pt-Regular.ttf",
  variable: "--interRegular",
  weight: "100 400",
});

const interMedium = localFont({
  src: "./fonts/Inter_18pt-Medium.ttf",
  variable: "--interMedium",
  weight: "400 500",
});

const interSemiBold = localFont({
  src: "./fonts/Inter_18pt-SemiBold.ttf",
  variable: "--interSemiBold",
  weight: "600 700",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interRegular.variable} ${interMedium.variable} ${interSemiBold.variable} antialiased`}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
