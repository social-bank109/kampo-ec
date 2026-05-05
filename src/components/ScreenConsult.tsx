"use client";
import React from "react";
import { Palette, AppBar, Badge, CTA, SectionHead, ContinuityCards, SafetyNotes, Footer } from "./ui";
import { LINE_ADD_FRIEND_URL } from "./data";
import type { Go } from "./navigation";

type AckId = "freedom" | "tax" | "doctor" | "side" | "emergency";
const ACKS: { id: AckId; label: string }[] = [
  { id: "freedom", label: "自由診療であることを理解しました" },
  { id: "tax", label: "表示価格は税別であることを理解しました" },
  { id: "doctor", label: "医師の判断により処方されない場合があることを理解しました" },
  { id: "side", label: "副作用や体調変化がある場合は医師・薬剤師に相談します" },
  { id: "emergency", label: "緊急性のある症状がある場合は、近隣の医療機関に相談します" },
];

export default function ScreenConsult({ go }: { go: Go }) {
  const [acks, setAcks] = React.useState<Record<AckId, boolean>>({
    freedom: false,
    tax: false,
    doctor: false,
    side: false,
    emergency: false,
  });
  const allAcked = ACKS.every((a) => acks[a.id]);

  return (
    <div style={{ background: Palette.paper, minHeight: "100%" }}>
      <AppBar title="相談する" variant="paper" onBack={() => go("top")} />
      <div style={{ padding: "22px 22px 0" }}>
        <Badge>オンライン診療</Badge>
        <h1 className="serif" style={{ fontSize: 22, color: Palette.ink, lineHeight: 1.55, margin: "12px 0 0", letterSpacing: 0.02 }}>
          オンライン診療で、
          <br />
          あなたに合う漢方を相談
        </h1>
        <p style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, marginTop: 10 }}>
          VISTA Wellnessでは、提携クリニックの医師がオンラインで症状・体質・服薬状況を確認し、
          必要に応じて医療用漢方を処方します。
          <br />
          処方内容は、問診結果だけで自動決定されるものではありません。医師が診療のうえ、処方の可否を判断します。
        </p>
      </div>

      <section style={{ margin: "20px 16px", padding: "18px 18px", background: "#fff", borderRadius: 16, border: `0.5px solid ${Palette.line}` }}>
        <SectionHead kicker="Continuity" title="継続しやすい診療・配送設計" />
        <ContinuityCards />
      </section>

      <section style={{ margin: "0 16px 16px", padding: "18px 18px", background: Palette.paper2, borderRadius: 16 }}>
        <SectionHead kicker="Before you book" title="相談前のご確認" sub="以下の内容に同意のうえ、お申し込みください。" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ACKS.map((a) => (
            <label
              key={a.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 12px",
                background: "#fff",
                border: `0.5px solid ${Palette.line}`,
                borderRadius: 12,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={acks[a.id]}
                onChange={(e) => setAcks((s) => ({ ...s, [a.id]: e.target.checked }))}
                style={{ width: 18, height: 18, accentColor: Palette.roseDeep, flexShrink: 0 }}
              />
              <div style={{ flex: 1, fontSize: 12.5, color: Palette.ink, lineHeight: 1.6 }}>{a.label}</div>
            </label>
          ))}
        </div>
      </section>

      <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <CTA
          variant="rose"
          disabled={!allAcked}
          onClick={() => {
            if (!allAcked) return;
            window.open(LINE_ADD_FRIEND_URL, "_blank", "noopener,noreferrer");
          }}
        >
          <LineIcon />
          LINEで友だち追加してオンライン診療を予約する
        </CTA>
        <div style={{ fontSize: 11, color: Palette.ink3, textAlign: "center", lineHeight: 1.7 }}>
          LINEの友だち追加 → 問診 → 予約の順に進みます。
          <br />
          この時点では料金は発生しません。
        </div>
        <CTA variant="ghost" onClick={() => go("check")}>
          先に体質チェックをする
        </CTA>
        <CTA variant="ghost" onClick={() => go("pricing")}>
          料金プランを見る
        </CTA>
      </div>

      <section style={{ padding: "0 16px 16px" }}>
        <SectionHead kicker="FAQ" title="よくある質問" />
        <Faq
          items={[
            {
              q: "診療を受けないと処方されませんか？",
              a: "はい。VISTA Wellnessは自由診療のオンライン診療サービスです。初回は必ず提携クリニックの医師の診療を受けていただき、医師が処方の可否を判断します。",
            },
            {
              q: "自由診療とのことですが、保険は使えますか？",
              a: "本サービスは自由診療のため、公的医療保険は適用されません。料金は月額3,800円（税別）から、症状や処方内容に応じて4プランをご用意しています。",
            },
            {
              q: "強い薬が出ることはありますか？",
              a: "扱うのは医療用漢方のみです。睡眠薬・抗不安薬・ホルモン治療薬などは扱っていません。必要と判断された場合は、専門医療機関への相談をご案内します。",
            },
            {
              q: "合わなかったらどうすれば？",
              a: "再診や問診を通じて医師に相談のうえ、処方の変更・休止ができます。無理に続ける必要はありません。",
            },
            {
              q: "配送はどのくらいの頻度ですか？",
              a: "服薬状況が安定している場合、医師判断のもとで60日〜90日分のまとめ配送に対応する場合があります。配送頻度は処方内容や服薬状況により異なります。",
            },
          ]}
        />
      </section>

      <section style={{ padding: "0 16px 12px" }}>
        <SafetyNotes />
      </section>

      <Footer />
    </div>
  );
}

function LineIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.8 6.7-.2.6-.7 2.2-.8 2.5-.1.4.1.4.3.3.2-.1 2.4-1.6 3.4-2.3.8.1 1.5.1 2.3.1 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
    </svg>
  );
}

function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = React.useState<number>(0);
  return (
    <div style={{ background: "#fff", borderRadius: 14, border: `0.5px solid ${Palette.line}`, overflow: "hidden" }}>
      {items.map((it, i) => (
        <div key={i} style={{ borderTop: i === 0 ? "none" : `0.5px solid ${Palette.line}` }}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "none",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "var(--font-sans-stack)",
            }}
          >
            <div style={{ flex: 1, fontSize: 13, color: Palette.ink, lineHeight: 1.6 }}>{it.q}</div>
            <div style={{ transform: `rotate(${open === i ? 180 : 0}deg)`, transition: "transform 0.2s" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M5 9l7 7 7-7" stroke={Palette.ink3} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
          {open === i && (
            <div style={{ padding: "0 16px 16px", fontSize: 12, color: Palette.ink2, lineHeight: 1.85 }}>{it.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
