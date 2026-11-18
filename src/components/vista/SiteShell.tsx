import Header from "./Header";
import Footer from "./Footer";
import StickyCTA from "./StickyCTA";

/**
 * 全ページ共通の枠（ヘッダー・フッター・スマホ固定CTA）。
 * sticky=false のページ（法務・お問い合わせ等）では固定CTAを出さない。
 */
export default function SiteShell({ children, sticky = true }: { children: React.ReactNode; sticky?: boolean }) {
  return (
    <div className={sticky ? "has-sticky" : undefined}>
      <a href="#main" className="skip-link">
        本文へスキップ
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      {sticky && <StickyCTA />}
    </div>
  );
}
