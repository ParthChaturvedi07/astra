import type { Metadata } from "next";
import "./globals.css";
import AwwwardsCursor from "@/components/AwwwardsCursor";
import AwwwardsInteractiveCards from "@/components/AwwwardsInteractiveCards";

export const metadata: Metadata = {
  title: "ASTRA – Next-Gen Gaming Tournament Platform",
  description:
    "ASTRA is a next-generation gaming tournament platform where players compete, climb leaderboards, and win real rewards across their favorite games.",
  icons: {
    icon: [
      { url: "/images/astra_logo.png" },
      { url: "/icon.png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/images/astra_logo.png",
    apple: "/images/astra_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AwwwardsCursor />
        <AwwwardsInteractiveCards />
        {children}
      </body>
    </html>
  );
}
