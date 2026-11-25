"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LINE_CTA_NOTE } from "@/config/vista";
import { pushEvent } from "@/lib/analytics";
import LineCTA from "./LineCTA";

// ─────────────────────────────────────────────────────────────
// 肌荒れ・体調チェック
//
// ・回答は React の state（ブラウザのメモリ内）にのみ保持し、保存・送信しない。
//   URL クエリ・localStorage・解析ツール（GTM/GA4/広告タグ）にも一切渡さない。
// ・結果は「相談したい関心領域の整理」であり、診断・薬剤の推奨は行わない。
// TODO: MEDICAL_REVIEW — 設問・重症サインの文言と結果パターンは提携医師の監修が必要。
// ─────────────────────────────────────────────────────────────

type Option = { id: string; label: string; exclusive?: boolean };
type Question = { id: string; label: string; hint?: string; multi: boolean; options: Option[] };
type Step = { title: string; questions: Question[] };

const STEPS: Step[] = [
  {
    title: "主な肌悩み",
    questions: [
      {
        id: "skin",
        label: "いま気になっている肌の悩みは？",
        hint: "あてはまるものをすべて選んでください。",
        multi: true,
        options: [
          { id: "acne", label: "ニキビ・吹き出物" },
          { id: "redness", label: "赤み・炎症" },
          { id: "dry", label: "乾燥・ごわつき" },
          { id: "other", label: "その他の肌荒れ" },
        ],
      },
    ],
  },
  {
    title: "部位・期間・程度",
    questions: [
      {
        id: "area",
        label: "気になる部位は？",
        hint: "あてはまるものをすべて選んでください。",
        multi: true,
        options: [
          { id: "chin", label: "顎・口まわり" },
          { id: "forehead", label: "額" },
          { id: "cheek", label: "頬" },
          { id: "faceline", label: "フェイスライン" },
          { id: "body", label: "背中・胸" },
          { id: "other", label: "その他" },
        ],
      },
      {
        id: "duration",
        label: "悩みが続いている期間は？",
        multi: false,
        options: [
          { id: "lt1m", label: "1か月未満" },
          { id: "1to6m", label: "1〜6か月" },
          { id: "gt6m", label: "半年以上・繰り返している" },
        ],
      },
      {
        id: "degree",
        label: "いまの程度に近いものは？",
        multi: false,
        options: [
          { id: "few", label: "ところどころにある" },
          { id: "wide", label: "顔の広い範囲にある" },
          { id: "severe", label: "痛みや腫れが強いものがある" },
        ],
      },
    ],
  },
  {
    title: "月経との関連",
    questions: [
      {
        id: "period",
        label: "月経周期と肌の状態に関係はありそうですか？",
        multi: false,
        options: [
          { id: "pre", label: "生理前に悪化しやすい" },
          { id: "unsure", label: "関係はよく分からない" },
          { id: "no", label: "関係ないと思う" },
          { id: "na", label: "あてはまらない（月経がない等）" },
        ],
      },
      {
        id: "pms",
        label: "生理前に、イライラ・気分の落ち込み・むくみなどの不調を感じますか？",
        hint: "PMS（月経前症候群）に関連する不調があるかどうかの目安です。",
        multi: false,
        options: [
          { id: "often", label: "毎月のように感じる" },
          { id: "sometimes", label: "ときどき感じる" },
          { id: "no", label: "あまり感じない" },
          { id: "na", label: "あてはまらない（月経がない等）" },
        ],
      },
    ],
  },
  {
    title: "冷え・むくみ・便通・体重",
    questions: [
      {
        id: "body",
        label: "あわせて気になる体調はありますか？",
        hint: "あてはまるものをすべて選んでください。",
        multi: true,
        options: [
          { id: "cold", label: "冷え" },
          { id: "hot", label: "のぼせ・ほてり" },
          { id: "swelling", label: "むくみ" },
          { id: "constipation", label: "便秘がち" },
          { id: "weight", label: "体重の増加・体型が気になる" },
          { id: "none", label: "特にない", exclusive: true },
        ],
      },
    ],
  },
  {
    title: "睡眠・ストレス",
    questions: [
      {
        id: "stress",
        label: "睡眠不足やストレスを感じることは？",
        multi: false,
        options: [
          { id: "often", label: "よくある" },
          { id: "sometimes", label: "ときどきある" },
          { id: "rarely", label: "あまりない" },
        ],
      },
    ],
  },
  {
    title: "治療歴・併用薬",
    questions: [
      {
        id: "history",
        label: "あてはまるものはありますか？",
        hint: "具体的な病名や薬の名前は、ここでは入力不要です。診療時の問診でお伝えください。",
        multi: true,
        options: [
          { id: "derm_now", label: "皮膚科で治療中" },
          { id: "derm_past", label: "過去に皮膚科で治療した" },
          { id: "meds", label: "服用中の薬・使用中の外用薬がある" },
          { id: "chronic", label: "持病・アレルギーがある" },
          { id: "none", label: "特にない", exclusive: true },
        ],
      },
    ],
  },
  {
    title: "妊娠・授乳",
    questions: [
      {
        id: "pregnancy",
        label: "妊娠・授乳について",
        multi: false,
        options: [
          { id: "pregnant", label: "妊娠中、または妊娠の可能性がある" },
          { id: "nursing", label: "授乳中" },
          { id: "no", label: "いずれもあてはまらない" },
          { id: "skip", label: "回答しない" },
        ],
      },
    ],
  },
  {
    title: "受診の目安になるサイン",
    questions: [
      {
        id: "red",
        label: "次のようなサインはありますか？",
        hint: "あてはまるものをすべて選んでください。",
        multi: true,
        options: [
          { id: "pain", label: "強い痛み・大きな腫れ・熱感がある" },
          { id: "rapid", label: "急に悪化した・急に広がった" },
          { id: "systemic", label: "発熱やだるさなど、全身の症状がある" },
          { id: "scar", label: "膿が多い・しこりがある・跡が残りそう" },
          { id: "none", label: "いずれもない", exclusive: true },
        ],
      },
    ],
  },
];

