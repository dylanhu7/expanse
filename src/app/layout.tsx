import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "~/app/(main)/_components/theme/theme-provider";
import { getServerAuthSession } from "~/server/auth";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { Button } from "./(main)/_components/ui/button";

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
              <div className="flex h-screen flex-col items-center justify-center">
                <h1 className="mb-2 text-6xl font-semibold">Expanse</h1>
                <p className="text-xl">
                  Experience your work in a whole new{" "}
                  <i className="font-semibold">space</i>.
                </p>
                <Button asChild className="mt-8">
                  <Link href="/api/auth/signin">
                    <p className="mr-2">Enter the expanse</p>
                    <ArrowRightIcon />
                  </Link>
                </Button>
              </div>
            )}
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
