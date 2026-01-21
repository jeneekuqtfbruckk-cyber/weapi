import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/shell/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WEAPI - The Geek's Holy Land",
  description: "Premium API Aggregation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary",
          inter.variable
        )}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
