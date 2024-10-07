import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import AuthProviders from "@/context/authProvider";

export const metadata: Metadata = {
  title: "Mystery Messages App",
  description:
    "This is a mystery messages app where you can send messages anonymously",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProviders>
        <body>
          <Navbar />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="h-screen w-full overflow-hidden">{children}</div>
            <Toaster />
          </ThemeProvider>
        </body>
      </AuthProviders>
    </html>
  );
}
