import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BRAND, PRICE_RANGE_LABEL } from "@/components/data";
import "./globals.css";

const sans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_TITLE = `VISTA Wellness — ${BRAND.tagline}`;
const SITE_DESCRIPTION = `${BRAND.subtagline} 自由診療・${PRICE_RANGE_LABEL}。`;

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | VISTA Wellness",
  },
  description: SITE_DESCRIPTION,
  applicationName: "VISTA Wellness",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "VISTA Wellness",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fcfaf7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <div className="app-frame">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
