import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/config/vista";
import { VISTA_ASSETS } from "@/config/vistaAssets";
import { publicFileExists } from "@/lib/assets";
import "./globals.css";

const sans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
const serif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});
const en = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-en",
  display: "swap",
});

/** Google Tag Manager のコンテナ ID */
const GTM_ID = "GTM-T2DXVQVQ";

// OGP 画像は public/images/vista/og-image.webp を置くと自動で設定される
const ogImage = publicFileExists(VISTA_ASSETS.og.src)
  ? [{ url: VISTA_ASSETS.og.src, width: VISTA_ASSETS.og.width, height: VISTA_ASSETS.og.height, alt: SITE.name }]
  : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "ja_JP",
    images: ogImage,
  },
  twitter: {
    card: ogImage ? "summary_large_image" : "summary",
    title: SITE.title,
    description: SITE.description,
    images: ogImage?.map((i) => i.url),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf8f5",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${sans.variable} ${serif.variable} ${en.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script async src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
