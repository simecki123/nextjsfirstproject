import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const lora = Lora({ style: 'normal', subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Coffee app",
  description: "App for tracking coffee consumption and best coffee makers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
