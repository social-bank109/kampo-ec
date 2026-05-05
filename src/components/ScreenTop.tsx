"use client";
import React from "react";
import { PRODUCTS, type Product } from "./data";
import {
  Palette,
  Badge,
  CTA,
  SectionHead,
  PriceRow,
  PlaceholderJar,
  Disclaimer,
  iconBtnStyle,
} from "./ui";

type Go = (name: string, pid?: string) => void;

export default function ScreenTop({ go }: { go: Go }) {
  const listRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <div style={{ paddingBottom: 90, background: Palette.paper }}>
      {/* brand header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px 8px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, minWidth: 0 }}>
          <div className="serif" style={{ fontSize: 19, color: Palette.ink, letterSpacing: 0.32, whiteSpace: "nowrap", flexShrink: 0, fontWeight: 500 }}>
            VISTA
          </div>
          <div style={{ fontFamily: "var(--font-serif-stack)", fontSize: 11.5, color: Palette.sageDeep, letterSpacing: 0.22, whiteSpace: "nowrap" }}>
            Wellness
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button style={iconBtnStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke={Palette.ink2} strokeWidth="1.5" />
              <path d="M20 20l-3.5-3.5" stroke={Palette.ink2} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button style={iconBtnStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M6 7v11a2 2 0 002 2h8a2 2 0 002-2V7M9 7V5a3 3 0 016 0v2" stroke={Palette.ink2} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={{ margin: "8px 16px 18px", padding: "30px 22px 26px", background: Palette.sageTint, borderRadius: 20, position: "relative", overflow: "hidden" }}>
        <svg width="220" height="220" viewBox="0 0 220 220" style={{ position: "absolute", right: -70, top: -60, opacity: 0.35 }}>
          <circle cx="110" cy="110" r="90" fill="none" stroke={Palette.sageDeep} strokeWidth="0.6" />
          <circle cx="110" cy="110" r="62" fill="none" stroke={Palette.sageDeep} strokeWidth="0.4" />
          <circle cx="110" cy="110" r="34" fill={Palette.sageSoft} opacity="0.6" />
        </svg>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Badge>医療用漢方 · 提携クリニック処方</Badge>
          <div className="serif" style={{ fontSize: 25, lineHeight: 1.6, color: Palette.ink, marginTop: 14, letterSpacing: 0.02, textWrap: "pretty" as React.CSSProperties["textWrap"] }}>
            女性のゆらぎに、
            <br />
            医師と選ぶ漢方を。
          </div>
          <div style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, marginTop: 12 }}>
            市販では手に入りにくい医療用の漢方を、
            <br />
            提携クリニックの診療を経てあなたに合うものだけお届けします。
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
            <CTA small full={false} variant="sage" onClick={() => go("check")}>
              体質チェック（約2分）
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </CTA>
            <CTA small full={false} variant="ghost" onClick={() => listRef.current?.scrollIntoView?.({ behavior: "smooth" })}>
              処方を見る
            </CTA>
          </div>
        </div>
      </div>

      {/* differentiator */}
      <div style={{ margin: "0 16px 18px", padding: "16px 18px", background: "#fff", border: `0.5px solid ${Palette.line}`, borderRadius: 14 }}>
        <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 9.5, color: Palette.sageDeep, letterSpacing: 0.18, textTransform: "uppercase" }}>
          Why VISTA
        </div>
        <div className="serif" style={{ fontSize: 16, color: Palette.ink, marginTop: 6, lineHeight: 1.6 }}>
          市販の漢方では、
          <br />
          手が届かない処方があります。
        </div>
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
          {[
            ["医療用だから選べる", "女神散・温経湯・加味帰脾湯など、薬局では入手しにくい処方が中心。"],
            ["自己選択ではなく、医師が見立て", "『自分に合うひとつ』をクリニックと一緒に選べます。"],
            ["保険適用で月1,500〜3,000円台", "診療料を含めても、続けやすい負担に。*3割負担の目安"],
          ].map(([t, d], i) => (
            <div key={i} style={{ display: "flex", gap: 10 }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  flexShrink: 0,
                  borderRadius: 999,
                  background: Palette.sageTint,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 1,
                }}
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6.5l2.8 2.8L10 3.5" stroke={Palette.sageDeep} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div className="serif" style={{ fontSize: 13.5, color: Palette.ink, lineHeight: 1.55 }}>
                  {t}
                </div>
                <div style={{ fontSize: 11, color: Palette.ink3, marginTop: 2, lineHeight: 1.7 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* trust strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, margin: "0 16px 22px", border: `0.5px solid ${Palette.line}`, borderRadius: 12, background: "#fff" }}>
        {[
          ["提携クリニック", "医師がオンライン診療"],
          ["医療用漢方", "エキス顆粒・医療機関品質"],
          ["保険適用", "3割負担 月1,500円〜"],
        ].map(([t, s], i) => (
          <div key={i} style={{ padding: "12px 8px", textAlign: "center", borderLeft: i === 0 ? "none" : `0.5px solid ${Palette.line}` }}>
            <div className="serif" style={{ fontSize: 12.5, color: Palette.ink }}>{t}</div>
            <div style={{ fontSize: 10, color: Palette.ink3, marginTop: 3 }}>{s}</div>
          </div>
        ))}
      </div>

      {/* by concern */}
      <div style={{ padding: "0 18px", marginBottom: 8 }}>
        <SectionHead kicker="By concern" title="気になるゆらぎからさがす" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
          {["冷えとほてり", "周期のゆらぎ", "のぼせ・めまい", "のどのつかえ", "眠れない夜", "肌の乾き・かゆみ"].map((t, i) => (
            <button
              key={i}
              style={{
                background: "#fff",
                border: `0.5px solid ${Palette.line}`,
                borderRadius: 12,
                padding: "12px 14px",
                textAlign: "left",
                fontFamily: "var(--font-sans-stack)",
                fontSize: 13,
                color: Palette.ink2,
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* products */}
      <div ref={listRef} style={{ padding: "14px 18px 0" }}>
        <SectionHead kicker="Formulations" title="医師が処方する、医療用漢方" sub="すべて提携クリニックのオンライン診療を経てのお届けです。" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "4px 16px 24px" }}>
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} p={p} onClick={() => go("detail", p.id)} />
        ))}
      </div>

      <HowItWorks onCheck={() => go("check")} />
      <Disclaimer />
    </div>
  );
}

