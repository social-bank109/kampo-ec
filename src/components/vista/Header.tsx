"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/config/vista";
import LineCTA from "./LineCTA";
import { CloseIcon, MenuIcon } from "./icons";

export const NAV_ITEMS = [
  { href: "/#kampo", label: "漢方について" },
  { href: "/pricing", label: "料金" },
  { href: "/check", label: "肌荒れ・体調チェック" },
  { href: "/#online", label: "オンライン診療" },
  { href: "/consult", label: "予約から再診までの流れ" },
];

export function Logo() {
  return (
    <>
      {SITE.logoMain} <span>{SITE.logoSub}</span>
      <small>{SITE.logoTagline}</small>
    </>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // ページ遷移したらメニューを閉じる
  useEffect(() => setOpen(false), [pathname]);

  // メニュー表示中は背面スクロールを止め、Esc で閉じる
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="site-header">
      <Link href="/" className="logo" aria-label={`${SITE.name} トップへ`}>
        <Logo />
      </Link>
      <nav className="nav" aria-label="メインナビゲーション">
        {NAV_ITEMS.map((n) => (
          <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
            {n.label}
          </Link>
        ))}
        <LineCTA position="header" size="small" />
      </nav>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      {open && (
        <div id="mobile-menu" className="mobile-menu">
          <nav aria-label="メニュー">
            <ul>
              <li>
                <Link href="/">ホーム<span aria-hidden="true">→</span></Link>
              </li>
              {NAV_ITEMS.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} onClick={() => setOpen(false)}>
                    {n.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#faq" onClick={() => setOpen(false)}>
                  よくあるご質問<span aria-hidden="true">→</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  お問い合わせ<span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </nav>
          <LineCTA position="header" />
          <p className="small-note" style={{ textAlign: "center", marginTop: 10 }}>
            LINE追加だけでは、診療の予約・決済は確定しません。
          </p>
        </div>
      )}
    </header>
  );
}
