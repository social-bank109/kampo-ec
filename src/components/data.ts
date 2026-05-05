// ─────────────────────────────────────────────────────────────
// VISTA Wellness — 自由診療オンライン漢方
// データマスタ：プラン / 薬剤 / 悩みカテゴリ / 体質チェック設問
// ─────────────────────────────────────────────────────────────

export const BRAND = {
  name: "VISTA",
  sub: "Wellness",
  tagline: "こころと体のゆらぎに、医師と選ぶ漢方を。",
  subtagline:
    "PMS・更年期・睡眠の悩み・ストレスによる体調のゆらぎに。提携クリニックのオンライン診療を通じて、医師が体質や症状を確認し、必要に応じて医療用漢方を処方します。",
};

// ─────────────────────────────────────────────────────────────
// プラン
// ─────────────────────────────────────────────────────────────
export type PlanId = "light" | "basic" | "standard" | "intensive";

export type Plan = {
  id: PlanId;
  name: string;
  monthly: number;
  monthlyTax: number;
  target: string;
  detail: string;
  highlight?: string;
  badge?: string;
  doctorOnly?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "light",
    name: "ライト",
    monthly: 3800,
    monthlyTax: 4180,
    target: "むくみ・便秘・重だるさなど軽めの体質ケア",
    detail: "低薬価帯の医療用漢方1剤、安定後はまとめ配送",
  },
  {
    id: "basic",
    name: "ベーシック",
    monthly: 6400,
    monthlyTax: 7040,
    target: "PMS・更年期・軽い不安・イライラ・冷え",
    detail: "医療用漢方1剤、症状に応じて医師が処方判断",
    highlight: "はじめての方におすすめ",
    badge: "POPULAR",
  },
  {
    id: "standard",
    name: "スタンダード",
    monthly: 8800,
    monthlyTax: 9680,
    target: "不眠・疲労感・更年期・ストレス不調",
    detail: "高薬価帯の漢方も含めた1剤処方に対応",
    highlight: "睡眠・ストレス不調におすすめ",
    badge: "RECOMMENDED",
  },
  {
    id: "intensive",
    name: "集中ケア",
    monthly: 15300,
    monthlyTax: 16830,
    target: "不眠＋不安、更年期＋睡眠など複合的な不調",
    detail: "医師判断で2剤まで対応",
    highlight: "医師判断でご案内",
    doctorOnly: true,
  },
];

export const PRICE_NOTES = [
  "表示価格は税別です。",
  "処方内容は医師の診療により決定されます。ご希望の薬剤が必ず処方されるものではありません。",
  "初回診療、処方変更時、一定期間ごとの再診が必要です。",
  "配送頻度は処方内容・医師判断・服薬状況により異なります。",
  "自由診療のため、公的医療保険は適用されません。",
];

// ─────────────────────────────────────────────────────────────
// 薬剤マスタ（11種：トップ表示8種 + 追加候補3種）
// 写真は後日 /public/images/kampo/ に配置。placeholder=true の間は枠表示。
// ─────────────────────────────────────────────────────────────
export type Medicine = {
  id: string;
  number: string;
  name: string;
  kana: string;
  plans: PlanId[];
  concerns: string[];
  lead: string;
  description: string;
  image: string;
  placeholder: boolean;
  tone?: string;
  accent?: string;
  // 詳細ページ用
  doctorConsiders?: string[];
  cautionCases?: string[];
  sideEffects?: string[];
  featured?: boolean;
};

