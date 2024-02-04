import { Header } from "~/app/(main)/_components/header/header";
import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { ThemeProvider } from "~/app/(main)/_components/theme/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";

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
              <div className="h-full overflow-hidden">{children}</div>
            </div>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