type Answers = Record<string, string[]>;

type Pattern = { title: string; body: string };

function evaluate(a: Answers) {
  const has = (q: string, id: string) => (a[q] ?? []).includes(id);
  const redFlags = (a.red ?? []).filter((x) => x !== "none").length > 0 || has("degree", "severe");

  // 分類は相談内容を整理するためのもの（診断ではない）。特定の薬剤には結びつけない。
  const patterns: Pattern[] = [];
  const body = (a.body ?? []).filter((x) => x !== "none");
  if (has("skin", "acne") || has("skin", "redness")) {
    patterns.push({
      title: "ニキビ・炎症に関する肌悩み",
      body: "ニキビや赤みなど、炎症をともなう肌の症状を中心に相談したい状態です。部位・期間・これまでの治療やスキンケアを整理しておくと、診療がスムーズです。",
    });
  }
  if (has("skin", "dry")) {
    patterns.push({
      title: "乾燥を伴う肌悩み",
      body: "乾燥やごわつきをともなう肌の状態が気になっています。季節や生活の変化で悪化するかなども、医師にお伝えください。",
    });
  }
  if (body.includes("constipation") || body.includes("weight")) {
    patterns.push({
      title: "便通・体重管理に関する悩み",
      body: "肌だけでなく、便通や体重の変化も気になっている状態です。気になる体調も遠慮なく医師にお伝えください。",
    });
  }
  if (has("period", "pre") || has("pms", "often") || has("pms", "sometimes")) {
    patterns.push({
      title: "PMS・月経関連の不調",
      body: "生理前に肌や体調、気分が揺らぎやすいと感じている状態です。PMS（月経前症候群）に関連する不調や、月経周期との関係もあわせて医師にお伝えください。",
    });
  }
  if (body.includes("cold") || body.includes("swelling") || body.includes("hot")) {
    patterns.push({
      title: "冷え・むくみなどの体調の悩み",
      body: "冷えやむくみ、のぼせなど、肌以外の体調も気になっている状態です。睡眠やストレスの状態も含めて医師にお伝えください。",
    });
  }
  if (patterns.length === 0) {
    patterns.push({
      title: "肌の悩みを整理して相談したいパターン",
      body: "いまの肌の状態や気になることを、医師に相談しながら整理していく段階です。",
    });
  }
  return {
    redFlags,
    patterns,
    pregnancy: has("pregnancy", "pregnant") || has("pregnancy", "nursing"),
    dermNow: has("history", "derm_now"),
  };
}

