import Link from "next/link";
import { SITE } from "@/config/vista";
import { Logo } from "./Header";

const SERVICE_LINKS = [
  { href: "/", label: "ホーム" },
  { href: "/pricing", label: "料金" },
  { href: "/check", label: "肌荒れ・体調チェック" },
  { href: "/consult", label: "予約から再診までの流れ" },
  { href: "/contact", label: "お問い合わせ" },
];

const INFO_LINKS = [
  { href: "/about/jiyu-shinryo", label: "自由診療について" },
  { href: "/legal/iryo-koukoku", label: "医療広告ガイドラインに基づく表示" },
  { href: "/legal/terms", label: "利用規約" },
  { href: "/legal/privacy", label: "プライバシーポリシー" },
  { href: "/legal/tokushoho", label: "特定商取引法に基づく表記（運営会社）" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <Link href="/" className="logo" aria-label={`${SITE.name} トップへ`}>
            <Logo />
          </Link>
          <p className="site-footer__about">
            診療・処方は提携医療機関の医師が行います。
            {SITE.clinic ? `（${SITE.clinic.name}）` : ""}
            <br />
            運営：{SITE.operator}（運営会社は診療・処方を行いません）
            <br />
            自由診療・公的医療保険の適用外です。
          </p>
        </div>
        <div className="site-footer__cols">
          <div>
            <h2>SERVICE</h2>
            <ul>
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>INFORMATION</h2>
            <ul>
              {INFO_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        <span>© {new Date().getFullYear()} VISTA WELLNESS</span>
        <span>Operated by Social Bank, Inc.</span>
      </div>
    </footer>
  );
}
