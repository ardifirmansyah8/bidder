import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import SelectUsers from "@/components/SelectUsers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bidder",
  description: "A simple auction site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <header className="p-4 text-lg bg-white font-bold border-b border-gray-400 shadow-sm fixed w-full flex justify-between">
            <div>Bidder</div>
            <SelectUsers />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
