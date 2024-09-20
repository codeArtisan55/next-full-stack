import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/Navbar";
import AuthProviders from "@/context/authProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mystery Messages App",
  description: "This is a mystery messages app where you can send messages anonymously",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProviders>
      <body className={inter.className}>
        <Navbar/>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
        {children}
        <Toaster />
        </ThemeProvider>
      </body>
      </AuthProviders>
    </html>
  );
}
