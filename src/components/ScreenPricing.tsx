"use client";
import React from "react";
import { Palette, AppBar, SectionHead, PricingTable, ContinuityCards, SafetyNotes, Footer, CTA, Badge } from "./ui";
import type { Go } from "./navigation";

export default function ScreenPricing({ go }: { go: Go }) {
  return (
    <div style={{ background: Palette.paper, minHeight: "100%" }}>
      <AppBar title="お試しプラン" variant="paper" onBack={() => go("top")} />
      <div style={{ padding: "22px 22px 0" }}>
        <Badge>自由診療 · お試しプラン</Badge>
        <h1 className="serif" style={{ fontSize: 22, color: Palette.ink, lineHeight: 1.55, margin: "12px 0 0", letterSpacing: 0.02 }}>
          まずは、お試しプランから
        </h1>
        <p style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, marginTop: 10 }}>
          VISTA Wellnessはサービス開始初期、お試しプラン1つでご案内します。
          料金体系をシンプルにし、まずは医師に相談しながら医療用漢方を試していただける設計です。
        </p>
        <p style={{ fontSize: 12, color: Palette.ink3, lineHeight: 1.8, marginTop: 6 }}>
          料金プランを選ぶ必要はありません。どんな悩みを医師に相談したいかを整理して、オンライン診療をお受けください。
        </p>
      </div>

      <div style={{ padding: "20px 16px" }}>
        <PricingTable onSelect={() => go("order")} />
      </div>

      <section style={{ margin: "0 16px 22px", padding: "20px 18px", background: "#fff", border: `0.5px solid ${Palette.line}`, borderRadius: 18 }}>
        <SectionHead kicker="Continuity" title="継続しやすい診療・配送設計" />
        <ContinuityCards />
      </section>

      <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <CTA variant="rose" onClick={() => go("check")}>
          体質チェックをはじめる
        </CTA>
        <CTA variant="ghost" onClick={() => go("order")}>
          オンライン診療で相談する
        </CTA>
      </div>

      <section style={{ padding: "0 16px 12px" }}>
        <SafetyNotes />
      </section>

      <Footer />
    </div>
  );
}