export const MEDICINES: Medicine[] = [
  {
    id: "boiogito",
    number: "No.20",
    name: "防已黄耆湯",
    kana: "ぼういおうぎとう",
    plans: ["light", "basic"],
    concerns: ["むくみ", "重だるさ", "汗をかきやすい", "水太りタイプ"],
    lead: "むくみや重だるさが気になる方の体質ケアに用いられることがあります。",
    description: "体質や症状を医師が確認し、必要と判断した場合に処方されます。",
    image: "/images/kampo/boiogito.jpg",
    placeholder: true,
    tone: "#eef1ea",
    accent: "#6f8a72",
    doctorConsiders: [
      "下半身を中心としたむくみが続く",
      "汗をかきやすく、体が重だるい",
      "疲れやすく、巡りが滞りがちな体質",
    ],
    cautionCases: [
      "腎機能・心機能に持病がある場合は要相談",
      "他の利尿薬や血圧の薬を服用中の場合",
    ],
    featured: true,
  },
  {
    id: "bofutsushosan",
    number: "No.62",
    name: "防風通聖散",
    kana: "ぼうふうつうしょうさん",
    plans: ["light", "basic"],
    concerns: ["便秘", "腹部脂肪", "のぼせ", "体質ケア"],
    lead: "便秘がちで、体の重さや巡りが気になる方に用いられることがあります。",
    description:
      "痩身効果を保証するものではありません。医師が体質・既往歴を確認したうえで処方を判断します。",
    image: "/images/kampo/bofutsushosan.jpg",
    placeholder: true,
    tone: "#efebe1",
    accent: "#8a7a4a",
    doctorConsiders: [
      "便秘がちで腹部に張りがある",
      "のぼせや顔のほてりが出やすい",
      "体力は比較的ある方",
    ],
    cautionCases: [
      "胃腸が弱い方、下痢しやすい方",
      "妊娠中・授乳中・体力の低下している方",
      "高血圧や心疾患の治療中",
    ],
    featured: true,
  },
  {
    id: "kamishoyosan",
    number: "No.24",
    name: "加味逍遙散",
    kana: "かみしょうようさん",
    plans: ["basic", "standard"],
    concerns: ["PMS", "更年期", "イライラ", "不安", "のぼせ"],
    lead: "PMSや更年期に伴うイライラ・不安・のぼせなどの相談で用いられることがあります。",
    description: "こころと体のゆらぎに関する相談で選択肢となる漢方です。処方は医師が判断します。",
    image: "/images/kampo/kamishoyosan.jpg",
    placeholder: true,
    tone: "#f1e6ea",
    accent: "#8a5a6c",
    doctorConsiders: [
      "PMS・月経前のイライラや落ち込み",
      "更年期のほてり・のぼせ・不安",
      "緊張で疲れやすく、気分の波が出やすい",
    ],
    cautionCases: [
      "胃腸がとても弱い方は症状が出ることがある",
      "肝機能に問題がある方は医師に相談",
    ],
    featured: true,
  },
  {
    id: "tokishakuyakusan",
    number: "No.23",
    name: "当帰芍薬散",
    kana: "とうきしゃくやくさん",
    plans: ["basic", "standard"],
    concerns: ["冷え", "むくみ", "月経不調", "疲れやすさ"],
    lead: "冷え・むくみ・月経に伴う不調が気になる方に用いられることがあります。",
    description: "体力や冷えの有無などを確認したうえで、医師が処方可否を判断します。",
    image: "/images/kampo/tokishakuyakusan.jpg",
    placeholder: true,
    tone: "#e9eef0",
    accent: "#5a7283",
    doctorConsiders: [
      "冷え性で、疲れやすい",
      "月経痛・月経不順を伴う体調のゆらぎ",
      "顔色がすぐれず、めまい立ちくらみが出やすい",
    ],
    cautionCases: ["胃腸が極端に弱い方は症状が出ることがある"],
    featured: true,
  },
  {
    id: "keishibukuryogan",
    number: "No.25",
    name: "桂枝茯苓丸",
    kana: "けいしぶくりょうがん",
    plans: ["basic", "standard"],
    concerns: ["のぼせ", "巡り", "月経不調", "更年期"],
    lead: "のぼせや巡りの悪さ、月経に伴う不調が気になる方に用いられることがあります。",
    description: "症状・体質・既往歴を踏まえて、医師が処方を判断します。",
    image: "/images/kampo/keishibukuryogan.jpg",
    placeholder: true,
    tone: "#ecebe5",
    accent: "#7a7058",
    doctorConsiders: [
      "のぼせと冷えが混在する",
      "月経痛・PMS・更年期の不調",
      "比較的、体力がある方",
    ],
    cautionCases: ["妊娠中・妊娠の可能性がある場合は要相談"],
    featured: true,
  },
  {
    id: "hangekobokuto",
    number: "No.16",
    name: "半夏厚朴湯",
    kana: "はんげこうぼくとう",
    plans: ["basic", "standard"],
    concerns: ["不安", "緊張", "のどのつかえ", "寝つきの悪さ"],
    lead: "不安感や緊張、のどのつかえ感が気になる方に用いられることがあります。",
    description: "不眠・不安の背景を確認し、必要に応じて専門医療機関への相談も案内します。",
    image: "/images/kampo/hangekobokuto.jpg",
    placeholder: true,
    tone: "#e8ece9",
    accent: "#6c8275",
    doctorConsiders: [
      "緊張すると息が浅くなる、ため息が増える",
      "のどに『つかえ感』が続く",
      "考え事で寝つきが悪くなる",
    ],
    cautionCases: ["強い抑うつ・希死念慮がある場合は専門医療機関の受診を優先"],
    featured: true,
  },
  {
    id: "sansonninto",
    number: "No.103",
    name: "酸棗仁湯",
    kana: "さんそうにんとう",
    plans: ["standard", "intensive"],
    concerns: ["不眠", "疲れているのに眠れない", "眠りが浅い"],
    lead: "心身が疲れているのに眠れない方の相談で用いられることがあります。",
    description: "睡眠薬ではありません。医師が不眠の程度や背景を確認したうえで処方を判断します。",
    image: "/images/kampo/sansonninto.jpg",
    placeholder: true,
    tone: "#ebe7ee",
    accent: "#6a5e8a",
    doctorConsiders: [
      "心身ともに疲れているのに眠れない",
      "眠りが浅く、夜中に目が覚める",
      "考え事が止まらず布団でも休まらない",
    ],
    cautionCases: [
      "重度の不眠・抑うつが疑われる場合は精神科・心療内科の受診を優先",
      "他の睡眠薬・抗不安薬を服用中の場合は要相談",
    ],
    featured: true,
  },
  {
    id: "kamikihito",
    number: "No.137",
    name: "加味帰脾湯",
    kana: "かみきひとう",
    plans: ["standard", "intensive"],
    concerns: ["不眠", "考えすぎ", "疲労感", "不安"],
    lead: "考えすぎや疲労感、不眠が重なる方の相談で用いられることがあります。",
    description: "体力・睡眠状態・食欲・服薬状況などを確認し、医師が処方を判断します。",
    image: "/images/kampo/kamikihito.jpg",
    placeholder: true,
    tone: "#eee8da",
    accent: "#8a6f37",
    doctorConsiders: [
      "考え事で眠りが浅い",
      "疲労感と不安が重なっている",
      "食欲が落ちやすく、心配ごとを抱えがち",
    ],
    cautionCases: ["強い抑うつ・希死念慮がある場合は専門医療機関の受診を優先"],
    featured: true,
  },
  // 追加候補
  {
    id: "yokukansan",
    number: "No.54",
    name: "抑肝散",
    kana: "よくかんさん",
    plans: ["basic", "standard"],
    concerns: ["イライラ", "緊張", "不眠", "気の高ぶり"],
    lead: "イライラや気の高ぶり、緊張による眠りの浅さが気になる方の相談で用いられることがあります。",
    description: "症状の強さや背景を確認したうえで、医師が処方の可否を判断します。",
    image: "/images/kampo/yokukansan.jpg",
    placeholder: true,
    tone: "#e9ece4",
    accent: "#647058",
    doctorConsiders: ["イライラ・気の高ぶり", "緊張で眠れない"],
    cautionCases: ["低カリウム血症が報告されることがあるため、長期服用時は定期確認が必要"],
  },
  {
    id: "hochuekkito",
    number: "No.41",
    name: "補中益気湯",
    kana: "ほちゅうえっきとう",
    plans: ["basic", "standard"],
    concerns: ["疲労感", "気力低下", "食欲不振", "夏バテ"],
    lead: "疲れやすく、気力や食欲が低下している方の相談で用いられることがあります。",
    description: "体力・食欲・現在の服薬状況を確認したうえで、医師が処方を判断します。",
    image: "/images/kampo/hochuekkito.jpg",
    placeholder: true,
    tone: "#efeadd",
    accent: "#857237",
    doctorConsiders: ["疲労感が抜けない", "気力・食欲が落ちている"],
    cautionCases: ["甘草を含むため、長期服用時は偽アルドステロン症等に注意"],
  },
  {
    id: "yokukansankachinpihange",
    number: "No.83",
    name: "抑肝散加陳皮半夏",
    kana: "よくかんさんかちんぴはんげ",
    plans: ["standard", "intensive"],
    concerns: ["イライラ", "胃腸虚弱", "不眠", "緊張"],
    lead: "胃腸が弱い方のイライラや眠りの浅さで用いられることがあります。",
    description: "胃腸の状態や体力を確認し、医師が処方の可否を判断します。",
    image: "/images/kampo/yokukansankachinpihange.jpg",
    placeholder: true,
    tone: "#e8ece8",
    accent: "#5e7a5e",
    doctorConsiders: ["胃腸が弱く、イライラ・不眠が重なる"],
    cautionCases: ["低カリウム血症などが報告されることがあるため、長期服用時は定期確認"],
  },
];

