import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

import localFont from "next/font/local";
import { Providers } from "./providers";
const myFont = localFont({
  src: [
    {
      path: "./UberMoveMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./UberMoveBold.otf",
      weight: "700",
      style: "bold",
    },
  ],
});

export const metadata: Metadata = {
  title: "Aditya Sahasranam",
  description: "biryani enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${myFont.className} dark`}>
      <body >
        <div className="bg-black lowercase">
          <Providers>
            <Navbar />
            {children}{" "}
          </Providers>
        </div>
      </body>
    </html>
  );
}
