// ─────────────────────────────────────────────────────────────
// VISTA Wellness — 自由診療オンライン漢方
// データマスタ：プラン / 漢方 / 主訴 / 標準処方 / 体質チェック設問
//
// 料金・プラン・主訴・漢方・読み仮名・画像はすべて本ファイルで一元管理します。
// UI 側では本ファイルの値のみを参照し、JSX に数値・薬剤名を直書きしないこと。
// ─────────────────────────────────────────────────────────────

export const BRAND = {
  name: "VISTA",
  sub: "Wellness",
  tagline: "こころと体のゆらぎに、医師と選ぶ漢方を。",
  subtagline:
    "PMS・更年期・睡眠の悩み・ストレスによる体調のゆらぎに。提携クリニックのオンライン診療を通じて、医師が体質や症状を確認し、必要に応じて医療用漢方を処方します。",
};

// LINE 友だち追加 → オンライン診療予約導線
export const LINE_ADD_FRIEND_URL = "https://lin.ee/yn4fg0L";

// ─────────────────────────────────────────────────────────────
// プラン（すべて税込表示）
// ─────────────────────────────────────────────────────────────
export type PlanId = "light" | "basic" | "standard" | "intensive";

/** 表示・比較の基準となるプランの並び順（安い順） */
export const PLAN_ORDER: PlanId[] = ["light", "basic", "standard", "intensive"];

export type Plan = {
  id: PlanId;
  /** カード左上に表示する英字ラベル */
  code: string;
  name: string;
  /** 月額・税込 */
  price: number;
  /** どんなお悩みの方向けか */
  target: string;
  /** 処方内容 */
  content: string;
  /** 補足（1行） */
  note: string;
  /** CTA ラベル */
  ctaLabel: string;
  /** カードのバッジ（任意） */
  badge?: string;
};

export const PLANS: Plan[] = [
  {
    id: "light",
    code: "LIGHT",
    name: "ライト",
    price: 6980,
    target: "むくみ・身体の重だるさなど、シンプルな体質ケア",
    content: "医療用漢方1剤\n代表処方：防已黄耆湯（ぼういおうぎとう）",
    note: "まずは気軽に医療用漢方を始めたい方に",
    ctaLabel: "このプランで相談する",
  },
  {
    id: "basic",
    code: "BASIC",
    name: "ベーシック",
    price: 8800,
    target: "PMS・更年期、不安・緊張、冷え・巡り、産後の体調など",
    content: "お悩みに応じた医療用漢方1剤",
    note: "はじめての方・日常的なゆらぎの相談におすすめ",
    ctaLabel: "このプランで相談する",
    badge: "POPULAR",
  },
  {
    id: "standard",
    code: "STANDARD",
    name: "スタンダード",
    price: 11000,
    target: "睡眠、不安・緊張、更年期、冷えなど、より幅広い不調",
    content: "お悩みに応じた医療用漢方1剤",
    note: "睡眠や複数の症状が気になる方に",
    ctaLabel: "このプランで相談する",
  },
  {
    id: "intensive",
    code: "INTENSIVE CARE",
    name: "集中ケア",
    price: 19800,
    target: "睡眠＋不安など複数の悩み、または特定の処方が必要なケース",
    content: "医師判断で最大2剤まで対応",
    note: "複数の悩みをまとめて相談したい方に",
    ctaLabel: "医師に相談する",
  },
];

/** 診察のみ（処方に至らなかった場合）の診察料・税込 */
export const CONSULTATION_ONLY_FEE = 3300;

/** 料金カード近く、CTA を押す前に必ず認識できる位置に出す一行注記 */
export const CONSULTATION_ONLY_FEE_INLINE = `※医師の診察により処方なしとなった場合は診察料${CONSULTATION_ONLY_FEE.toLocaleString()}円（税込）がかかります。`;

/** 料金セクション下部に置く、処方なしの場合の説明ブロック */
export const CONSULTATION_ONLY_FEE_BLOCK = {
  title: "処方に至らなかった場合の診察料について",
  body: [
    `医師の診察の結果、漢方薬を処方しない判断となった場合は、診察料${CONSULTATION_ONLY_FEE.toLocaleString()}円（税込）がかかります。`,
    "症状や既往歴、服薬状況、安全性等を確認した結果、医師が処方を適切ではないと判断する場合があります。",
  ],
};

