// import { Header } from "~/app/(main)/_components/header/header";
// import "~/styles/globals.css";

// import { Inter } from "next/font/google";

// import { ThemeProvider } from "~/app/(main)/_components/theme/theme-provider";
// import { TRPCReactProvider } from "~/trpc/react";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`font-sans ${inter.variable}`}>
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//           <TRPCReactProvider>
//             <div className="flex h-screen flex-col">
//               <Header />
//               <div className="h-full overflow-hidden">{children}</div>
//             </div>
//           </TRPCReactProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import { Header } from "~/app/(main)/_components/header/header";
import { ThemeProvider } from "~/app/(main)/_components/theme/theme-provider";
import { Button } from "~/app/_components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const emojis = [
    "🌟",
    "🪐",
    "🛸",
    "🌟",
    "☄️",
    "🌕",
    "🛰️",
    "🛰️",
    "🚀",
    "🚀",
    "👽",
    "👽",
    "👾",
    "👾",
  ];

  return (
    <div className={!session?.user ? "dark" : ""}>
      <ThemeProvider disableTransitionOnChange attribute="class">
        <TRPCReactProvider>
          {session?.user ? (
            <div className="flex h-screen flex-col">
              <Header />
              <div className="h-full overflow-hidden">{children}</div>
            </div>
          ) : (
            <div className="flex h-screen flex-col items-center justify-center">
              {emojis.map((emoji, index) => (
                <span
                  key={index}
                  style={{
                    position: "absolute",
                    left: "-50px",
                    top: `${Math.random() * 95 + 5}%`,
                    animation: `moveAcross ${Math.random() * 30 + 10}s linear ${Math.random() * 5}s infinite`,
                    zIndex: -1,
                  }}
                  className="emoji"
                >
                  {emoji}
                </span>
              ))}
              <h1 className="mb-2 text-6xl font-semibold">Expanse</h1>
              <p className="text-xl">
                Experience your work in a whole new{" "}
                <i className="font-semibold">space</i>.
              </p>
              <Button asChild className="mt-8">
                <Link href="/api/auth/signin">
                  <p className="mr-2">Lift off 🚀 </p>
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          )}
        </TRPCReactProvider>
      </ThemeProvider>
      <Analytics />
    </div>
  );
}
