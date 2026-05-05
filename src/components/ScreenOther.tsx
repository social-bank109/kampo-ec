"use client";
import React from "react";
import { Palette, AppBar, Badge, CTA, SectionHead, Disclaimer, FlowDiagram } from "./ui";

type Go = (name: string, pid?: string) => void;

export function ScreenConsult({ go }: { go: Go }) {
  return (
    <div style={{ paddingBottom: 110, background: Palette.paper, minHeight: "100%" }}>
      <AppBar title="相談する" variant="paper" onBack={() => go("top")} />
      <div style={{ padding: "22px 22px 0" }}>
        <Badge>医師に相談</Badge>
        <div className="serif" style={{ fontSize: 24, color: Palette.ink, lineHeight: 1.55, marginTop: 12, letterSpacing: 0.02 }}>
          気になることを、
          <br />
          そのまま話してみませんか。
        </div>
        <div style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, marginTop: 10 }}>
          医師が短時間のオンライン診療で、いまの体調と合う漢方を一緒に探します。 事前の問診はLINEから、ビデオ通話は約10分です。
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>
        <div style={{ padding: "18px 18px", background: "#fff", borderRadius: 16, border: `0.5px solid ${Palette.line}` }}>
          <FlowDiagram />
        </div>
      </div>

      <div style={{ padding: "0 16px" }}>
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
          この段階では料金は発生しません
        </div>
      </div>

      <div style={{ padding: "22px 16px" }}>
        <SectionHead kicker="FAQ" title="よくある質問" />
        <Faq
          items={[
            { q: "診療を受けないと購入できませんか？", a: "はい。VISTA Wellnessで扱う漢方はすべて医療用のため、初回は必ず提携クリニックのオンライン診療を受けていただきます。医師が体調をうかがい、処方の可否を判断します。" },
            { q: "診療の料金はどのくらいですか？", a: "初回診療料は ¥1,650 です。処方される漢方は保険適用で、3割負担の場合は月1,500〜3,000円程度が目安です。" },
            { q: "市販の漢方と何が違いますか？", a: "VISTAで扱う処方の多くは、薬局では入手しにくい医療用の漢方です。医師があなたの体質に合う『ひとつ』を見立てて処方します。" },
            { q: "強い薬が出ることはありますか？", a: "扱うのは医療用漢方のみです。睡眠薬・抗不安薬・ホルモン治療薬などは扱っていません。" },
            { q: "合わなかったらどうすれば？", a: "チャットから医師に相談のうえ、処方の変更・休止ができます。無理に続ける必要はありません。" },
          ]}
        />
      </div>

      <Disclaimer />
    </div>
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

export function ScreenMe({ go }: { go: Go }) {
  return (
    <div style={{ paddingBottom: 110, background: Palette.paper, minHeight: "100%" }}>
      <AppBar title="マイページ" variant="paper" onBack={() => go("top")} />
      <div style={{ padding: "22px 22px 10px" }}>
        <div className="serif" style={{ fontSize: 22, color: Palette.ink, letterSpacing: 0.02 }}>
          こんにちは。
        </div>
        <div style={{ fontSize: 12, color: Palette.ink3, marginTop: 4 }}>
          まだ診療を受けていません。体質チェックから始めてみませんか。
        </div>
      </div>

      <div style={{ padding: "8px 16px" }}>
        <div style={{ padding: "16px 18px", background: Palette.sageTint, borderRadius: 16 }}>
          <div className="serif" style={{ fontSize: 15, color: Palette.ink, lineHeight: 1.55 }}>
            まずは見立てを。
          </div>
          <div style={{ fontSize: 11.5, color: Palette.ink2, marginTop: 6, lineHeight: 1.7 }}>
            質問に答えるだけで、いまの体調の傾向とおすすめの漢方が分かります。
          </div>
          <div style={{ marginTop: 12 }}>
            <CTA variant="sage" onClick={() => go("check")}>
              体質チェックをはじめる
            </CTA>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 22px 10px" }}>
        <SectionHead kicker="History" title="これまでの記録" />
        <div
          style={{
            padding: "20px 16px",
            textAlign: "center",
            background: "#fff",
            borderRadius: 14,
            border: `0.5px dashed ${Palette.line}`,
            color: Palette.ink3,
            fontSize: 12,
          }}
        >
          まだ記録はありません
        </div>
      </div>

      <div style={{ padding: "14px 22px 0" }}>
        <SectionHead kicker="Support" title="こまったときは" />
        <div style={{ background: "#fff", borderRadius: 14, border: `0.5px solid ${Palette.line}`, overflow: "hidden" }}>
          {["医師・薬剤師に相談する", "配送・定期便の変更", "プライバシーと利用規約", "特定商取引法に基づく表記"].map((t, i, arr) => (
            <div
              key={i}
              style={{
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                borderBottom: i < arr.length - 1 ? `0.5px solid ${Palette.line}` : "none",
                fontSize: 13,
                color: Palette.ink2,
                cursor: "pointer",
                fontFamily: "var(--font-sans-stack)",
              }}
            >
              <div style={{ flex: 1 }}>{t}</div>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path d="M9 5l7 7-7 7" stroke={Palette.ink4} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
