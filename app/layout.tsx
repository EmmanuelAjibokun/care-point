import type { Metadata } from "next";
// import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provide";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
const fontSans = {
  subsets: ["latin"],
  weights: ["300", "400", "500", "600", "700"],
  variable: "--font-sans"
}

export const metadata: Metadata = {
  title: "HealthPlus",
  description: "A healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen bg-dark-300 font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
