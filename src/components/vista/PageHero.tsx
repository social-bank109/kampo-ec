import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  sub,
  plain = false,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  plain?: boolean;
  crumbs?: { href?: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-hero ${plain ? "page-hero--plain" : ""}`}>
      <div className="container">
        {crumbs && (
          <nav aria-label="パンくずリスト">
            <ol className="breadcrumb">
              <li>
                <Link href="/">ホーム</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label}>
                  <span aria-hidden="true">/ </span>
                  {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {sub && <p className="sub">{sub}</p>}
        {children}
      </div>
    </section>
  );
}
