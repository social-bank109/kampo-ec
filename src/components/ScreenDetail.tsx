"use client";
import React from "react";
import { MEDICINES, SIDE_EFFECTS_GENERAL, COMMON_NOTES } from "./data";
import {
  Palette,
  AppBar,
  Badge,
  CTA,
  Hair,
  KampoImage,
  SectionHead,
  Footer,
  planLabelsForMedicine,
} from "./ui";
import type { Go } from "./navigation";

export default function ScreenDetail({ productId, go }: { productId?: string; go: Go }) {
  const m = MEDICINES.find((x) => x.id === productId) || MEDICINES[0];

  return (
    <div style={{ paddingBottom: 96, background: Palette.paper }}>
      <AppBar title={m.name} onBack={() => go("top")} variant="paper" />

      {/* hero */}
      <div style={{ padding: "6px 16px 0" }}>
        <div style={{ background: m.tone ?? Palette.paper2, borderRadius: 18, padding: "20px 18px 14px", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 10, color: m.accent ?? Palette.roseDeep, letterSpacing: 0.18 }}>
                {m.number} · 医療用漢方
              </div>
              <h1 className="serif" style={{ fontSize: 22, color: Palette.ink, margin: "6px 0 0", letterSpacing: 0.03, lineHeight: 1.3 }}>
                {m.name}
              </h1>
              <div style={{ fontFamily: "var(--font-serif-stack)", fontSize: 11, color: Palette.ink3, marginTop: 2, letterSpacing: 0.15 }}>
                {m.kana}
              </div>
            </div>
            <Badge tone="green">医師が診療のうえ処方判断</Badge>
          </div>
          <div style={{ marginTop: 14 }}>
            <KampoImage m={m} height={200} />
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 20px 4px" }}>
        <p style={{ fontSize: 13, color: Palette.ink2, lineHeight: 1.85, margin: 0 }}>{m.lead}</p>

        {/* 対応プラン・対応する悩み */}
        <div style={{ marginTop: 14, padding: "12px 14px", background: "#fff", border: `0.5px solid ${Palette.line}`, borderRadius: 12 }}>
          <div style={{ fontSize: 11, color: Palette.ink3 }}>対応プラン</div>
          <div className="serif" style={{ fontSize: 16, color: Palette.ink, marginTop: 2 }}>
            {planLabelsForMedicine(m)}
          </div>
          <div style={{ fontSize: 11, color: Palette.ink3, marginTop: 6, lineHeight: 1.7 }}>
            ※実際の処方は医師が診療のうえ判断します。料金プランの詳細は{" "}
            <button
              onClick={() => go("pricing")}
              style={{ background: "transparent", border: "none", color: Palette.roseDeep, cursor: "pointer", padding: 0, fontSize: 11 }}
            >
              料金プラン
            </button>
            をご覧ください。
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
          <div style={{ fontSize: 11, color: Palette.ink3, width: "100%", marginBottom: 2 }}>対応する悩み</div>
          {m.concerns.map((t) => (
            <Badge key={t} tone="paper">
              #{t}
            </Badge>
          ))}
        </div>
      </div>

      <Hair m="20px 20px 0" />

      {/* 医師が検討するケース */}
      <Section title="医師が検討するケース" kicker="When considered">
        <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85 }}>
          {(m.doctorConsiders ?? []).map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
        <div style={{ marginTop: 10, fontSize: 11, color: Palette.ink3, lineHeight: 1.7 }}>
          ※上記は一例です。診療時に体質・症状・既往歴・服薬状況を確認のうえ、医師が処方の可否を判断します。
        </div>
      </Section>

      <Hair m="0 20px" />

      {/* 注意が必要なケース */}
      <Section title="注意が必要なケース" kicker="Caution">
        <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85 }}>
          {(m.cautionCases ?? []).map((t, i) => (
            <li key={i}>{t}</li>
          ))}
          <li>妊娠中・授乳中、強い抑うつ・希死念慮、摂食障害が疑われる場合は、専門医療機関への相談を優先してください。</li>
        </ul>
      </Section>

      <Hair m="0 20px" />

      {/* 副作用・リスク */}
      <Section title="副作用・リスクについて" kicker="Side effects">
        <p style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, margin: 0 }}>
          漢方薬でも、体質や併用薬によって副作用が生じることがあります。気になる症状がある場合は服用を中止せず、医師または薬剤師にご相談ください。
        </p>
        <ul style={{ margin: "8px 0 0", padding: "0 0 0 18px", fontSize: 12, color: Palette.ink3, lineHeight: 1.85 }}>
          {SIDE_EFFECTS_GENERAL.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Section>

      <Hair m="0 20px" />

      {/* 共通注意 */}
      <Section title="このページについて" kicker="Disclaimer">
        <div
          style={{
            padding: "12px 14px",
            background: Palette.paper2,
            borderRadius: 10,
            border: `0.5px solid ${Palette.line}`,
            fontSize: 12,
            color: Palette.ink2,
            lineHeight: 1.85,
          }}
        >
          {COMMON_NOTES.detailDisclaimer}
        </div>
      </Section>

      <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <CTA variant="rose" onClick={() => go("check")}>
          体質チェックをはじめる
        </CTA>
        <CTA variant="ghost" onClick={() => go("order")}>
          オンライン診療で相談する
        </CTA>
      </div>

      <Footer />

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
          <div style={{ fontSize: 9.5, color: Palette.ink3, whiteSpace: "nowrap" }}>対応プラン</div>
          <div className="serif" style={{ fontSize: 13, color: Palette.ink, whiteSpace: "nowrap" }}>
            {planLabelsForMedicine(m)}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <CTA variant="rose" small onClick={() => go("check")}>
            体質チェックをはじめる
          </CTA>
        </div>
      </div>
    </div>
  );
}

function Section({ title, kicker, children }: { title: React.ReactNode; kicker?: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "20px 20px" }}>
      <SectionHead kicker={kicker} title={title} />
      {children}
    </div>
  );
}