/** 料金セクションの注記（最終版） */
export const PRICE_NOTES = [
  "表示価格はすべて税込です。",
  "処方内容は医師の診療により決定されます。希望する漢方が必ず処方されるものではありません。",
  `医師の診察の結果、漢方薬を処方しない判断となった場合は、診察料${CONSULTATION_ONLY_FEE.toLocaleString()}円（税込）がかかります。`,
  "初回は原則30日分を処方します。",
  "初回処方から約1か月後に再診を行います。",
  "問題なく継続できる場合は、その後は原則3か月ごとに診察し、90日分をまとめて処方・発送します。",
  "症状や安全性の観点から、他の医療機関への受診をご案内する場合があります。",
  "自由診療のため、公的医療保険は適用されません。",
];

/** 料金レンジ（各種文言で使い回す） */
export const PRICE_RANGE_LABEL = `月額${PLANS[0].price.toLocaleString()}円〜${PLANS[PLANS.length - 1].price.toLocaleString()}円（税込）`;

// ─────────────────────────────────────────────────────────────
// 漢方マスタ
//
// 画像について：
//   - image は任意（未登録の漢方は placeholder を表示）
//   - 既存画像は従来の命名（{romaji}.jpg）をそのまま維持
//   - 新規追加分は kampo-tj{番号}-{romaji}.webp を指定
//   - 指定パスにファイルを置けばコード変更なしで表示に切り替わります
//     （読み込みに失敗した場合は自動で placeholder にフォールバック）
//   - 詳細は docs/kampo-images.md を参照
// ─────────────────────────────────────────────────────────────
export type Medicine = {
  id: string;
  /** ツムラ番号（数値）。表示は tjLabel() で TJ0xx 形式に整形 */
  number: number;
  name: string;
  /** 読み仮名 */
  reading: string;
  /** 「〜の相談で用いられることがあります」の形式で記述 */
  description: string;
  tags: string[];
  plans: PlanId[];
  /** 未登録なら undefined（placeholder 表示） */
  image?: string;
  /** カード背景・アクセント色 */
  tone?: string;
  accent?: string;
  /** 詳細ページ：医師が検討するケース */
  doctorConsiders?: string[];
  /** 詳細ページ：注意が必要なケース */
  cautionCases?: string[];
};

/** ツムラ番号の表示形式（20 → "TJ020"） */
export function tjLabel(n: number): string {
  return `TJ${String(n).padStart(3, "0")}`;
}