function ProductCard({ p, onClick }: { p: Product; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        gap: 14,
        padding: 12,
        background: "#fff",
        border: `0.5px solid ${Palette.line}`,
        borderRadius: 16,
        cursor: "pointer",
        textAlign: "left",
        alignItems: "stretch",
        fontFamily: "var(--font-sans-stack)",
      }}
    >
      <div style={{ width: 92, flexShrink: 0 }}>
        <PlaceholderJar tone={p.tone} accent={p.accent} label={p.no} h={120} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 9.5, color: Palette.ink3, letterSpacing: 0.1 }}>{p.no}</div>
            {p.rxOnly && (
              <div
                style={{
                  fontSize: 9,
                  color: Palette.sageDeep,
                  padding: "1px 6px",
                  borderRadius: 999,
                  background: Palette.sageTint,
                  whiteSpace: "nowrap",
                  letterSpacing: 0.04,
                }}
              >
                医療用のみ
              </div>
            )}
          </div>
          <div className="serif" style={{ fontSize: 15.5, color: Palette.ink, marginTop: 2, letterSpacing: 0.04 }}>
            {p.formula} <span style={{ fontSize: 10.5, color: Palette.ink3, fontWeight: 400 }}>（{p.ruby}）</span>
          </div>
          <div style={{ fontSize: 11.5, color: Palette.ink2, marginTop: 5, lineHeight: 1.6 }}>{p.concern}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <PriceRow price={p.price} small />
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: Palette.sageDeep, fontWeight: 500 }}>
            詳しく見る
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

function HowItWorks({ onCheck }: { onCheck: () => void }) {
  const steps = [
    { n: "01", t: "体質チェック", d: "2分ほどの質問で、いまのゆらぎの傾向を整理します。" },
    { n: "02", t: "オンライン診療", d: "提携クリニックの医師がLINE/ビデオで約10分、処方の可否を判断します。" },
    { n: "03", t: "自宅へお届け", d: "処方された漢方エキス顆粒をご自宅へ。以降は定期便で。" },
  ];
  return (
    <div style={{ margin: "14px 16px 22px", padding: "22px 20px", background: Palette.paper2, borderRadius: 18 }}>
      <SectionHead kicker="How it works" title="はじめかた" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {steps.map((s) => (
          <div key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 999,
                background: "#fff",
                border: `0.5px solid ${Palette.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono-stack)",
                fontSize: 11,
                color: Palette.sageDeep,
                flexShrink: 0,
              }}
            >
              {s.n}
            </div>
            <div style={{ flex: 1 }}>
              <div className="serif" style={{ fontSize: 14, color: Palette.ink }}>{s.t}</div>
              <div style={{ fontSize: 11.5, color: Palette.ink2, lineHeight: 1.75, marginTop: 2 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <CTA variant="sage" onClick={onCheck}>
          まずは体質チェックから
        </CTA>
      </div>
    </div>
  );
}
