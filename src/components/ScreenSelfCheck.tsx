"use client";
import React from "react";
import {
  Q1_OPTIONS,
  Q2_OPTIONS,
  Q3_OPTIONS,
  Q4_ITEMS,
  Q5_OPTIONS,
  evaluateAnswers,
  type CheckAnswers,
  type Q1Id,
  type Q5Id,
} from "./data";
import {
  Palette,
  AppBar,
  Badge,
  CTA,
  SectionHead,
  KampoImage,
  Footer,
  planNameById,
  planLabelsForMedicine,
} from "./ui";
import type { Go } from "./navigation";

const TOTAL = 5;

export default function ScreenSelfCheck({ go }: { go: Go }) {
  const [stage, setStage] = React.useState<"intro" | "q" | "result">("intro");
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<CheckAnswers>({});

  const progress = stage === "intro" ? 0 : stage === "result" ? 1 : (idx + 1) / TOTAL;

  function next() {
    if (idx < TOTAL - 1) setIdx(idx + 1);
    else setStage("result");
  }
  function prev() {
    if (stage === "q" && idx === 0) setStage("intro");
    else if (stage === "q") setIdx(idx - 1);
    else if (stage === "result") {
      setStage("q");
      setIdx(TOTAL - 1);
    }
  }
  function restart() {
    setAnswers({});
    setIdx(0);
    setStage("intro");
  }

  const canNext = (() => {
    if (stage !== "q") return false;
    if (idx === 0) return Boolean(answers.q1);
    if (idx === 1) return (answers.q2?.length ?? 0) > 0;
    if (idx === 2) return (answers.q3?.length ?? 0) > 0;
    if (idx === 3) return Boolean(answers.q4); // 全てに「はい/いいえ」回答必須
    if (idx === 4) return Boolean(answers.q5);
    return false;
  })();

  // Q4 は全項目「はい/いいえ」が選ばれているかで完了判定
  const q4AllAnswered =
    answers.q4 != null && Q4_ITEMS.every((i) => i.id in (answers.q4 as Record<string, boolean>));
  const canNextStrict = idx === 3 ? q4AllAnswered : canNext;

  return (
    <div style={{ background: Palette.paper, minHeight: "100%" }}>
      <AppBar
        title="体質チェック"
        onBack={stage === "intro" ? () => go("top") : prev}
        variant="paper"
        right={
          stage !== "intro" ? (
            <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 10, color: Palette.ink3, letterSpacing: 0.08 }}>
              {stage === "result" ? "結果" : `${idx + 1} / ${TOTAL}`}
            </div>
          ) : undefined
        }
      />
      <div style={{ height: 3, background: Palette.paper2 }}>
        <div
          style={{
            height: "100%",
            background: Palette.roseDeep,
            width: `${progress * 100}%`,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {stage === "intro" && <Intro onStart={() => setStage("q")} />}
      {stage === "q" && (
        <Question
          idx={idx}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {stage === "result" && (
        <Result answers={answers} onRestart={restart} go={go} />
      )}

      {stage === "q" && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: "var(--tab-bar-height)",
            margin: "0 auto",
            maxWidth: "var(--app-max-width)",
            padding: "12px 16px 14px",
            background: "rgba(251,250,246,0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: `0.5px solid ${Palette.line}`,
            zIndex: 31,
          }}
        >
          <CTA
            variant={canNextStrict ? "rose" : "paper"}
            disabled={!canNextStrict}
            onClick={() => canNextStrict && next()}
          >
            {idx === TOTAL - 1 ? "結果を見る" : "次へ"}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </CTA>
        </div>
      )}

      {stage !== "q" && <Footer />}
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ padding: "28px 22px 40px" }}>
      <Badge>自己チェック · 診断ではありません</Badge>
      <h1 className="serif" style={{ fontSize: 24, color: Palette.ink, lineHeight: 1.55, margin: "14px 0 0", letterSpacing: 0.02 }}>
        いまの悩みと体質を、
        <br />
        やさしく整理しましょう。
      </h1>
      <p style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, marginTop: 12 }}>
        病名を当てるためのテストではありません。
        生活のなかで感じている不調と、いまの体質・服薬状況を整理し、
        自由診療プランの目安としてご案内します。
      </p>

      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 12 }}>
        {[
          { n: "01", t: "5問・約2分", d: "悩み・症状・体質・安全確認・希望プランの順に進みます。" },
          { n: "02", t: "プランの目安をご提案", d: "あなたに合いそうな自由診療プランの候補と、対応する漢方の例を表示します。" },
          { n: "03", t: "医師が診療のうえ判断", d: "実際の処方は、提携クリニックの医師が診療のうえ判断します。" },
        ].map((p) => (
          <div key={p.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 11, color: Palette.roseDeep, paddingTop: 3, minWidth: 24 }}>
              {p.n}
            </div>
            <div style={{ flex: 1, borderBottom: `0.5px solid ${Palette.line}`, paddingBottom: 12 }}>
              <div className="serif" style={{ fontSize: 14, color: Palette.ink }}>{p.t}</div>
              <div style={{ fontSize: 11.5, color: Palette.ink3, marginTop: 3, lineHeight: 1.7 }}>{p.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <CTA variant="rose" onClick={onStart}>
          はじめる
        </CTA>
      </div>
      <div style={{ fontSize: 10.5, color: Palette.ink3, textAlign: "center", marginTop: 12, lineHeight: 1.7 }}>
        本チェックは診断ではありません。実際の処方の可否は医師が診療のうえ判断します。
      </div>
    </div>
  );
}

function Question({
  idx,
  answers,
  setAnswers,
}: {
  idx: number;
  answers: CheckAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<CheckAnswers>>;
}) {
  if (idx === 0) {
    return (
      <QShell title="一番相談したい悩みを選んでください" sub="複数ある場合は、いちばん気になるものを選んでください。">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {Q1_OPTIONS.map((o) => {
            const on = answers.q1 === o.id;
            return (
              <button key={o.id} onClick={() => setAnswers((a) => ({ ...a, q1: o.id as Q1Id }))} style={optStyle(on)}>
                <Check on={on} shape="circle" />
                <div style={{ flex: 1, textAlign: "left" }}>{o.label}</div>
              </button>
            );
          })}
        </div>
      </QShell>
    );
  }
  if (idx === 1) {
    return (
      <QShell title="現在の症状で当てはまるものを選んでください" sub="複数選択できます。">
        <Multi
          options={Q2_OPTIONS as readonly string[]}
          selected={answers.q2 ?? []}
          onChange={(v) => setAnswers((a) => ({ ...a, q2: v }))}
        />
      </QShell>
    );
  }
  if (idx === 2) {
    return (
      <QShell title="あなたの体質に近いものを選んでください" sub="複数選択できます。">
        <Multi
          options={Q3_OPTIONS as readonly string[]}
          selected={answers.q3 ?? []}
          onChange={(v) => setAnswers((a) => ({ ...a, q3: v }))}
        />
      </QShell>
    );
  }
  if (idx === 3) {
    const q4 = answers.q4 ?? {};
    return (
      <QShell
        title="安全のためにご確認ください"
        sub="すべての項目に「はい」または「いいえ」でお答えください。"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {Q4_ITEMS.map((it) => {
            const v = q4[it.id];
            return (
              <div
                key={it.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                  background: "#fff",
                  border: `0.5px solid ${Palette.line}`,
                  borderRadius: 12,
                }}
              >
                <div style={{ flex: 1, fontSize: 12.5, color: Palette.ink, lineHeight: 1.6 }}>{it.label}</div>
                <YesNo
                  value={v}
                  onChange={(val) =>
                    setAnswers((a) => ({ ...a, q4: { ...(a.q4 ?? {}), [it.id]: val } }))
                  }
                />
              </div>
            );
          })}
        </div>
      </QShell>
    );
  }
  // idx === 4
  return (
    <QShell title="ご希望の進め方を選んでください" sub="医師の処方判断の参考になります。">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Q5_OPTIONS.map((o) => {
          const on = answers.q5 === o.id;
          return (
            <button key={o.id} onClick={() => setAnswers((a) => ({ ...a, q5: o.id as Q5Id }))} style={optStyle(on)}>
              <Check on={on} shape="circle" />
              <div style={{ flex: 1, textAlign: "left" }}>{o.label}</div>
            </button>
          );
        })}
      </div>
    </QShell>
  );
}

