"use client";
import React from "react";
import { Palette, AppBar, SectionHead, PricingTable, ContinuityCards, SafetyNotes, Footer, CTA, Badge } from "./ui";
import type { Go } from "./navigation";

export default function ScreenPricing({ go }: { go: Go }) {
  return (
    <div style={{ background: Palette.paper, minHeight: "100%" }}>
      <AppBar title="料金プラン" variant="paper" onBack={() => go("top")} />
      <div style={{ padding: "22px 22px 0" }}>
        <Badge>自由診療 · 定期診療プラン</Badge>
        <h1 className="serif" style={{ fontSize: 22, color: Palette.ink, lineHeight: 1.55, margin: "12px 0 0", letterSpacing: 0.02 }}>
          続けやすい、4つの定期診療プラン
        </h1>
        <p style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, marginTop: 10 }}>
          VISTA Wellnessでは、症状の重さや処方内容に応じて、4つの自由診療プランをご用意しています。
          初回は医師が体質・症状・服薬状況を確認し、必要に応じて医療用漢方を処方します。
          安定後は、まとめ配送により通院や受け取りの負担を抑えながら継続できます。
        </p>
      </div>

      <div style={{ padding: "20px 16px" }}>
        <PricingTable onSelect={() => go("check")} />
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
