import type { Metadata } from "next";
import "./globals.css";
import AwwwardsCursor from "@/components/AwwwardsCursor";
import AwwwardsInteractiveCards from "@/components/AwwwardsInteractiveCards";
import PageTransition from "@/components/PageTransition";

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
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        {/*
          Blocking script — runs synchronously before first paint.
          If the user already visited in this session, immediately hide
          the SSR-rendered #astra-loader so there is no loader flicker on revisit.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  if (sessionStorage.getItem('astra_loaded')) {
                    var s = document.createElement('style');
                    s.id = 'astra-skip-loader-style';
                    s.textContent = '#astra-loader { display: none !important; }';
                    document.head.appendChild(s);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AwwwardsCursor />
        <AwwwardsInteractiveCards />
        {/* Loader overlay — rendered by SSR to cover the screen from frame 0 */}
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