function QShell({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "24px 22px 140px" }}>
      <div className="serif" style={{ fontSize: 19, color: Palette.ink, lineHeight: 1.55, letterSpacing: 0.02 }}>
        {title}
      </div>
      {sub && <div style={{ fontSize: 11.5, color: Palette.ink3, marginTop: 8, lineHeight: 1.7 }}>{sub}</div>}
      <div style={{ marginTop: 22 }}>{children}</div>
    </div>
  );
}

function Multi({
  options,
  selected,
  onChange,
}: {
  options: readonly string[];
  selected: number[];
  onChange: (v: number[]) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map((label, i) => {
        const on = selected.includes(i);
        return (
          <button
            key={i}
            onClick={() => onChange(on ? selected.filter((x) => x !== i) : [...selected, i])}
            style={optStyle(on)}
          >
            <Check on={on} shape="square" />
            <div style={{ flex: 1, textAlign: "left" }}>{label}</div>
          </button>
        );
      })}
    </div>
  );
}

function YesNo({ value, onChange }: { value?: boolean; onChange: (v: boolean) => void }) {
  const Btn = ({ v, label }: { v: boolean; label: string }) => {
    const on = value === v;
    return (
      <button
        onClick={() => onChange(v)}
        style={{
          padding: "8px 14px",
          borderRadius: 999,
          border: `${on ? 1 : 0.5}px solid ${on ? Palette.roseDeep : Palette.line}`,
          background: on ? Palette.roseDeep : "#fff",
          color: on ? "#fff" : Palette.ink2,
          fontSize: 12,
          fontWeight: on ? 600 : 400,
          cursor: "pointer",
          fontFamily: "var(--font-sans-stack)",
        }}
      >
        {label}
      </button>
    );
  };
  return (
    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
      <Btn v={true} label="はい" />
      <Btn v={false} label="いいえ" />
    </div>
  );
}