export const SIDE_EFFECTS_GENERAL = [
  "発疹・かゆみ",
  "胃部不快感・食欲不振",
  "下痢",
  "肝機能障害",
  "間質性肺炎",
  "偽アルドステロン症（むくみ・血圧上昇・低カリウム血症など）",
];

// ─────────────────────────────────────────────────────────────
// 悩みカテゴリ（6種）
// ─────────────────────────────────────────────────────────────
export type ConcernId =
  | "pms_meno"
  | "sleep"
  | "anxiety"
  | "edema"
  | "circulation"
  | "postpartum";

export type Concern = {
  id: ConcernId;
  label: string;
  description: string;
  plans: PlanId[];
  medicineIds: string[];
};

export const CONCERNS: Concern[] = [
  {
    id: "pms_meno",
    label: "PMS・更年期のゆらぎ",
    description: "月経前や更年期のイライラ・落ち込み・のぼせ",
    plans: ["basic", "standard"],
    medicineIds: ["kamishoyosan", "tokishakuyakusan", "keishibukuryogan"],
  },
  {
    id: "sleep",
    label: "睡眠の悩み",
    description: "寝つきが悪い・眠りが浅い・夜中に目が覚める",
    plans: ["standard", "intensive"],
    medicineIds: ["sansonninto", "kamikihito", "hangekobokuto"],
  },
  {
    id: "anxiety",
    label: "不安・緊張・イライラ",
    description: "気持ちが張りつめる・のどのつかえ・気の高ぶり",
    plans: ["basic", "standard"],
    medicineIds: ["hangekobokuto", "kamishoyosan", "yokukansan"],
  },
  {
    id: "edema",
    label: "むくみ・便秘・重だるさ",
    description: "下半身のむくみ・便秘がち・体の重さ",
    plans: ["light", "basic"],
    medicineIds: ["boiogito", "bofutsushosan"],
  },
  {
    id: "circulation",
    label: "冷え・のぼせ・巡り",
    description: "冷えとほてりが混ざる・月経に伴う不調",
    plans: ["basic", "standard"],
    medicineIds: ["tokishakuyakusan", "keishibukuryogan", "kamishoyosan"],
  },
  {
    id: "postpartum",
    label: "産後のこころと体の相談",
    description: "産後の疲労感・気分のゆらぎ・睡眠不足",
    plans: ["basic", "standard"],
    medicineIds: ["kamikihito", "tokishakuyakusan"],
  },
];