export default function SkinCheck() {
  const [stage, setStage] = useState<"intro" | "questions" | "result">("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState<string | null>(null);
  const topRef = useRef<HTMLElement>(null);

  // ステップ切替時に先頭へ（フォーカス移動でスクリーンリーダーにも通知）
  useEffect(() => {
    if (stage === "intro") return;
    topRef.current?.focus({ preventScroll: true });
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step, stage]);

  const current = STEPS[step];

  function toggle(q: Question, opt: Option, checked: boolean) {
    setError(null);
    setAnswers((prev) => {
      const cur = prev[q.id] ?? [];
      let next: string[];
      if (!q.multi) next = [opt.id];
      else if (!checked) next = cur.filter((x) => x !== opt.id);
      else if (opt.exclusive) next = [opt.id];
      else {
        const exclusiveIds = q.options.filter((o) => o.exclusive).map((o) => o.id);
        next = [...cur.filter((x) => !exclusiveIds.includes(x)), opt.id];
      }
      return { ...prev, [q.id]: next };
    });
  }

  function next() {
    const missing = current.questions.find((q) => !(answers[q.id]?.length));
    if (missing) {
      setError(`「${missing.label}」を選択してください。`);
      return;
    }
    if (step < STEPS.length - 1) setStep(step + 1);
    else {
      setStage("result");
      pushEvent("skin_check_complete", { page_path: window.location.pathname });
    }
  }

  function back() {
    setError(null);
    if (step === 0) setStage("intro");
    else setStep(step - 1);
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setError(null);
    setStage("intro");
    window.scrollTo({ top: 0 });
  }

  if (stage === "intro") {
    return (
      <div className="check-wrap">
        <div className="check-card">
          <h2 className="section-title" style={{ marginTop: 0, fontSize: 22 }}>
            はじめる前に
          </h2>
          <ul className="check-list" style={{ maxWidth: "none", margin: "0 0 20px" }}>
            <li>8つのステップで、選択式の質問に答えるだけです。</li>
            <li>このチェックは悩みを整理するためのもので、診断や処方の代わりではありません。</li>
            <li>費用はかかりません。LINE登録も不要です。</li>
            <li>回答はお使いのブラウザ内でのみ扱い、保存・送信はしません。</li>
          </ul>
          <button
            type="button"
            className="btn btn--block"
            onClick={() => {
              setStage("questions");
              setStep(0);
              pushEvent("skin_check_start", { page_path: window.location.pathname });
            }}
          >
            チェックをはじめる
          </button>
          <p className="small-note" style={{ marginTop: 14 }}>
            急激な悪化、強い痛みや腫れ、発熱などがある場合は、チェックを待たずにお近くの医療機関を受診してください。
          </p>
        </div>
      </div>
    );
  }

  if (stage === "result") {
    const r = evaluate(answers);
    return (
      <div className="check-wrap">
        <div className="check-card" ref={topRef as React.RefObject<HTMLDivElement>} tabIndex={-1} aria-live="polite">
          <div className="eyebrow">RESULT</div>
          <h2 className="section-title" style={{ fontSize: 22, marginTop: 8 }}>
            あなたの肌悩みの整理
          </h2>

          {r.redFlags && (
            <div className="notice" style={{ marginBottom: 18, borderLeftColor: "#a5685a" }}>
              <strong>対面の医療機関への相談もご検討ください</strong>
              <p>
                強い痛みや腫れ、急な悪化、全身の症状などがある場合は、オンライン診療よりも皮膚科などでの対面診療が適していることがあります。症状がつらい場合は、お近くの医療機関を受診してください。
              </p>
            </div>
          )}

          {r.patterns.map((p) => (
            <div className="result-pattern" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}

          {r.pregnancy && (
            <div className="notice notice--olive" style={{ marginTop: 14 }}>
              <p>
                妊娠中・妊娠の可能性がある方・授乳中の方は、問診・診療で必ずお伝えください。処方できない場合や、対面での受診をご案内する場合があります。
              </p>
            </div>
          )}
          {r.dermNow && (
            <div className="notice notice--olive" style={{ marginTop: 14 }}>
              <p>現在の皮膚科での治療は、自己判断で中止しないでください。治療内容は問診で医師にお伝えください。</p>
            </div>
          )}

          <p className="small-note" style={{ marginTop: 18 }}>
            この結果は、医師に相談したい内容を整理するための目安です。病気の診断や、特定の漢方薬の推奨ではありません。
            <br />
            <strong>実際の処方は医師が診療のうえ判断します。</strong>
          </p>

          <div className="cta-stack" style={{ marginTop: 22 }}>
            <LineCTA position="check_result" className="btn--block" />
            <p className="small-note" style={{ margin: 0 }}>
              {LINE_CTA_NOTE}
            </p>
          </div>
          <div className="check-nav">
            <button type="button" className="btn btn--outline btn--small" onClick={reset}>
              回答をリセット
            </button>
            <Link className="btn btn--outline btn--small" href="/consult">
              受診の流れを見る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="check-wrap">
      <form
        className="check-card"
        ref={topRef as React.RefObject<HTMLFormElement>}
        tabIndex={-1}
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        aria-labelledby="check-step-title"
      >
        <div className="check-progress">
          <span>
            {step + 1} / {STEPS.length}
          </span>
          <div
            className="check-progress__bar"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-valuenow={step + 1}
            aria-label="進捗"
          >
            <span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
        </div>
        <h2 id="check-step-title" className="eyebrow" style={{ margin: "0 0 14px" }}>
          STEP {step + 1}　{current.title}
        </h2>

        {current.questions.map((q) => (
          <fieldset className="check-q" key={q.id}>
            <legend>{q.label}</legend>
            {q.hint && <p className="check-q__hint">{q.hint}</p>}
            <div className={`check-options ${q.options.length <= 3 ? "check-options--single" : ""}`}>
              {q.options.map((o) => {
                const checked = (answers[q.id] ?? []).includes(o.id);
                return (
                  <label className="check-option" key={o.id}>
                    <input
                      type={q.multi ? "checkbox" : "radio"}
                      name={q.id}
                      value={o.id}
                      checked={checked}
                      onChange={(e) => toggle(q, o, e.target.checked)}
                    />
                    <span>{o.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        {error && (
          <p className="check-error" role="alert">
            {error}
          </p>
        )}

        <div className="check-nav">
          <button type="button" className="btn btn--outline" onClick={back}>
            戻る
          </button>
          <button type="submit" className="btn">
            {step === STEPS.length - 1 ? "結果を見る" : "次へ"}
          </button>
        </div>
      </form>
    </div>
  );
}