function optStyle(on: boolean): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    background: on ? Palette.roseTint : "#fff",
    border: `${on ? 1 : 0.5}px solid ${on ? Palette.roseDeep : Palette.line}`,
    borderRadius: 12,
    cursor: "pointer",
    fontFamily: "var(--font-sans-stack)",
    fontSize: 13.5,
    color: Palette.ink,
    lineHeight: 1.55,
    textAlign: "left",
  };
}

function Check({ on, shape }: { on: boolean; shape: "circle" | "square" }) {
  const radius = shape === "circle" ? 999 : 6;
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: radius,
        border: `1px solid ${on ? Palette.roseDeep : Palette.ink4}`,
        background: on ? Palette.roseDeep : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {on && (
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2 6.5l2.8 2.8L10 3.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function Result({
  answers,
  onRestart,
  go,
}: {
  answers: CheckAnswers;
  onRestart: () => void;
  go: Go;
}) {
  const result = React.useMemo(() => evaluateAnswers(answers), [answers]);

  if (result.hasDanger) {
    return (
      <div style={{ padding: "24px 20px 40px" }}>
        <Badge tone="notice">早めの医療機関ご相談を</Badge>
        <h1 className="serif" style={{ fontSize: 22, color: Palette.ink, lineHeight: 1.55, margin: "12px 0 0", letterSpacing: 0.02 }}>
          ご回答内容から、早めに医療機関へ相談した方がよい可能性があります。
        </h1>
        <p style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, marginTop: 10 }}>
          本サービスでは、医師が診療のうえ対応可否を判断しますが、緊急性がある場合や強い不調がある場合は、
          お近くの医療機関、救急相談窓口、精神科・産婦人科等へご相談ください。
        </p>

        <div
          style={{
            marginTop: 16,
            padding: "14px 14px",
            background: Palette.noticeBg,
            border: `0.5px solid ${Palette.noticeBorder}`,
            borderRadius: 12,
          }}
        >
          <div className="serif" style={{ fontSize: 13, color: "#6a5b1f" }}>該当した内容</div>
          <ul style={{ margin: "6px 0 0", padding: "0 0 0 18px", fontSize: 12, color: "#6a5b1f", lineHeight: 1.85 }}>
            {result.dangerSigns.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div
          style={{
            marginTop: 14,
            padding: "12px 14px",
            background: "#fff",
            border: `0.5px solid ${Palette.line}`,
            borderRadius: 12,
            fontSize: 12,
            color: Palette.ink2,
            lineHeight: 1.85,
          }}
        >
          相談先の例：
          <br />・お近くの医療機関 / 心療内科・精神科 / 産婦人科
          <br />・厚生労働省 こころの健康相談統一ダイヤル
          <br />・救急相談センター（#7119 など、地域により異なります）
        </div>

        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
          <CTA variant="ghost" onClick={onRestart}>
            もう一度やり直す
          </CTA>
          <CTA variant="ghost" onClick={() => go("top")}>
            ホームに戻る
          </CTA>
        </div>
      </div>
    );
  }

  const { primaryPlan, alternativePlans, medicineCandidates, cautions } = result;

  return (
    <div style={{ padding: "24px 20px 40px" }}>
      <Badge>あなたへのプラン候補</Badge>
      <h1 className="serif" style={{ fontSize: 24, color: Palette.ink, lineHeight: 1.55, margin: "12px 0 0", letterSpacing: 0.02 }}>
        あなたには「<span style={{ color: Palette.roseDeep }}>{primaryPlan.name}</span>」プランが
        <br />
        合う可能性があります。
      </h1>
      <p style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, marginTop: 10 }}>
        {primaryPlan.target}に対応するプランです。
        実際の処方は、オンライン診療で医師が体質・症状・既往歴・服薬状況を確認したうえで判断します。
      </p>

      {/* primary plan card */}
      <div
        style={{
          marginTop: 16,
          padding: "16px 16px",
          background: "#fff",
          border: `1px solid ${Palette.roseDeep}`,
          borderRadius: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div className="serif" style={{ fontSize: 18, color: Palette.ink }}>
            {primaryPlan.name}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span className="serif" style={{ fontSize: 22, color: Palette.ink, fontWeight: 500 }}>
              ¥{primaryPlan.monthly.toLocaleString()}
            </span>
            <span style={{ fontSize: 11, color: Palette.ink3 }}>/ 月（税別）</span>
          </div>
        </div>
        <div style={{ fontSize: 12, color: Palette.ink2, marginTop: 8, lineHeight: 1.7 }}>{primaryPlan.detail}</div>
      </div>

      {alternativePlans.length > 0 && (
        <div style={{ marginTop: 10, fontSize: 11.5, color: Palette.ink3 }}>
          このほか、{alternativePlans.map((p) => p.name).join(" / ")} プランも症状の組み合わせによって候補になります。
        </div>
      )}

      {medicineCandidates.length > 0 && (
        <div style={{ marginTop: 22 }}>
          <SectionHead
            kicker="Examples"
            title="医師が検討することがある漢方の例"
            sub="医師が体質や症状、既往歴・服薬状況を確認したうえで処方を判断します。下記は一例で、必ずしも処方されるものではありません。"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {medicineCandidates.map((m) => (
              <button
                key={m.id}
                onClick={() => go("detail", m.id)}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: 12,
                  background: "#fff",
                  border: `0.5px solid ${Palette.line}`,
                  borderRadius: 14,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "var(--font-sans-stack)",
                }}
              >
                <div style={{ width: 72, flexShrink: 0 }}>
                  <KampoImage m={m} height={92} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 9.5, color: Palette.ink3 }}>{m.number}</div>
                  <div className="serif" style={{ fontSize: 14.5, color: Palette.ink, marginTop: 2 }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: Palette.ink2, marginTop: 4, lineHeight: 1.6 }}>{m.lead}</div>
                  <div style={{ fontSize: 10.5, color: Palette.roseDeep, marginTop: 6 }}>
                    対応プラン：{planLabelsForMedicine(m)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {cautions.length > 0 && (
        <div
          style={{
            marginTop: 18,
            padding: "12px 14px",
            background: Palette.noticeBg,
            border: `0.5px solid ${Palette.noticeBorder}`,
            borderRadius: 10,
            fontSize: 11.5,
            color: "#6a5b1f",
            lineHeight: 1.85,
          }}
        >
          以下に該当する方は、診療時に医師へお伝えください。
          <ul style={{ margin: "6px 0 0", padding: "0 0 0 18px" }}>
            {cautions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 10 }}>
        <CTA variant="rose" onClick={() => go("order")}>
          オンライン診療を申し込む
        </CTA>
        <CTA variant="ghost" onClick={() => go("pricing")}>
          料金プランを見る
        </CTA>
        <CTA variant="ghost" onClick={onRestart}>
          もう一度やり直す
        </CTA>
      </div>

      <div
        style={{
          marginTop: 18,
          padding: "12px 14px",
          border: `0.5px dashed ${Palette.line}`,
          borderRadius: 10,
          fontSize: 10.5,
          color: Palette.ink3,
          lineHeight: 1.75,
        }}
      >
        本チェックの結果は診断ではありません。実際の処方可否は、医師の診療によって判断されます。
      </div>
    </div>
  );
}
