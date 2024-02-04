import { getServerAuthSession } from "~/server/auth";
import { ThemeProvider } from "./_components/theme/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Expanse",
  description: "Experience your work in a whole new space.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TRPCReactProvider>
            {session?.user ? (
              children
            ) : (
              <div className="flex h-screen w-screen items-center justify-center">
                <div className="text-center">test</div>
              </div>
            )}
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