// ─────────────────────────────────────────────────────────────
// 体質チェック（5問）
// 結果はプラン候補 + 薬剤候補（断定しない）+ 危険サイン警告
// ─────────────────────────────────────────────────────────────
export type Q1Id =
  | "pms"
  | "meno"
  | "sleep"
  | "anxiety"
  | "edema"
  | "circulation"
  | "postpartum"
  | "other";

export const Q1_OPTIONS: { id: Q1Id; label: string }[] = [
  { id: "pms", label: "PMS・生理前の不調" },
  { id: "meno", label: "更年期のゆらぎ" },
  { id: "sleep", label: "眠れない・眠りが浅い" },
  { id: "anxiety", label: "不安・緊張・イライラ" },
  { id: "edema", label: "むくみ・便秘・重だるさ" },
  { id: "circulation", label: "冷え・のぼせ・巡り" },
  { id: "postpartum", label: "産後のこころと体の不調" },
  { id: "other", label: "その他" },
];

export const Q2_OPTIONS = [
  "イライラしやすい",
  "不安感がある",
  "寝つきが悪い",
  "夜中に目が覚める",
  "疲れやすい",
  "冷えやすい",
  "のぼせる",
  "むくみやすい",
  "便秘がち",
  "のどのつかえ感がある",
  "食欲が乱れる",
  "肌の乾燥が気になる",
] as const;

