import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Canada Easy Guide – Immigration, PR & Settlement",
    template: "%s | Canada Easy Guide",
  },
  description:
    "Expert guides on Canadian immigration, Express Entry, PNP, study permits, work permits, and settling in Canada. Trusted resource for newcomers.",
  keywords: [
    "Canada immigration",
    "Express Entry",
    "PR Canada",
    "study in Canada",
    "work permit Canada",
    "PNP",
    "settle in Canada",
    "Canada visa 2025",
  ],
  openGraph: {
    siteName: "Canada Easy Guide",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
