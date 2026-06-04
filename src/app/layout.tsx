import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  title: {
    default: "VISTA Wellness — 女性のゆらぎに、医師と選ぶ漢方を。",
    template: "%s | VISTA Wellness",
  },
  description:
    "市販では手に入りにくい医療用漢方を、提携クリニックのオンライン診療を経てお届けします。女性のゆらぎに寄り添う、医師と選ぶ漢方サービス。",
  applicationName: "VISTA Wellness",
  robots: { index: true, follow: true },
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
