"use client";
import React from "react";
import { BRAND, MEDICINES, MEDICINE_SECTION_NOTE, TRIAL_PLAN } from "./data";
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
  MedicineCard,
  iconBtnStyle,
} from "./ui";
import type { Go } from "./navigation";

export default function ScreenTop({ go }: { go: Go }) {
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
            提携クリニックのオンライン診療を通じて、あなたの体質や症状に合わせた医療用漢方を医師が処方します。
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            <Badge tone="green">医師が処方判断</Badge>
            <Badge tone="paper">継続処方</Badge>
            <Badge tone="paper">自宅へお届け</Badge>
          </div>
          {/* お試しプラン：サービス開始初期は1プランのみ */}
          <div
            style={{
              marginTop: 18,
              padding: "14px 16px",
              background: "rgba(255,255,255,0.78)",
              border: `0.5px solid #e6cfd6`,
              borderRadius: 14,
            }}
          >
            <div className="serif" style={{ fontSize: 16, color: Palette.ink, lineHeight: 1.5 }}>
              まずは、お試しプランから。
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 4 }}>
              <span className="serif" style={{ fontSize: 26, color: Palette.roseDeep, fontWeight: 500 }}>
                ¥{TRIAL_PLAN.price.toLocaleString()}
              </span>
              <span style={{ fontSize: 11, color: Palette.ink3 }}>/ 月（税込）</span>
            </div>
            <div style={{ fontSize: 12, color: Palette.ink2, lineHeight: 1.75, marginTop: 4 }}>
              月額{TRIAL_PLAN.price.toLocaleString()}円（税込）で、医師に相談しながら医療用漢方を始められます。
            </div>
            <div style={{ fontSize: 11.5, color: Palette.ink, lineHeight: 1.7, marginTop: 6, fontWeight: 500 }}>
              サービス開始初期は「お試しプラン」の1プランのみでご案内しています。
            </div>
            <div style={{ fontSize: 10.5, color: Palette.ink3, lineHeight: 1.7, marginTop: 4 }}>
              今後、ライト・ベーシック・スタンダード・集中ケアの4プランへ順次拡充予定です。
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            <CTA small full={false} variant="rose" onClick={() => go("check")}>
              体質チェックをはじめる
              <Arrow />
            </CTA>
            <CTA small full={false} variant="ghost" onClick={() => go("pricing")}>
              お試しプランを見る
            </CTA>
          </div>
        </div>
      </div>

      {/* Why VISTA */}
      <section
        style={{
          margin: "0 16px 18px",
          padding: "18px 18px",
          background: "#fff",
          border: `0.5px solid ${Palette.line}`,
          borderRadius: 14,
        }}
      >
        <SectionHead kicker="Why VISTA" title="自己判断ではなく、医師と選ぶ漢方ケア。" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              t: "医師が体質・症状を確認",
              d: "PMS、更年期、不眠、不安、むくみなどの悩みを問診・診療で確認。体質や既往歴、服薬状況を踏まえて処方を判断します。",
            },
            {
              t: "医療用漢方を継続しやすく",
              d: "医療機関で用いられる漢方エキス製剤を、オンライン診療後にご自宅へ。初回は原則30日分、継続後は3か月ごとの診察・90日分のまとめ配送に移行します。",
            },
            {
              t: `お試しプラン ${TRIAL_PLAN.price.toLocaleString()}円／月（税込）`,
              d: "サービス開始初期は、料金体系をシンプルにし、お試しプラン1つからスタートします。症状・体質・既往歴・服薬状況等を医師が確認し、必要に応じて医療用漢方を処方します。",
              note: "将来的には4つの診療プランへ拡充予定です。",
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
                {"note" in x && x.note && (
                  <div style={{ fontSize: 10.5, color: Palette.ink3, marginTop: 4, lineHeight: 1.7 }}>※{x.note}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Concern */}
      <section style={{ padding: "0 18px", marginBottom: 22 }}>
        <SectionHead
          kicker="By concern"
          title="気になる悩みから相談する"
          sub="料金プランを選ぶ必要はありません。医師に相談したいテーマを選んでください。"
        />
        <ConcernGrid onPick={(id) => go("order", undefined, { concern: id })} />
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
          title="まずは、お試しプランから"
          sub="VISTA Wellnessはサービス開始初期、お試しプラン1つでご案内します。料金体系をシンプルにし、まずは医師に相談しながら医療用漢方を試していただける設計です。"
        />
        <PricingTable onSelect={() => go("order")} />
      </section>

      {/* Formulations */}
      <section style={{ padding: "0 18px", marginBottom: 14 }}>
        <SectionHead
          kicker="Formulations"
          title="医師が診療のうえ処方する医療用漢方"
          sub={MEDICINE_SECTION_NOTE}
        />
      </section>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "4px 16px 24px" }}>
        {MEDICINES.map((m) => (
          <MedicineCard key={m.id} m={m} onClick={() => go("detail", m.id)} />
        ))}
      </div>

      {/* Continuity */}
      <section
        style={{
          margin: "0 16px 22px",
          padding: "20px 18px",
          background: "#fff",
          border: `0.5px solid ${Palette.line}`,
          borderRadius: 18,
        }}
      >
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
