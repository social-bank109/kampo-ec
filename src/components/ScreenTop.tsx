"use client";
import React from "react";
import { BRAND, MEDICINES, type Medicine } from "./data";
import {
  Palette,
  Badge,
  CTA,
  SectionHead,
  ConcernGrid,
  PricingTable,
  ContinuityCards,
  HowItWorks,
  SafetyNotes,
  Footer,
  KampoImage,
  iconBtnStyle,
  planLabelsForMedicine,
} from "./ui";
import type { Go } from "./navigation";

export default function ScreenTop({ go }: { go: Go }) {
  const featured = MEDICINES.filter((m) => m.featured).slice(0, 8);

  return (
    <div style={{ background: Palette.paper }}>
      {/* brand header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px 8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, minWidth: 0 }}>
          <div className="serif" style={{ fontSize: 19, color: Palette.ink, letterSpacing: 0.32, fontWeight: 500 }}>
            {BRAND.name}
          </div>
          <div
            style={{
              fontFamily: "var(--font-serif-stack)",
              fontSize: 11.5,
              color: Palette.roseDeep,
              letterSpacing: 0.22,
            }}
          >
            {BRAND.sub}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button aria-label="検索" style={iconBtnStyle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke={Palette.ink2} strokeWidth="1.5" />
              <path d="M20 20l-3.5-3.5" stroke={Palette.ink2} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* HERO */}
      <div
        style={{
          margin: "8px 16px 18px",
          padding: "30px 22px 26px",
          background: Palette.roseTint,
          borderRadius: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          aria-hidden
          style={{ position: "absolute", right: -70, top: -60, opacity: 0.35 }}
        >
          <circle cx="110" cy="110" r="90" fill="none" stroke={Palette.roseDeep} strokeWidth="0.6" />
          <circle cx="110" cy="110" r="62" fill="none" stroke={Palette.roseDeep} strokeWidth="0.4" />
          <circle cx="110" cy="110" r="34" fill={Palette.roseSoft} opacity="0.6" />
        </svg>
        <div style={{ position: "relative", zIndex: 1 }}>
          <Badge>自由診療 · オンライン診療対応</Badge>
          <h1
            className="serif"
            style={{
              fontSize: 26,
              lineHeight: 1.55,
              color: Palette.ink,
              margin: "14px 0 0",
              letterSpacing: 0.02,
            }}
          >
            こころと体のゆらぎに、
            <br />
            医師と選ぶ漢方を。
          </h1>
          <p style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, margin: "12px 0 0" }}>
            PMS・更年期・睡眠の悩み・ストレスによる体調のゆらぎに。
            <br />
            提携クリニックのオンライン診療を通じて、医師が体質や症状を確認し、必要に応じて医療用漢方を処方します。
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            <Badge tone="green">医師が処方判断</Badge>
            <Badge tone="paper">継続処方</Badge>
            <Badge tone="paper">安定後まとめ配送</Badge>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 18, flexWrap: "wrap" }}>
            <CTA small full={false} variant="rose" onClick={() => go("check")}>
              体質チェックをはじめる
              <Arrow />
            </CTA>
            <CTA small full={false} variant="ghost" onClick={() => go("pricing")}>
              料金プランを見る
            </CTA>
          </div>
        </div>
      </div>

      {/* Why VISTA */}
      <section style={{ margin: "0 16px 18px", padding: "18px 18px", background: "#fff", border: `0.5px solid ${Palette.line}`, borderRadius: 14 }}>
        <SectionHead kicker="Why VISTA" title="自己判断ではなく、医師と選ぶ漢方ケア。" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              t: "医師が体質・症状を確認",
              d: "PMS、更年期、不眠、不安、むくみなどの悩みを問診・診療で確認。体質や既往歴、服薬状況を踏まえて処方を判断します。",
            },
            {
              t: "医療用漢方を継続しやすく",
              d: "医療機関で用いられる漢方エキス製剤を、オンライン診療後にご自宅へ。安定後はまとめ配送にも対応します。",
            },
            {
              t: "月額3,800円から始められる",
              d: "ライト、ベーシック、スタンダード、集中ケアの4プラン。症状や処方内容に応じて、続けやすいプランをご案内します。",
            },
          ].map((x, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  flexShrink: 0,
                  borderRadius: 999,
                  background: Palette.roseTint,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 1,
                }}
                aria-hidden
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6.5l2.8 2.8L10 3.5" stroke={Palette.roseDeep} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div className="serif" style={{ fontSize: 14, color: Palette.ink, lineHeight: 1.55 }}>
                  {x.t}
                </div>
                <div style={{ fontSize: 11.5, color: Palette.ink3, marginTop: 2, lineHeight: 1.75 }}>{x.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Concern */}
      <section style={{ padding: "0 18px", marginBottom: 22 }}>
        <SectionHead kicker="By concern" title="気になる悩みから相談する" />
        <ConcernGrid onPick={() => go("check")} />
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        style={{
          margin: "0 16px 22px",
          padding: "20px 18px",
          background: Palette.paper2,
          borderRadius: 18,
        }}
      >
        <SectionHead
          kicker="Pricing"
          title="続けやすい、4つの定期診療プラン"
          sub="VISTA Wellnessでは、症状の重さや処方内容に応じて、4つの自由診療プランをご用意しています。初回は医師が体質・症状・服薬状況を確認し、必要に応じて医療用漢方を処方します。安定後は、まとめ配送により通院や受け取りの負担を抑えながら継続できます。"
        />
        <PricingTable onSelect={() => go("check")} />
      </section>

      {/* Formulations */}
      <section style={{ padding: "0 18px", marginBottom: 14 }}>
        <SectionHead
          kicker="Formulations"
          title="医師が診療のうえ処方する医療用漢方"
          sub="以下は取り扱い候補の一例です。実際の処方は、オンライン診療で医師が体質・症状・既往歴・服薬状況を確認したうえで判断します。"
        />
      </section>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "4px 16px 24px" }}>
        {featured.map((m) => (
          <MedicineCard key={m.id} m={m} onClick={() => go("detail", m.id)} />
        ))}
      </div>

      {/* Continuity */}
      <section style={{ margin: "0 16px 22px", padding: "20px 18px", background: "#fff", border: `0.5px solid ${Palette.line}`, borderRadius: 18 }}>
        <SectionHead kicker="Continuity" title="継続しやすい診療・配送設計" />
        <ContinuityCards />
      </section>

      {/* How it works */}
      <section
        style={{
          margin: "0 16px 22px",
          padding: "22px 20px",
          background: Palette.greenTint,
          borderRadius: 18,
        }}
      >
        <SectionHead kicker="How it works" title="はじめかた" />
        <HowItWorks />
        <div style={{ marginTop: 16 }}>
          <CTA variant="rose" onClick={() => go("check")}>
            体質チェックをはじめる
          </CTA>
        </div>
      </section>

      {/* Safety */}
      <section style={{ padding: "0 16px 12px" }}>
        <SafetyNotes />
      </section>

      <Footer />
    </div>
  );
}

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MedicineCard({ m, onClick }: { m: Medicine; onClick: () => void }) {
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
      <div style={{ width: 96, flexShrink: 0 }}>
        <KampoImage m={m} height={120} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 9.5, color: Palette.ink3, letterSpacing: 0.1 }}>
              {m.number}
            </div>
            <Badge tone="green">医師が診療のうえ処方判断</Badge>
          </div>
          <div className="serif" style={{ fontSize: 15.5, color: Palette.ink, marginTop: 4, letterSpacing: 0.04 }}>
            {m.name}{" "}
            <span style={{ fontSize: 10.5, color: Palette.ink3, fontWeight: 400 }}>（{m.kana}）</span>
          </div>
          <div style={{ fontSize: 11.5, color: Palette.ink2, marginTop: 5, lineHeight: 1.6 }}>{m.lead}</div>
          <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}>
            {m.concerns.slice(0, 3).map((c) => (
              <span
                key={c}
                style={{
                  fontSize: 10,
                  color: Palette.ink3,
                  background: Palette.paper2,
                  border: `0.5px solid ${Palette.line}`,
                  padding: "2px 7px",
                  borderRadius: 999,
                }}
              >
                #{c}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, gap: 8 }}>
          <div style={{ fontSize: 11, color: Palette.ink2 }}>
            <span style={{ color: Palette.ink3 }}>対応プラン：</span>
            {planLabelsForMedicine(m)}
            <div style={{ fontSize: 10, color: Palette.ink3, marginTop: 2 }}>※医師の診療により処方判断</div>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: Palette.roseDeep, fontWeight: 500, whiteSpace: "nowrap" }}>
            詳細を見る
            <Arrow />
          </div>
        </div>
      </div>
    </button>
  );
}