export const MEDICINES: Medicine[] = [
  {
    id: "boiogito",
    number: 20,
    name: "防已黄耆湯",
    reading: "ぼういおうぎとう",
    description: "むくみや身体の重だるさが気になる方の相談で用いられることがあります。",
    tags: ["むくみ", "重だるさ"],
    plans: ["light"],
    image: "/images/kampo/boiogito.jpg",
    tone: "#eef1ea",
    accent: "#6f8a72",
    doctorConsiders: [
      "下半身を中心としたむくみが続く",
      "汗をかきやすく、身体が重だるい",
      "疲れやすく、巡りが滞りがちな体質",
    ],
    cautionCases: [
      "腎機能・心機能に持病がある場合は要相談",
      "他の利尿薬や血圧の薬を服用中の場合",
    ],
  },
  {
    id: "bofutsushosan",
    number: 62,
    name: "防風通聖散",
    reading: "ぼうふうつうしょうさん",
    description:
      "便秘がちで、お腹まわりや身体の重さが気になる方の相談で用いられることがあります。",
    tags: ["便秘", "お腹まわり", "重だるさ"],
    plans: ["basic"],
    image: "/images/kampo/bofutsushosan.jpg",
    tone: "#efebe1",
    accent: "#8a7a4a",
    doctorConsiders: [
      "便秘がちで、お腹に張りを感じる",
      "のぼせや顔のほてりが出やすい",
      "体力は比較的ある方",
    ],
    cautionCases: [
      "胃腸が弱い方、下痢しやすい方",
      "妊娠中・授乳中・体力の低下している方",
      "高血圧や心疾患の治療中",
    ],
  },
  {
    id: "kamishoyosan",
    number: 24,
    name: "加味逍遙散",
    reading: "かみしょうようさん",
    description:
      "PMSや更年期に伴うイライラ、不安、気分のゆらぎ、のぼせなどの相談で用いられることがあります。",
    tags: ["PMS", "更年期", "イライラ"],
    plans: ["basic"],
    image: "/images/kampo/kamishoyosan.jpg",
    tone: "#f1e6ea",
    accent: "#8a5a6c",
    doctorConsiders: [
      "月経前のイライラや気分のゆらぎ",
      "更年期のほてり・のぼせ・不安",
      "緊張で疲れやすく、気分の波が出やすい",
    ],
    cautionCases: [
      "胃腸がとても弱い方は症状が出ることがある",
      "肝機能に問題がある方は医師に相談",
    ],
  },
  {
    id: "nyoshinsan",
    number: 67,
    name: "女神散",
    reading: "にょしんさん",
    description:
      "のぼせ、ほてり、精神的なゆらぎなど、更年期や月経に伴う不調の相談で用いられることがあります。",
    tags: ["更年期", "のぼせ", "気分のゆらぎ"],
    plans: ["standard"],
    // 画像未登録：docs/kampo-images.md の手順で追加してください
    image: undefined,
    tone: "#eee2e6",
    accent: "#8f4e69",
    doctorConsiders: [
      "顔や頭に熱がこもる感じがある",
      "立ちくらみ・頭重が日によって出る",
      "気分の浮き沈みを感じやすい",
    ],
    cautionCases: ["妊娠中・授乳中の場合は要相談", "胃腸が弱い方は症状が出ることがある"],
  },
  {
    id: "sansonninto",
    number: 103,
    name: "酸棗仁湯",
    reading: "さんそうにんとう",
    description:
      "心身が疲れているのに寝つきにくい、眠りが浅い方の相談で用いられることがあります。",
    tags: ["睡眠", "不眠", "眠りが浅い"],
    plans: ["standard", "intensive"],
    image: "/images/kampo/sansonninto.jpg",
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
  },
  {
    id: "kamikihito",
    number: 137,
    name: "加味帰脾湯",
    reading: "かみきひとう",
    description:
      "疲労感、不安、考えすぎ、不眠などが重なる方の相談で用いられることがあります。",
    tags: ["疲労感", "不安", "睡眠"],
    plans: ["standard", "intensive"],
    image: "/images/kampo/kamikihito.jpg",
    tone: "#eee8da",
    accent: "#8a6f37",
    doctorConsiders: [
      "考え事で眠りが浅い",
      "疲労感と不安が重なっている",
      "食欲が落ちやすく、心配ごとを抱えがち",
    ],
    cautionCases: ["強い抑うつ・希死念慮がある場合は専門医療機関の受診を優先"],
  },
  {
    id: "hangekobokuto",
    number: 16,
    name: "半夏厚朴湯",
    reading: "はんげこうぼくとう",
    description:
      "不安感、緊張、のどのつかえ感が気になる方の相談で用いられることがあります。",
    tags: ["不安", "緊張", "のどのつかえ"],
    plans: ["basic"],
    image: "/images/kampo/hangekobokuto.jpg",
    tone: "#e8ece9",
    accent: "#6c8275",
    doctorConsiders: [
      "緊張すると息が浅くなる、ため息が増える",
      "のどに『つかえ感』が続く",
      "考え事で寝つきが悪くなる",
    ],
    cautionCases: ["強い抑うつ・希死念慮がある場合は専門医療機関の受診を優先"],
  },
  {
    id: "saikokaryukotsuboreito",
    number: 12,
    name: "柴胡加竜骨牡蛎湯",
    reading: "さいこかりゅうこつぼれいとう",
    description:
      "気持ちの高ぶり、不安、緊張、イライラなどの相談で用いられることがあります。",
    tags: ["不安", "緊張", "イライラ"],
    plans: ["standard"],
    // 画像未登録：docs/kampo-images.md の手順で追加してください
    image: undefined,
    tone: "#e9ece4",
    accent: "#647058",
    doctorConsiders: [
      "気持ちが高ぶって落ち着かない",
      "緊張や不安で眠りが浅くなる",
      "動悸やイライラを感じやすい",
    ],
    cautionCases: [
      "強い抑うつ・希死念慮がある場合は専門医療機関の受診を優先",
      "他の睡眠薬・抗不安薬を服用中の場合は要相談",
    ],
  },
  {
    id: "tokishakuyakusan",
    number: 23,
    name: "当帰芍薬散",
    reading: "とうきしゃくやくさん",
    description:
      "冷え、むくみ、月経に伴う不調などが気になる方の相談で用いられることがあります。",
    tags: ["冷え", "むくみ", "月経不調"],
    plans: ["basic"],
    image: "/images/kampo/tokishakuyakusan.jpg",
    tone: "#e9eef0",
    accent: "#5a7283",
    doctorConsiders: [
      "冷えやすく、疲れやすい",
      "月経に伴う不調を感じやすい",
      "顔色がすぐれず、立ちくらみが出やすい",
    ],
    cautionCases: ["胃腸が極端に弱い方は症状が出ることがある"],
  },
  {
    id: "tokishigyakukagoshuyushokyoto",
    number: 38,
    name: "当帰四逆加呉茱萸生姜湯",
    reading: "とうきしぎゃくかごしゅゆしょうきょうとう",
    description:
      "手足などの冷えが強い方や、冷えに伴う身体の不調の相談で用いられることがあります。",
    tags: ["冷え", "手足の冷え", "巡り"],
    plans: ["standard"],
    // 画像未登録：docs/kampo-images.md の手順で追加してください
    image: undefined,
    tone: "#e7eaef",
    accent: "#5b6b86",
    doctorConsiders: [
      "手足の先が冷えて温まりにくい",
      "冷えると下腹部や腰がつらくなる",
      "しもやけができやすい",
    ],
    cautionCases: ["妊娠中・授乳中の場合は要相談", "胃腸が弱い方は症状が出ることがある"],
  },
  {
    id: "unkeito",
    number: 106,
    name: "温経湯",
    reading: "うんけいとう",
    description:
      "冷えとのぼせが混在する場合や、月経に伴う複合的な不調の相談で用いられることがあります。",
    tags: ["冷え", "のぼせ", "月経不調"],
    plans: ["intensive"],
    // 画像未登録：docs/kampo-images.md の手順で追加してください
    image: undefined,
    tone: "#f3e8e2",
    accent: "#a7665b",
    doctorConsiders: [
      "下半身は冷えるのに、手のひらや足裏がほてる",
      "乾燥やくすみが気になり、唇が荒れやすい",
      "月経に伴う不調が重なりやすい",
    ],
    cautionCases: ["妊娠中・授乳中の場合は要相談", "胃腸が弱い方は症状が出ることがある"],
  },
];