export const Q3_OPTIONS = [
  "体力はある方",
  "疲れやすい",
  "冷えやすい",
  "汗をかきやすい",
  "胃腸が弱い",
  "便秘がち",
  "下痢しやすい",
  "むくみやすい",
] as const;

// Q4 安全確認（はい/いいえ）— danger フラグつき
export type Q4Item = {
  id: string;
  label: string;
  danger?: boolean; // true なら「はい」回答時に警告分岐
  caution?: boolean; // 注意メッセージ（強い警告ではない）
};
export const Q4_ITEMS: Q4Item[] = [
  { id: "pregnant", label: "妊娠中、または妊娠の可能性がある", danger: true },
  { id: "lactating", label: "授乳中である", danger: true },
  { id: "treating", label: "現在、医療機関で治療中の病気がある", caution: true },
  { id: "medication", label: "現在、服用中の薬がある", caution: true },
  { id: "allergy", label: "薬や食品でアレルギーが出たことがある", caution: true },
  { id: "depression", label: "強い抑うつ気分がある", danger: true },
  { id: "suicide", label: "死にたい気持ちがある", danger: true },
  { id: "eating", label: "食事を極端に制限している、または過食・嘔吐がある", danger: true },
  { id: "postpartum_strong", label: "産後で強い不安や眠れなさが続いている", danger: true },
];

export type Q5Id = "cheap" | "single" | "sleep_stress" | "multi" | "doctor";
export const Q5_OPTIONS: { id: Q5Id; label: string }[] = [
  { id: "cheap", label: "できるだけ安く始めたい" },
  { id: "single", label: "まずは1種類で相談したい" },
  { id: "sleep_stress", label: "睡眠やストレスも含めて相談したい" },
  { id: "multi", label: "複数の悩みをまとめて相談したい" },
  { id: "doctor", label: "医師に任せたい" },
];

export type CheckAnswers = {
  q1?: Q1Id;
  q2?: number[];
  q3?: number[];
  q4?: Record<string, boolean>;
  q5?: Q5Id;
};

const Q1_TO_MEDS: Record<Q1Id, string[]> = {
  pms: ["kamishoyosan", "tokishakuyakusan", "keishibukuryogan"],
  meno: ["kamishoyosan", "keishibukuryogan", "kamikihito"],
  sleep: ["sansonninto", "kamikihito", "hangekobokuto"],
  anxiety: ["kamishoyosan", "hangekobokuto", "yokukansan"],
  edema: ["boiogito", "bofutsushosan"],
  circulation: ["tokishakuyakusan", "keishibukuryogan", "kamishoyosan"],
  postpartum: ["kamikihito", "tokishakuyakusan"],
  other: [],
};

export type CheckResult = {
  primaryPlan: Plan;
  alternativePlans: Plan[];
  medicineCandidates: Medicine[];
  cautions: string[]; // Q4 caution（danger ではない）
  dangerSigns: string[]; // Q4 danger 由来の文言
  hasDanger: boolean;
};

