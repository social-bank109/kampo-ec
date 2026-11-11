"use client";
import React from "react";
import { Palette, AppBar, Badge, CTA, SectionHead, ContinuityCards, SafetyNotes, Footer } from "./ui";
import {
  LINE_ADD_FRIEND_URL,
  TRIAL_PLAN,
  TRIAL_PRICE_LABEL,
  CONSULTATION_ONLY_FEE,
  CONSULTATION_ONLY_FEE_INLINE,
  findConcern,
} from "./data";
import type { Go } from "./navigation";

/** 相談前にご確認いただく事項（まとめて1つのチェックで同意） */
const ACK_ITEMS = [
  "本サービスは自由診療です（公的医療保険は適用されません）",
  "表示価格はすべて税込です",
  "医師の判断により、処方されない場合があります",
  "副作用や体調変化がある場合は、医師・薬剤師にご相談ください",
  "緊急性のある症状がある場合は、近隣の医療機関にご相談ください",
];

export default function ScreenConsult({ go }: { go: Go }) {
  const [allAcked, setAllAcked] = React.useState(false);

  // 体質チェック結果・主訴カードから引き継いだ相談テーマ（?concern=...&concern2=...）
  const [topics, setTopics] = React.useState<{ primary?: string; secondary?: string }>({});
  React.useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const primary = findConcern(q.get("concern"))?.title;
    const secondary = findConcern(q.get("concern2"))?.title;
    setTopics({ primary, secondary: secondary !== primary ? secondary : undefined });
  }, []);

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

      {topics.primary && (
        <section
          style={{
            margin: "20px 16px 0",
            padding: "16px 16px",
            background: Palette.roseTint,
            border: `0.5px solid #e6cfd6`,
            borderRadius: 16,
          }}
        >
          <div style={{ fontSize: 11, color: Palette.ink3 }}>ご相談予定のテーマ</div>
          <div className="serif" style={{ fontSize: 17, color: Palette.roseDeep, marginTop: 2 }}>{topics.primary}</div>
          {topics.secondary && (
            <div style={{ fontSize: 12, color: Palette.ink2, marginTop: 4 }}>あわせて：{topics.secondary}</div>
          )}
          <div style={{ fontSize: 11.5, color: Palette.ink2, marginTop: 8, lineHeight: 1.75 }}>
            LINEの友だち追加後、問診で「{topics.primary}
            {topics.secondary ? `・${topics.secondary}` : ""}について相談したい」とお伝えください。
          </div>
        </section>
      )}

      <section
        style={{
          margin: "20px 16px",
          padding: "16px 16px",
          background: "#fff",
          borderRadius: 16,
          border: `1px solid ${Palette.roseDeep}`,
        }}
      >
        <div style={{ fontSize: 11, color: Palette.ink3 }}>ご利用いただくプラン</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, flexWrap: "wrap", marginTop: 2 }}>
          <div className="serif" style={{ fontSize: 17, color: Palette.ink }}>{TRIAL_PLAN.name}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
            <span className="serif" style={{ fontSize: 22, color: Palette.ink }}>¥{TRIAL_PLAN.price.toLocaleString()}</span>
            <span style={{ fontSize: 11, color: Palette.ink3 }}>/ 月（税込）</span>
          </div>
        </div>
        <div style={{ fontSize: 11.5, color: Palette.ink2, marginTop: 6, lineHeight: 1.75 }}>
          サービス開始初期は{TRIAL_PLAN.name}の1プランのみでご案内しています。料金プランを選ぶ必要はありません。
        </div>
      </section>

      <section style={{ margin: "0 16px 20px", padding: "18px 18px", background: "#fff", borderRadius: 16, border: `0.5px solid ${Palette.line}` }}>
        <SectionHead kicker="Continuity" title="継続しやすい診療・配送設計" />
        <ContinuityCards />
      </section>

      <section style={{ margin: "0 16px 16px", padding: "18px 18px", background: Palette.paper2, borderRadius: 16 }}>
        <SectionHead kicker="Before you book" title="相談前のご確認" sub="以下の内容をご確認のうえ、お申し込みください。" />
        <ul
          style={{
            margin: 0,
            padding: "12px 14px 12px 32px",
            background: "#fff",
            border: `0.5px solid ${Palette.line}`,
            borderRadius: 12,
            fontSize: 12.5,
            color: Palette.ink,
            lineHeight: 1.85,
          }}
        >
          {ACK_ITEMS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <label
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 14px",
            background: allAcked ? Palette.roseTint : "#fff",
            border: `${allAcked ? 1 : 0.5}px solid ${allAcked ? Palette.roseDeep : Palette.line}`,
            borderRadius: 12,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={allAcked}
            onChange={(e) => setAllAcked(e.target.checked)}
            style={{ width: 20, height: 20, accentColor: Palette.roseDeep, flexShrink: 0 }}
          />
          <div style={{ flex: 1, fontSize: 13.5, color: Palette.ink, fontWeight: 500, lineHeight: 1.6 }}>
            上記の内容を確認し、同意します
          </div>
        </label>
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
          {CONSULTATION_ONLY_FEE_INLINE}
        </div>
        <div style={{ fontSize: 11, color: Palette.ink3, textAlign: "center", lineHeight: 1.7 }}>
          LINEの友だち追加 → 問診 → 予約の順に進みます。
          <br />
          この時点では料金は発生しません。
        </div>
        <CTA variant="ghost" onClick={() => go("check")}>
          先に体質チェックをする
        </CTA>
        <CTA variant="ghost" onClick={() => go("pricing")}>
          お試しプランを見る
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
              a: `本サービスは自由診療のため、公的医療保険は適用されません。料金は${TRIAL_PRICE_LABEL}です。なお、医師の診察の結果、漢方薬を処方しない判断となった場合は診察料${CONSULTATION_ONLY_FEE.toLocaleString()}円（税込）がかかります。`,
            },
            {
              q: "どのプランを選べばいいですか？",
              a: `現在はサービス開始初期のため、お試しプラン${TRIAL_PLAN.price.toLocaleString()}円（税込）の1プランでご案内しています。プランを選んでいただく必要はなく、どんな悩みを相談したいかをお伝えいただければ、医師が症状・体質・既往歴・服薬状況等を確認して判断します。なお、今後はライト・ベーシック・スタンダード・集中ケアの4プランへ順次拡充する予定です。`,
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
              a: "初回は原則30日分を処方し、約1か月後に再診を行います。問題なく継続できる場合は、その後は原則3か月ごとに診察し、90日分をまとめて処方・発送します。",
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