/** 漢方紹介セクション冒頭の注意書き */
export const MEDICINE_SECTION_NOTE =
  "以下は各プランで取り扱う代表的な医療用漢方です。実際の処方は、医師が症状・体質・既往歴・服薬状況等を確認したうえで個別に判断します。";

/** 「実際の処方は医師が判断する」旨の短い注記（カード・CTA 付近で使用） */
export const DOCTOR_DECIDES_NOTE = "実際の処方は医師が診療のうえ個別に判断します。";

export const SIDE_EFFECTS_GENERAL = [
  "発疹・かゆみ",
  "胃部不快感・食欲不振",
  "下痢",
  "肝機能障害",
  "間質性肺炎",
  "偽アルドステロン症（むくみ・血圧上昇・低カリウム血症など）",
];

export function findMedicine(id: string): Medicine | undefined {
  return MEDICINES.find((m) => m.id === id);
}

// ─────────────────────────────────────────────────────────────
// 主訴 × プラン × 代表処方
//
// ※ この対応表はサイト全体の整合性の基準です。
//    主訴カードの対象プラン、体質チェックの結果、漢方カードの
//    対応プランはすべてここから導出されます。
//    ユーザーに表そのものを見せる必要はありません。
// ─────────────────────────────────────────────────────────────
export type ConcernId =
  | "pms_meno"
  | "sleep"
  | "anxiety"
  | "edema"
  | "circulation"
  | "postpartum";

export type StandardPrescription = {
  concern: ConcernId;
  /** 主訴のなかでの細かい切り口（内部確認用） */
  situation: string;
  plan: PlanId;
  /** 代表処方の漢方 ID（集中ケアは最大2剤） */
  medicineIds: string[];
};

