import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/context/CardContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GharSadhan",
  description: "Provide Yourself  Goods And Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <Navbar />
              {children}
              <Toaster />
            </CartProvider>
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