export function evaluateAnswers(answers: CheckAnswers): CheckResult {
  const dangerSigns: string[] = [];
  const cautions: string[] = [];
  if (answers.q4) {
    for (const item of Q4_ITEMS) {
      if (answers.q4[item.id]) {
        if (item.danger) dangerSigns.push(item.label);
        else if (item.caution) cautions.push(item.label);
      }
    }
  }

  const symptomCount = (answers.q2?.length ?? 0) + (answers.q3?.length ?? 0);
  const q1 = answers.q1 ?? "other";
  const q5 = answers.q5;

  // プラン推薦ロジック
  let planId: PlanId = "basic";
  if (q5 === "cheap") planId = "light";
  else if (q5 === "single") planId = "basic";
  else if (q5 === "sleep_stress") planId = "standard";
  else if (q5 === "multi") planId = "intensive";

  // q5=doctor または未指定 → q1/症状数で推薦
  const isHeavy =
    q1 === "sleep" ||
    (q1 === "anxiety" && symptomCount >= 5) ||
    symptomCount >= 7;
  const isLight = q1 === "edema" || (q1 === "other" && symptomCount <= 2);

  if (q5 === "doctor" || q5 == null) {
    if (isHeavy) planId = "standard";
    else if (isLight) planId = "light";
    else planId = "basic";
  }

  // 複合性が強ければ集中ケア候補へ昇格
  const sleepHit = (answers.q2 ?? []).some((i) => Q2_OPTIONS[i] === "寝つきが悪い" || Q2_OPTIONS[i] === "夜中に目が覚める");
  const anxietyHit = (answers.q2 ?? []).some((i) => Q2_OPTIONS[i] === "不安感がある" || Q2_OPTIONS[i] === "イライラしやすい");
  if (sleepHit && anxietyHit && q5 !== "cheap") {
    if (planId === "light") planId = "basic";
    if (q5 === "multi" || symptomCount >= 8) planId = "intensive";
  }

  const primaryPlan = PLANS.find((p) => p.id === planId)!;
  const orderedIds = ["light", "basic", "standard", "intensive"] as const;
  const idx = orderedIds.indexOf(planId);
  const altIds = [orderedIds[Math.max(0, idx - 1)], orderedIds[Math.min(3, idx + 1)]].filter(
    (i) => i !== planId,
  );
  const alternativePlans = altIds
    .map((id) => PLANS.find((p) => p.id === id))
    .filter((p): p is Plan => Boolean(p));

  const candidateIds = Q1_TO_MEDS[q1] ?? [];
  const medicineCandidates = candidateIds
    .map((id) => MEDICINES.find((m) => m.id === id))
    .filter((m): m is Medicine => Boolean(m))
    .slice(0, 3);

  return {
    primaryPlan,
    alternativePlans,
    medicineCandidates,
    cautions,
    dangerSigns,
    hasDanger: dangerSigns.length > 0,
  };
}

// ─────────────────────────────────────────────────────────────
// 共通の注意・薬機法配慮テキスト
// ─────────────────────────────────────────────────────────────
export const COMMON_NOTES = {
  pricingHero: [
    "表示価格は税別です。",
    "医師の診療により、処方の可否・処方内容・配送頻度は異なります。",
    "自由診療のため、公的医療保険は適用されません。",
  ],
  serviceFooter:
    "本サービスは自由診療によるオンライン診療・医療用漢方の継続処方サービスです。掲載内容は特定の疾患の診断、治療、治癒を保証するものではありません。処方の可否・処方内容・配送頻度は、提携クリニックの医師が診療のうえ判断します。",
  emergency:
    "体調に強い異変がある場合、希死念慮がある場合、強い抑うつ、不眠、摂食障害が疑われる場合、産後の強い不調がある場合は、速やかにお近くの医療機関または救急相談窓口にご相談ください。",
  detailDisclaimer:
    "このページは、医療用漢方に関する一般的な情報提供を目的としたものです。実際の処方は、提携クリニックの医師が診療のうえ判断します。掲載内容は、特定の疾患の診断・治療・治癒を保証するものではありません。",
};