export const STANDARD_PRESCRIPTIONS: StandardPrescription[] = [
  { concern: "pms_meno", situation: "PMS・更年期", plan: "basic", medicineIds: ["kamishoyosan"] },
  { concern: "pms_meno", situation: "PMS・更年期", plan: "standard", medicineIds: ["nyoshinsan"] },
  { concern: "sleep", situation: "睡眠", plan: "standard", medicineIds: ["sansonninto"] },
  { concern: "sleep", situation: "睡眠", plan: "intensive", medicineIds: ["sansonninto", "kamikihito"] },
  { concern: "anxiety", situation: "不安・緊張", plan: "basic", medicineIds: ["hangekobokuto"] },
  { concern: "anxiety", situation: "不安・緊張", plan: "standard", medicineIds: ["saikokaryukotsuboreito"] },
  { concern: "edema", situation: "むくみ・重だるさ", plan: "light", medicineIds: ["boiogito"] },
  { concern: "edema", situation: "便秘・お腹まわり", plan: "basic", medicineIds: ["bofutsushosan"] },
  { concern: "circulation", situation: "冷え・巡り", plan: "basic", medicineIds: ["tokishakuyakusan"] },
  { concern: "circulation", situation: "強い冷え", plan: "standard", medicineIds: ["tokishigyakukagoshuyushokyoto"] },
  { concern: "circulation", situation: "冷え＋のぼせ等", plan: "intensive", medicineIds: ["unkeito"] },
  { concern: "postpartum", situation: "産後の身体症状", plan: "basic", medicineIds: ["tokishakuyakusan"] },
  { concern: "postpartum", situation: "産後の疲労・不安・睡眠", plan: "standard", medicineIds: ["kamikihito"] },
];

export type Concern = {
  id: ConcernId;
  title: string;
  description: string;
};

const CONCERN_BASE: Concern[] = [
  {
    id: "pms_meno",
    title: "PMS・更年期のゆらぎ",
    description: "月経前や更年期のイライラ・気分のゆらぎ・のぼせ",
  },
  {
    id: "sleep",
    title: "睡眠の悩み",
    description: "寝つきが悪い・眠りが浅い・夜中に目が覚める",
  },
  {
    id: "anxiety",
    title: "不安・緊張・イライラ",
    description: "気持ちが張りつめる・のどのつかえ・気の高ぶり",
  },
  {
    id: "edema",
    title: "むくみ・便秘・重だるさ",
    description: "むくみ・身体の重だるさ・便秘やお腹まわりの悩み",
  },
  {
    id: "circulation",
    title: "冷え・のぼせ・巡り",
    description: "手足の冷え・冷えとのぼせ・月経に伴う不調",
  },
  {
    id: "postpartum",
    title: "産後のこころと体の相談",
    description: "産後の疲労感・気分のゆらぎ・睡眠不足",
  },
];

/** 並び順を PLAN_ORDER に揃えて重複を除く */
function sortPlans(plans: PlanId[]): PlanId[] {
  return PLAN_ORDER.filter((p) => plans.includes(p));
}

/** 主訴に対応するプラン（標準処方表から導出） */
export function plansForConcern(id: ConcernId): PlanId[] {
  return sortPlans(STANDARD_PRESCRIPTIONS.filter((s) => s.concern === id).map((s) => s.plan));
}

/** 主訴の代表処方となる漢方（標準処方表から導出・重複除去） */
export function medicinesForConcern(id: ConcernId): Medicine[] {
  const ids: string[] = [];
  for (const s of STANDARD_PRESCRIPTIONS) {
    if (s.concern !== id) continue;
    for (const mid of s.medicineIds) if (!ids.includes(mid)) ids.push(mid);
  }
  return ids.map(findMedicine).filter((m): m is Medicine => Boolean(m));
}

export const CONCERNS: (Concern & { plans: PlanId[]; medicines: Medicine[] })[] =
  CONCERN_BASE.map((c) => ({
    ...c,
    plans: plansForConcern(c.id),
    medicines: medicinesForConcern(c.id),
  }));

// ─────────────────────────────────────────────────────────────
// 診療・配送フロー
// ─────────────────────────────────────────────────────────────
export const TREATMENT_FLOW = [
  {
    n: "01",
    title: "初回診療",
    body: "オンライン問診と医師の診療で、症状・体質・既往歴・服薬状況を確認します。医師が必要と判断した場合に医療用漢方を処方します。",
  },
  {
    n: "02",
    title: "初回は30日分",
    body: "初回は原則30日分を処方します。服用後の効果や副作用、体調変化を確認します。",
  },
  {
    n: "03",
    title: "約1か月後に再診",
    body: "初回処方から約1か月後にオンラインで再診し、継続可否や処方内容を確認します。",
  },
  {
    n: "04",
    title: "継続後は3か月ごと",
    body: "問題なく継続できる場合は、その後は原則3か月ごとに診察し、90日分をまとめて処方・発送します。",
  },
];

