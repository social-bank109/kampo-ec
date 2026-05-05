"use client";
import React from "react";
import { QUESTIONS, TYPES, recommend, type Answers, type Product, type Question } from "./data";
import { Palette, AppBar, Badge, CTA, SectionHead, PriceRow, PlaceholderJar } from "./ui";

type Go = (name: string, pid?: string) => void;

export default function ScreenSelfCheck({ go }: { go: Go }) {
  const [stage, setStage] = React.useState<"intro" | "q" | "result">("intro");
  const [idx, setIdx] = React.useState(0);
  const [answers, setAnswers] = React.useState<Answers>({});

  const total = QUESTIONS.length;
  const q = QUESTIONS[idx];
  const progress = stage === "intro" ? 0 : stage === "result" ? 1 : (idx + 1) / total;

  function setAnswer(val: number | number[]) {
    setAnswers((prev) => ({ ...prev, [q.id]: val }));
  }
  function next() {
    if (idx < total - 1) setIdx(idx + 1);
    else setStage("result");
  }
  function prev() {
    if (stage === "q" && idx === 0) setStage("intro");
    else if (stage === "q") setIdx(idx - 1);
    else if (stage === "result") {
      setStage("q");
      setIdx(total - 1);
    }
  }
  function restart() {
    setAnswers({});
    setIdx(0);
    setStage("intro");
  }

  const canNext =
    stage === "q" &&
    (() => {
      const a = answers[q.id];
      if (q.kind === "single") return typeof a === "number";
      if (q.kind === "multi") return Array.isArray(a) && a.length > 0;
      if (q.kind === "scale") return typeof a === "number";
      return false;
    })();

  return (
    <div style={{ background: Palette.paper, minHeight: "100%", paddingBottom: 120 }}>
      <AppBar
        title="体質チェック"
        onBack={stage === "intro" ? () => go("top") : prev}
        variant="paper"
        right={
          stage !== "intro" ? (
            <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 10, color: Palette.ink3, letterSpacing: 0.08 }}>
              {stage === "result" ? "結果" : `${idx + 1} / ${total}`}
            </div>
          ) : undefined
        }
      />
      <div style={{ height: 3, background: Palette.paper2 }}>
        <div style={{ height: "100%", background: Palette.sageDeep, width: `${progress * 100}%`, transition: "width 0.3s ease" }} />
      </div>

      {stage === "intro" && <Intro onStart={() => setStage("q")} />}
      {stage === "q" && <QuestionView q={q} answer={answers[q.id]} setAnswer={setAnswer} />}
      {stage === "result" && <ResultView answers={answers} onRestart={restart} onDetail={(pid) => go("detail", pid)} />}

      {stage === "q" && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "12px 16px 30px",
            background: "rgba(251,250,246,0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: `0.5px solid ${Palette.line}`,
            zIndex: 12,
          }}
        >
          <CTA variant={canNext ? "sage" : "paper"} onClick={() => canNext && next()}>
            {idx === total - 1 ? "見立てを受け取る" : "次へ"}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </CTA>
        </div>
      )}
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  const points = [
    { n: "01", t: "2分ほどの質問", d: "最近の体調・眠り・緊張・体のリズムについて" },
    { n: "02", t: "タイプの見立て", d: "東洋医学の考え方に基づき、いまの傾向をやさしく整理" },
    { n: "03", t: "おすすめの漢方", d: "あなたに合いそうな処方を1〜2種ご提案" },
  ];
  return (
    <div style={{ padding: "28px 22px" }}>
      <Badge>自己チェック · 診断ではありません</Badge>
      <div className="serif" style={{ fontSize: 24, color: Palette.ink, lineHeight: 1.55, marginTop: 14, textWrap: "pretty" as React.CSSProperties["textWrap"] }}>
        いまの体の声を、
        <br />
        少しだけ聞いてみませんか。
      </div>
      <div style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, marginTop: 12 }}>
        病名をあてるためのテストではありません。
        <br />
        生活のなかで感じている違和感の方向を、医師に相談する前の下見として整理するためのものです。
      </div>

      <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
        {points.map((p) => (
          <div key={p.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 11, color: Palette.sageDeep, paddingTop: 3, minWidth: 24 }}>{p.n}</div>
            <div style={{ flex: 1, borderBottom: `0.5px solid ${Palette.line}`, paddingBottom: 12 }}>
              <div className="serif" style={{ fontSize: 14, color: Palette.ink }}>{p.t}</div>
              <div style={{ fontSize: 11.5, color: Palette.ink3, marginTop: 3, lineHeight: 1.7 }}>{p.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28 }}>
        <CTA variant="sage" onClick={onStart}>
          はじめる
        </CTA>
      </div>
      <div style={{ fontSize: 10.5, color: Palette.ink3, textAlign: "center", marginTop: 12, lineHeight: 1.7 }}>
        回答内容は端末内にのみ保存されます。
        <br />
        途中で中断しても構いません。
      </div>
    </div>
  );
}

