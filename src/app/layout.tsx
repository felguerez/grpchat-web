import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cover Chat",
  description: "Nice place to hang out and design data-intensive apps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 		<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍾</text></svg>">
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍾</text></svg>"
        ></link>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