export const HOW_IT_WORKS = [
  {
    n: "01",
    title: "体質チェック",
    body: "2分ほどの質問で、いまの悩みや体質、服薬状況を整理します。",
  },
  {
    n: "02",
    title: "オンライン診療",
    body: "提携クリニックの医師が、症状・既往歴・現在の服薬状況を確認し、処方の可否を判断します。",
  },
  {
    n: "03",
    title: "処方・お届け",
    body: "医師が必要と判断した場合、初回は原則30日分の医療用漢方を処方し、ご自宅へお届けします。",
  },
  {
    n: "04",
    title: "継続フォロー",
    body: "約1か月後に再診し、効果・副作用・体調変化を確認します。問題なく継続できる場合は、その後は原則3か月ごとの診察・90日分のまとめ配送に移行します。",
  },
];

// ─────────────────────────────────────────────────────────────
// 体質チェック（5問）
// 結果はプラン候補 + 代表処方の例（断定しない）+ 安全確認による受診案内
// ─────────────────────────────────────────────────────────────
export type Q1Id = ConcernId | "other";

export const Q1_OPTIONS: { id: Q1Id; label: string }[] = [
  { id: "pms_meno", label: "PMS・生理前の不調／更年期のゆらぎ" },
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

// Q4 安全確認（はい/いいえ）
//   danger  … 上位プランへの誘導ではなく、他医療機関への受診案内を優先する
//   caution … 診療時に医師へ申告いただく項目
export type Q4Item = {
  id: string;
  label: string;
  danger?: boolean;
  caution?: boolean;
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

export type CheckResult = {
  concern?: Concern & { plans: PlanId[]; medicines: Medicine[] };
  primaryPlan: Plan;
  alternativePlans: Plan[];
  medicineCandidates: Medicine[];
  /** Q4 caution（診療時に申告いただく項目） */
  cautions: string[];
  /** Q4 danger（他医療機関への受診案内を優先する項目） */
  dangerSigns: string[];
  hasDanger: boolean;
};

export function evaluateAnswers(answers: CheckAnswers): CheckResult {
  const dangerSigns: string[] = [];
  const cautions: string[] = [];
  if (answers.q4) {
    for (const item of Q4_ITEMS) {
      if (!answers.q4[item.id]) continue;
      if (item.danger) dangerSigns.push(item.label);
      else if (item.caution) cautions.push(item.label);
    }
  }

  const q1 = answers.q1 ?? "other";
  const concern = q1 === "other" ? undefined : CONCERNS.find((c) => c.id === q1);

  // 主訴に対応するプラン範囲。主訴が「その他」の場合は全プランを候補とする。
  const range = concern && concern.plans.length > 0 ? concern.plans : PLAN_ORDER;

  // ご希望の進め方（Q5）から、対応プラン範囲のどこをご案内するかを決める。
  // 症状の重さでプランを上げる設計にはしない。
  let planId: PlanId;
  switch (answers.q5) {
    case "multi":
      planId = range[range.length - 1];
      break;
    case "sleep_stress":
      planId = range[Math.min(1, range.length - 1)];
      break;
    case "cheap":
    case "single":
    case "doctor":
    default:
      planId = range[0];
      break;
  }

  const primaryPlan = PLANS.find((p) => p.id === planId) ?? PLANS[1];
  const alternativePlans = range
    .filter((id) => id !== planId)
    .map((id) => PLANS.find((p) => p.id === id))
    .filter((p): p is Plan => Boolean(p));

  // 代表処方の例：主訴に紐づくもののうち、ご案内するプランのものを優先して表示
  const forPlan = concern
    ? concern.medicines.filter((m) => m.plans.includes(planId))
    : [];
  const rest = concern ? concern.medicines.filter((m) => !forPlan.includes(m)) : [];
  const medicineCandidates = [...forPlan, ...rest].slice(0, 3);

  return {
    concern,
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
  serviceFooter:
    "本サービスは自由診療によるオンライン診療・医療用漢方の継続処方サービスです。掲載内容は特定の疾患の診断、治療、治癒を保証するものではありません。処方の可否・処方内容・配送頻度は、提携クリニックの医師が診療のうえ判断します。",
  emergency:
    "体調に強い異変がある場合、希死念慮がある場合、強い抑うつ、不眠、摂食障害が疑われる場合、産後の強い不調がある場合は、速やかにお近くの医療機関または救急相談窓口にご相談ください。",
  sideEffectConsult:
    "服用後に気になる症状や体調変化が生じた場合は、医師または薬剤師へご相談ください。症状によっては服用中止や受診が必要となる場合があります。",
  detailDisclaimer:
    "このページは、医療用漢方に関する一般的な情報提供を目的としたものです。実際の処方は、提携クリニックの医師が診療のうえ判断します。掲載内容は、特定の疾患の診断・治療・治癒を保証するものではありません。",
};
