"use client";
import React from "react";
import { PRODUCTS, type Product } from "./data";
import {
  Palette,
  AppBar,
  Badge,
  CTA,
  Hair,
  PriceRow,
  PlaceholderJar,
  SectionHead,
  Disclaimer,
  FlowDiagram,
  iconBtnMini,
} from "./ui";

type Go = (name: string, pid?: string) => void;

export default function ScreenDetail({ productId, go }: { productId?: string; go: Go }) {
  const p = PRODUCTS.find((x) => x.id === productId) || PRODUCTS[0];
  const [lineOpen, setLineOpen] = React.useState(false);
  const lineRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (lineOpen) {
      setTimeout(() => {
        lineRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [lineOpen]);

  return (
    <div style={{ paddingBottom: 110, background: Palette.paper }}>
      <AppBar
        title={p.formula}
        onBack={() => go("top")}
        variant="paper"
        right={
          <button style={iconBtnMini}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 3v18l6-4 6 4V3z" stroke={Palette.ink2} strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        }
      />

      {/* hero */}
      <div style={{ padding: "6px 16px 0" }}>
        <div style={{ background: p.tone, borderRadius: 18, padding: "24px 18px 4px", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 10, color: p.accent, letterSpacing: 0.18 }}>{p.no} · 医療用漢方</div>
              <div className="serif" style={{ fontSize: 22, color: Palette.ink, marginTop: 6, letterSpacing: 0.03, lineHeight: 1.3 }}>{p.formula}</div>
              <div style={{ fontFamily: "var(--font-serif-stack)", fontSize: 11, color: Palette.ink3, marginTop: 2, letterSpacing: 0.15 }}>{p.ruby}</div>
              <div className="serif" style={{ fontSize: 12.5, color: p.accent, marginTop: 8, letterSpacing: 0.04 }}>— {p.alias}</div>
            </div>
            <Badge>{p.rxOnly ? "医療用のみ" : "医師処方推奨"}</Badge>
          </div>
          <div className="serif" style={{ fontSize: 16, color: Palette.ink, marginTop: 14, lineHeight: 1.6, letterSpacing: 0.02 }}>{p.headline}</div>
          <div style={{ marginTop: 10 }}>
            <PlaceholderJar tone={p.tone} accent={p.accent} label={`${p.no} package`} h={180} />
          </div>
        </div>
      </div>

      {/* core summary */}
      <div style={{ padding: "22px 20px 4px" }}>
        <div style={{ fontSize: 13, color: Palette.ink2, lineHeight: 1.85 }}>
          {p.concern}に向けて、提携クリニックの医師が見立てたうえでお届けする医療用漢方です。
        </div>

        <div style={{ marginTop: 16, padding: "14px 16px", background: "#fff", border: `0.5px solid ${Palette.line}`, borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10 }}>
            <div>
              <div style={{ fontSize: 10, color: Palette.ink3, letterSpacing: 0.06 }}>保険適用・3割負担の目安</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4, whiteSpace: "nowrap" }}>
                <span className="serif" style={{ fontSize: 22, color: Palette.ink, fontWeight: 500, whiteSpace: "nowrap" }}>
                  月 ¥{p.price.toLocaleString()}
                </span>
                <span style={{ fontSize: 10.5, color: Palette.ink3 }}>前後</span>
              </div>
            </div>
            <div style={{ fontSize: 10, color: Palette.sageDeep, textAlign: "right", lineHeight: 1.55, flexShrink: 0, background: Palette.sageTint, padding: "6px 10px", borderRadius: 10 }}>
              初診料
              <br />
              ¥1,650
            </div>
          </div>
          {p.priceOTC && (
            <div style={{ fontSize: 10.5, color: Palette.ink3, marginTop: 8, lineHeight: 1.6 }}>
              参考：市販（OTC）同等処方は月 ¥{p.priceOTC.toLocaleString()}前後。保険適用の医療用漢方は自己負担が抑えられます。
            </div>
          )}
          {!p.priceOTC && (
            <div style={{ fontSize: 10.5, color: Palette.ink3, marginTop: 8, lineHeight: 1.6 }}>
              この処方は<b style={{ color: Palette.sageDeep }}>市販では入手しにくい</b>医療用漢方です。提携クリニックの診療を経て処方されます。
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
          {p.tags.map((t) => (
            <Badge key={t} tone="paper">
              #{t}
            </Badge>
          ))}
        </div>
      </div>

      <Hair m="22px 20px 0" />

      <Section title="こんな方に向いています" kicker="For you">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {p.who.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Bullet color={p.accent} />
              <div style={{ fontSize: 13, color: Palette.ink2, lineHeight: 1.75, flex: 1 }}>{t}</div>
            </div>
          ))}
        </div>
      </Section>

      <Hair m="0 20px" />

      <Section title="日々のなかで、感じやすい変化" kicker="Subtle shifts" sub="※ 病気の治療・治癒を保証するものではありません。感じ方には個人差があります。">
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {p.hope.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Bullet color={Palette.sageDeep} />
              <div style={{ fontSize: 13, color: Palette.ink2, lineHeight: 1.75, flex: 1 }}>{t}</div>
            </div>
          ))}
        </div>
      </Section>

      <Hair m="0 20px" />

      <Section title="成分と製法" kicker="Ingredients">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {p.ingredients.map((g, i) => (
            <div key={i} style={{ padding: "10px 12px", background: Palette.paper2, borderRadius: 10, border: `0.5px solid ${Palette.line}` }}>
              <div className="serif" style={{ fontSize: 12.5, color: Palette.ink }}>{g.k}</div>
              <div style={{ fontSize: 10.5, color: Palette.ink3, marginTop: 2, lineHeight: 1.6 }}>{g.v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "12px 14px", background: "#fff", border: `0.5px solid ${Palette.line}`, borderRadius: 10, fontSize: 11.5, color: Palette.ink2, lineHeight: 1.7 }}>
          国内の製薬基準に基づき、粉末（エキス顆粒）で製造。添加物を必要最小限にとどめ、 医療機関向けに流通している品質規格を採用しています。
        </div>
      </Section>

      <Hair m="0 20px" />

      <Section title="この処方が、薬局にない理由" kicker="Medical only">
        <div style={{ padding: "14px 16px", background: Palette.sageTint, borderRadius: 12, fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85 }}>
          市販の漢方は「体質を問わず安全に使える」ことを優先して処方内容が整えられています。 一方、医師による見立てが前提の医療用漢方は、今のあなたの体質に合わせて
          <b style={{ color: Palette.sageDeep }}>より選択肢のある処方</b>が可能です。
        </div>
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            ["市販（OTC）", "自分で選ぶ／誰にでも合う汎用処方／保険適用外"],
            ["医療用 / VISTA", "医師が見立てる／体質に合う処方／保険適用"],
          ].map(([t, d], i) => (
            <div key={i} style={{ padding: "12px 12px", background: i === 1 ? "#fff" : "transparent", border: `0.5px solid ${i === 1 ? Palette.sageDeep : Palette.line}`, borderRadius: 10 }}>
              <div className="serif" style={{ fontSize: 12, color: i === 1 ? Palette.sageDeep : Palette.ink2 }}>{t}</div>
              <div style={{ fontSize: 10.5, color: Palette.ink3, marginTop: 4, lineHeight: 1.7 }}>{d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Hair m="0 20px" />

      <Section title="ご利用の流れ" kicker="How it works">
        <FlowDiagram />
      </Section>

      {/* inline LINE */}
      <div ref={lineRef} style={{ padding: "6px 16px 24px" }}>
        {!lineOpen ? (
          <CTA variant="primary" onClick={() => setLineOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            オンライン診療で相談する
          </CTA>
        ) : (
          <LineInline product={p} onChecksuggest={() => go("check")} />
        )}
      </div>

      <div style={{ padding: "0 16px 12px" }}>
        <CTA variant="ghost" onClick={() => go("check")}>
          体質チェックをして提案を受ける
        </CTA>
      </div>

      <Disclaimer />

      {/* sticky bottom bar */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          margin: "0 auto",
          maxWidth: "var(--app-max-width)",
          padding: "10px 14px calc(env(safe-area-inset-bottom, 0px) + 12px)",
          background: "rgba(251,250,246,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: `0.5px solid ${Palette.line}`,
          display: "flex",
          gap: 10,
          alignItems: "center",
          zIndex: 30,
        }}
      >
        <div style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
          <div style={{ fontSize: 9.5, color: Palette.ink3, whiteSpace: "nowrap" }}>保険適用・月額目安</div>
          <div className="serif" style={{ fontSize: 15, color: Palette.ink, whiteSpace: "nowrap" }}>¥{p.price.toLocaleString()}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <CTA variant="sage" small onClick={() => setLineOpen(true)}>
            診療を予約して進む
          </CTA>
        </div>
      </div>
    </div>
  );
}

function Section({ title, kicker, sub, children }: { title: React.ReactNode; kicker?: string; sub?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ padding: "22px 20px" }}>
      <SectionHead kicker={kicker} title={title} sub={sub} />
      {children}
    </div>
  );
}

function Bullet({ color }: { color: string }) {
  return (
    <div style={{ width: 18, display: "flex", justifyContent: "center", paddingTop: 7 }}>
      <div style={{ width: 5, height: 5, borderRadius: 999, background: color }} />
    </div>
  );
}

function LineInline({ product, onChecksuggest }: { product: Product; onChecksuggest: () => void }) {
  return (
    <div style={{ background: "#fff", border: `0.5px solid ${Palette.line}`, borderRadius: 18, overflow: "hidden" }}>
      <div style={{ padding: "16px 18px 14px", background: "linear-gradient(180deg, #f6ecee 0%, #fcfaf7 100%)", borderBottom: `0.5px solid ${Palette.line}` }}>
        <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 10, color: Palette.sageDeep, letterSpacing: 0.18, textTransform: "uppercase" }}>Before you buy</div>
        <div className="serif" style={{ fontSize: 17, color: Palette.ink, marginTop: 6, lineHeight: 1.55 }}>
          『{product.formula}』は
          <br />
          医師の処方が必要な漢方です。
        </div>
        <div style={{ fontSize: 12, color: Palette.ink2, lineHeight: 1.8, marginTop: 8 }}>
          この処方は薬局での入手ができないため、提携クリニックのオンライン診療で医師が体調をうかがいます。
          その場で処方の可否を判断し、あなたに合うかを一緒に確認します。
        </div>
      </div>

      <div style={{ padding: "16px 18px" }}>
        {[
          { k: "所要時間", v: "問診3分 + ビデオ約10分" },
          { k: "診療料", v: "初回 ¥1,650（次回以降は定期便に含まれます）" },
          { k: "受診方法", v: "LINEビデオ通話 / 自宅からそのまま" },
          { k: "お届け", v: "処方後、最短翌々日に自宅へ配送" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: i < 3 ? `0.5px solid ${Palette.line}` : "none" }}>
            <div style={{ width: 76, fontSize: 11, color: Palette.ink3 }}>{r.k}</div>
            <div style={{ flex: 1, fontSize: 12, color: Palette.ink2, lineHeight: 1.7 }}>{r.v}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 16px 16px" }}>
        <button
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 999,
            background: "#06C755",
            color: "#fff",
            border: "none",
            fontFamily: "var(--font-sans-stack)",
            fontWeight: 600,
            fontSize: 14,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.6-.7 2.2-.8 2.5-.1.4.1.4.3.3.2-.1 2.4-1.6 3.4-2.3.8.1 1.5.1 2.3.1 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
          </svg>
          LINEで診療を予約する
        </button>
        <div style={{ fontSize: 10.5, color: Palette.ink3, textAlign: "center", marginTop: 10, lineHeight: 1.7 }}>
          LINEの友だち追加 → 問診 → 予約の順に進みます。
          <br />
          この時点では料金は発生しません。
        </div>
      </div>

      <div style={{ padding: "14px 18px", background: Palette.paper2, borderTop: `0.5px solid ${Palette.line}`, display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ fontSize: 11.5, color: Palette.ink2, flex: 1, lineHeight: 1.65 }}>
          迷っている方は、体質チェックから。
          <br />
          2分であなたに合う処方を見立てます。
        </div>
        <button
          onClick={onChecksuggest}
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            border: `0.5px solid ${Palette.line}`,
            background: "#fff",
            fontSize: 11.5,
            color: Palette.ink,
            cursor: "pointer",
            fontFamily: "var(--font-sans-stack)",
          }}
        >
          チェックする →
        </button>
      </div>
    </div>
  );
}
