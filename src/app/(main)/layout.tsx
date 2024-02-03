import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/app/_components/theme/theme-provider";
import { Header } from "~/app/_components/header/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>
            <div className="flex h-screen flex-col">
              <Header />
              {children}
            </div>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
