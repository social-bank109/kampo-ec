import SiteShell from "@/components/vista/SiteShell";
import PageHero from "@/components/vista/PageHero";
import LegalToc from "@/components/vista/LegalToc";

/**
 * 法務・情報ページ共通レイアウト。
 * 本文（children）の文言はページ側でそのまま保持し、見た目・目次・ナビゲーションのみ統一する。
 * 目次は本文中の h2 から自動生成（本文の書き換え不要）。
 */
export default function LegalPage({
  title,
  kicker,
  lead,
  updated,
  toc = true,
  children,
}: {
  title: string;
  kicker?: string;
  lead?: React.ReactNode;
  updated?: string;
  toc?: boolean;
  children: React.ReactNode;
}) {
  return (
    <SiteShell sticky={false}>
      <PageHero plain eyebrow={kicker?.toUpperCase()} title={title} crumbs={[{ label: title }]} sub={lead}>
        {updated && <p className="legal-meta">{updated}</p>}
      </PageHero>
      <div className="container">
        <div className="legal-layout" style={toc ? undefined : { gridTemplateColumns: "minmax(0, 1fr)" }}>
          {toc && <LegalToc />}
          <article className="legal-body" id="legal-body">
            {children}
          </article>
        </div>
      </div>
    </SiteShell>
  );
}