function QuestionView({ q, answer, setAnswer }: { q: Question; answer: number | number[] | undefined; setAnswer: (v: number | number[]) => void }) {
  return (
    <div style={{ padding: "24px 22px" }}>
      <div className="serif" style={{ fontSize: 20, color: Palette.ink, lineHeight: 1.55, letterSpacing: 0.02 }}>
        {q.prompt}
      </div>
      {q.sub && <div style={{ fontSize: 11.5, color: Palette.ink3, marginTop: 8, lineHeight: 1.7 }}>{q.sub}</div>}

      <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 8 }}>
        {q.kind === "single" &&
          q.options.map((opt, i) => {
            const on = answer === i;
            return (
              <button key={i} onClick={() => setAnswer(i)} style={optStyle(on)}>
                <Check on={on} shape="circle" />
                <div style={{ flex: 1, textAlign: "left" }}>{opt.label}</div>
              </button>
            );
          })}
        {q.kind === "multi" &&
          q.options.map((opt, i) => {
            const arr = Array.isArray(answer) ? answer : [];
            const on = arr.includes(i);
            return (
              <button
                key={i}
                onClick={() => {
                  setAnswer(on ? arr.filter((x) => x !== i) : [...arr, i]);
                }}
                style={optStyle(on)}
              >
                <Check on={on} shape="square" />
                <div style={{ flex: 1, textAlign: "left" }}>{opt.label}</div>
              </button>
            );
          })}
        {q.kind === "scale" && (
          <div style={{ display: "flex", gap: 6, padding: "18px 4px", background: "#fff", border: `0.5px solid ${Palette.line}`, borderRadius: 14 }}>
            {q.scale.map((s, i) => {
              const on = answer === i;
              return (
                <button
                  key={i}
                  onClick={() => setAnswer(i)}
                  style={{
                    flex: 1,
                    padding: "14px 0",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: 10,
                    background: on ? Palette.sageDeep : "transparent",
                    color: on ? "#fff" : Palette.ink2,
                    fontFamily: "var(--font-sans-stack)",
                    fontSize: 12,
                    fontWeight: on ? 600 : 400,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: 15 }}>{s.split(" ")[0]}</span>
                  <span style={{ fontSize: 10, opacity: 0.8 }}>{s.split(" ")[1] || ""}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function optStyle(on: boolean): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    background: on ? Palette.sageTint : "#fff",
    border: `${on ? 1 : 0.5}px solid ${on ? Palette.sageDeep : Palette.line}`,
    borderRadius: 12,
    cursor: "pointer",
    fontFamily: "var(--font-sans-stack)",
    fontSize: 13.5,
    color: Palette.ink,
    lineHeight: 1.55,
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
        border: `1px solid ${on ? Palette.sageDeep : Palette.ink4}`,
        background: on ? Palette.sageDeep : "transparent",
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

function ResultView({ answers, onRestart, onDetail }: { answers: Answers; onRestart: () => void; onDetail: (pid: string) => void }) {
  const result = React.useMemo(() => recommend(answers), [answers]);
  const { type, products, score } = result;

  return (
    <div style={{ padding: "24px 20px 40px" }}>
      <Badge>あなたの見立て</Badge>
      <div className="serif" style={{ fontSize: 26, color: Palette.ink, lineHeight: 1.55, marginTop: 12, letterSpacing: 0.02 }}>
        {type.label}
        <br />
        <span style={{ color: Palette.sageDeep }}>の傾向があります。</span>
      </div>
      <div style={{ fontSize: 12.5, color: Palette.ink2, lineHeight: 1.85, marginTop: 10 }}>
        {type.sub}。ここでの「タイプ」は診断ではなく、 いまの体調をととのえていく方向をイメージしやすくするためのラベルです。
      </div>

      <div style={{ marginTop: 18, padding: "14px 16px", background: "#fff", border: `0.5px solid ${Palette.line}`, borderRadius: 14 }}>
        <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 10, color: Palette.ink3, letterSpacing: 0.14, textTransform: "uppercase", marginBottom: 10 }}>
          Balance
        </div>
        {(Object.entries(TYPES) as [keyof typeof TYPES, (typeof TYPES)[keyof typeof TYPES]][]).map(([k, v]) => {
          const max = Math.max(1, ...Object.values(score));
          const pct = (score[k] || 0) / max;
          return (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 110, fontSize: 11, color: Palette.ink2 }}>{v.label}</div>
              <div style={{ flex: 1, height: 6, background: Palette.paper2, borderRadius: 999, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${pct * 100}%`,
                    height: "100%",
                    background: k === result.axis ? Palette.sageDeep : Palette.ink4,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 24 }}>
        <SectionHead kicker="Suggested" title="あなたに合いそうな漢方" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {products.map((p) => (
            <ResultCard key={p.id} p={p} onOpen={() => onDetail(p.id)} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, padding: "18px 18px", background: Palette.sageTint, borderRadius: 16 }}>
        <div className="serif" style={{ fontSize: 16, color: Palette.ink, lineHeight: 1.55 }}>
          次は、医師に相談してみませんか。
        </div>
        <div style={{ fontSize: 12, color: Palette.ink2, lineHeight: 1.85, marginTop: 8 }}>
          見立てをもとに、あなたに合うかを医師がオンラインで確認します。 ビデオ通話 約10分で完結、処方の可否もその場でお伝えします。
        </div>
        <div style={{ marginTop: 14 }}>
          <CTA variant="sage" onClick={() => products[0] && onDetail(products[0].id)}>
            この見立てで医師に相談する
          </CTA>
        </div>
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
        <CTA variant="ghost" full onClick={onRestart}>
          もう一度やり直す
        </CTA>
      </div>

      <div style={{ marginTop: 20, padding: "12px 14px", border: `0.5px dashed ${Palette.line}`, borderRadius: 10, fontSize: 10.5, color: Palette.ink3, lineHeight: 1.75 }}>
        本チェックの結果は診断ではありません。実際の処方可否は、医師の診療によって判断されます。
      </div>
    </div>
  );
}

function ResultCard({ p, onOpen }: { p: Product; onOpen: () => void }) {
  return (
    <div style={{ display: "flex", gap: 14, padding: 12, background: "#fff", border: `0.5px solid ${Palette.line}`, borderRadius: 14 }}>
      <div style={{ width: 72, flexShrink: 0 }}>
        <PlaceholderJar tone={p.tone} accent={p.accent} label={p.no} h={96} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-mono-stack)", fontSize: 9.5, color: Palette.ink3 }}>{p.no}</div>
        <div className="serif" style={{ fontSize: 15, color: Palette.ink, marginTop: 2 }}>{p.formula}</div>
        <div style={{ fontSize: 11, color: Palette.ink2, marginTop: 5, lineHeight: 1.6 }}>{p.concern}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <PriceRow price={p.price} small />
          <button
            onClick={onOpen}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 11,
              color: Palette.sageDeep,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontFamily: "var(--font-sans-stack)",
            }}
          >
            詳しく見る
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
