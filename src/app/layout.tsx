import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ASTRA – Next-Gen Gaming Tournament Platform",
  description:
    "ASTRA is a next-generation gaming tournament platform where players compete, climb leaderboards, and win real rewards across their favorite games.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
