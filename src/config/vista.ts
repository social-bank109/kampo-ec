// ─────────────────────────────────────────────────────────────
// VISTA Wellness — 美容漢方オンライン診療 サイト設定（単一の参照元）
//
// ・LINE URL、料金、受診の流れ、FAQ、漢方6剤などの表示値はここで一元管理します。
// ・JSX に URL・金額・薬剤名を直書きしないこと。
// ・`TODO: BUSINESS_APPROVAL` / `TODO: MEDICAL_REVIEW` / `TODO: LEGAL_REVIEW` の付いた
//   項目は、公開前に事業責任者・提携医師・法務の確認が必要です
//   （一覧は docs/vista-launch-review.md）。
// ─────────────────────────────────────────────────────────────

export const SITE = {
  name: "VISTA Wellness",
  logoMain: "VISTA",
  logoSub: "Wellness",
  logoTagline: "MEDICAL KAMPO FOR SKIN",
  url: "https://wellness.vista-group.jp",
  title: "VISTA Wellness｜繰り返す大人ニキビ・生理前の肌荒れに、医師による美容漢方オンライン診療",
  description:
    "繰り返す大人ニキビ・生理前の肌荒れに。肌だけでなく、月経や冷え・便通なども確認する、医師による美容漢方オンライン診療。自由診療。診療・処方は提携医療機関の医師が行います。",
  /** 運営会社（診療・処方は行わない） */
  operator: "株式会社Social Bank",
  /**
   * 提携医療機関の名称・所在地・管理者
   * TODO: BUSINESS_APPROVAL / BLOCKER — リポジトリ内に確定情報なし。架空値を入れないこと。
   * 確定後に値を入れると、フッター・医療広告ページに表示されます。
   */
  clinic: null as null | { name: string; address: string; director?: string },
};

/**
 * LINE 友だち追加 → オンライン診療予約 の本番URL（全CTAの唯一の参照元）
 * 既存運用の公式アカウントURL。変更する場合はここだけを書き換える。
 */
export const LINE_URL = "https://lin.ee/yn4fg0L";

/** 全ページ共通のメインCTAラベル */
export const LINE_CTA_LABEL = "LINEで診療予約へ";

/** CTA 直下に置く補足（真実でない無料訴求をしない） */
export const LINE_CTA_NOTE = "LINE追加だけでは、診療の予約・決済は確定しません。";

// ─────────────────────────────────────────────────────────────
// 料金（美容漢方プラン 1プランのみ）
//
// 既存の課金実装・決済リンクはこのリポジトリに存在しません（予約・問診・決済は
// LINE／提携医療機関側で実施）。ここは「表示」専用の値です。決済額と表示額の
// 突合は docs/vista-launch-review.md のチェック項目で行います。
// ─────────────────────────────────────────────────────────────
export const PLAN = {
  name: "美容漢方プラン",
  /** 利用規約 第16条 上の名称（規約改定までは併記が必要） TODO: LEGAL_REVIEW */
  legacyName: "お試しプラン",
  /** 月額（円） */
  monthly: 6980,
  /**
   * 税込表示かどうか。
   * 既存サイト・利用規約 第15条7項（別途明記がない限り税込表示）・第16条で
   * 「月額6,980円（税込）」として公開済みの値を踏襲。
   * TODO: BUSINESS_APPROVAL — 新プランでも税込のまま据え置くか最終確認。
   */
  taxIncluded: true,
  /**
   * 診察料（医師の診察の結果、処方なしとなった場合のみ）— 利用規約 第15条8項の現行運用。
   * TODO: BUSINESS_APPROVAL — 参考モックの「初診料3,300円を別途」は現行規約と異なるため未採用。
   * 初診料を別途請求する運用に変える場合は、規約・特商法の改定が先に必要。
   */
  noPrescriptionFee: 3300,
  /** 予約キャンセル料（診療予定日時の24時間前以降）— 利用規約 第20条2項 */
  lateCancelFee: 3300,
  /** 定期プランの変更・休止・解約の締切 — 利用規約 第18条2項 */
  changeDeadline: "次回決済予定日または次回契約更新日の3日前まで",
  includes: [
    "医師によるオンライン診療（初診・再診）",
    "医師が必要と判断した場合の医療用漢方 1剤",
    "処方薬のご自宅への配送",
  ],
};

export const yen = (n: number) => `${n.toLocaleString("ja-JP")}円`;
export const TAX_LABEL = PLAN.taxIncluded ? "税込" : "税別";
export const PRICE_SHORT = `月額${yen(PLAN.monthly)}（${TAX_LABEL}）`;

/** 料金の内訳表（料金ページ・ホーム共通）。status が "confirm" の行は要承認。 */
export type FeeRow = {
  label: string;
  value: string;
  note?: string;
  /** current = 既存の規約・表示に根拠あり / confirm = 公開前に事業確認が必要 */
  status: "current" | "confirm";
};

export const FEE_ROWS: FeeRow[] = [
  {
    label: "月額（美容漢方プラン）",
    value: `${yen(PLAN.monthly)}（${TAX_LABEL}）`,
    note: "オンライン診療・医療用漢方1剤・配送を含む料金の目安です。",
    status: "current",
  },
  {
    label: "初回のお支払い",
    value: `処方ありの場合 ${yen(PLAN.monthly)}（${TAX_LABEL}）／処方なしの場合 診察料${yen(PLAN.noPrescriptionFee)}（${TAX_LABEL}）`,
    note: "LINEの友だち追加・予約の時点では費用は発生しません。",
    status: "current",
  },
  {
    label: "処方されなかった場合",
    value: `診察料 ${yen(PLAN.noPrescriptionFee)}（${TAX_LABEL}）`,
    note: "医師の診察の結果、漢方薬を処方しない判断となった場合。",
    status: "current",
  },
  {
    label: "再診",
    value: "初回処方の約1か月後、以降は原則3か月ごと",
    note: "再診時の費用の扱いは、予約時にご案内します。",
    // TODO: BUSINESS_APPROVAL — 再診料を月額に含むか・別途請求か
    status: "confirm",
  },
  {
    label: "配送料",
    value: "決済前に金額をご案内します",
    // TODO: BUSINESS_APPROVAL — 送料を月額に含むか・別途か、離島等の扱い（利用規約 第15条1項では利用料に配送料を含む）
    status: "confirm",
  },
  {
    label: "お支払い時期・方法",
    value: "診療確定後にご案内",
    note: "決済方法・決済単位（1か月ごと／3か月ごと等）はLINE等でご案内します。",
    // TODO: BUSINESS_APPROVAL — 決済手段・90日分発送時の請求単位
    status: "confirm",
  },
  {
    label: "変更・休止・解約",
    value: PLAN.changeDeadline,
    note: "期限を過ぎた場合、次回分の決済・配送が行われることがあります。",
    status: "current",
  },
  {
    label: "予約キャンセル",
    value: `診療予定日時の24時間前以降はキャンセル料${yen(PLAN.lateCancelFee)}（${TAX_LABEL}）を申し受けることがあります`,
    status: "current",
  },
  {
    label: "返品・返金",
    value: "医薬品の性質上、お客様都合の返品・返金は不可",
    note: "誤配送・破損等は到着後7日以内にご連絡ください。",
    status: "current",
  },
];

// ─────────────────────────────────────────────────────────────
// 受診の流れ（実際の順序を崩さないこと）
// ─────────────────────────────────────────────────────────────
export const FLOW_STEPS = [
  { n: "01", title: "LINEを友だち追加", body: "公式LINEから、診療の流れや予約方法のご案内を確認します。" },
  { n: "02", title: "Web予約", body: "希望日時を申請し、確定のご連絡をお待ちください。" },
  { n: "03", title: "Web問診", body: "肌の状態、月経・体調、既往歴、服薬状況などにご回答いただきます。" },
  { n: "04", title: "オンライン診療", body: "提携医療機関の医師が、症状と体調を確認します。" },
  { n: "05", title: "処方の判断", body: "医療用漢方が適するかどうか、処方の可否を医師が判断します。" },
  { n: "06", title: "決済", body: "処方がある場合はプラン料金、処方なしの場合は診察料をお支払いいただきます。" },
  { n: "07", title: "発送", body: "処方・決済の完了後、ご自宅へお届けします。初回は原則30日分です。" },
  { n: "08", title: "再診", body: "約1か月後に再診。継続できる場合は原則3か月ごと・90日分のお届けに移行します。" },
];

/** 4ステップ版（ホームの「はじめ方」など簡潔な表示用） */
export const FLOW_SHORT = [
  { n: "01", title: "LINEを追加", body: "公式LINEから案内を確認" },
  { n: "02", title: "予約・Web問診", body: "希望日時の申請と問診への回答" },
  { n: "03", title: "オンライン診療", body: "医師が症状・体調を確認し処方を判断" },
  { n: "04", title: "決済・お届け", body: "処方がある場合に決済・発送" },
];

// ─────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────
export type FaqItem = { q: string; a: string };

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "どんな肌悩みを相談できますか？",
    a: "繰り返す大人ニキビや、生理前に悪化しやすい肌荒れなどのご相談を想定しています。症状によっては、皮膚科での標準的な治療や対面診療が適切な場合もあり、その際は医療機関への受診をご案内します。",
  },
  {
    q: "オンラインで診察を受けられますか？",
    a: "はい。提携医療機関の医師が、オンライン診療で症状・体調・既往歴・服薬状況を確認します。オンラインでの診療が適さないと医師が判断した場合は、対面での受診をご案内します。",
  },
  {
    q: "LINEを追加すると費用は発生しますか？",
    a: `LINEの友だち追加や予約の時点では費用は発生しません。診療を受けた後、処方がある場合は${PLAN.name}の料金、処方なしの場合は診察料${yen(PLAN.noPrescriptionFee)}（${TAX_LABEL}）がかかります。`,
  },
  {
    q: "保険は使えますか？",
    a: "本サービスは自由診療のため、公的医療保険は適用されません。",
  },
  {
    q: "必ず漢方薬を処方してもらえますか？",
    a: "いいえ。医師が診療のうえ、医学的に必要かつ適切と判断した場合にのみ処方します。ご希望の漢方が処方されるとは限りません。",
  },
  {
    q: "副作用はありますか？",
    a: "漢方薬にも副作用があります。発疹・かゆみ、胃部不快感、下痢などのほか、まれに偽アルドステロン症、肝機能障害、間質性肺炎などの重い副作用が起こることがあります。注意点は薬剤ごとに異なるため、診療時に医師が確認します。",
  },
  {
    q: "妊娠中・授乳中でも相談できますか？",
    a: "妊娠中・妊娠の可能性がある方・授乳中の方は、必ず問診・診療時にお伝えください。処方できない、または対面での受診をご案内する場合があります。",
  },
  {
    q: "ほかの薬や皮膚科の治療と併用できますか？",
    a: "服用中のお薬、外用薬、サプリメント、通院中の治療は問診で必ずお知らせください。医師が飲み合わせや併用の可否を確認します。現在の皮膚科治療を自己判断で中止しないでください。",
  },
  {
    q: "予約のキャンセルや解約はできますか？",
    a: `予約の変更・キャンセルは所定の方法（公式LINE等）で手続きできます。診療予定日時の24時間前以降はキャンセル料${yen(PLAN.lateCancelFee)}（${TAX_LABEL}）がかかることがあります。定期プランの変更・休止・解約は${PLAN.changeDeadline}にお手続きください。詳しくは利用規約をご確認ください。`,
  },
];

// ─────────────────────────────────────────────────────────────
// 漢方6剤（ホーム FORMULATIONS / 詳細ページ）
//
// status:
//   available … 取り扱い中（2026/11 時点で6剤すべて）
//   planned   … 新規導入予定。仕入・院内採用・医師承認が確定するまで「導入準備中」と表示
// TODO: MEDICAL_REVIEW — 説明文・効能効果・注意事項は、採用メーカー・剤形の最新電子添文と
//                         提携医師の確認が必要。
// ─────────────────────────────────────────────────────────────
export type KampoGroup = "skin" | "balance";
export type KampoStatus = "available" | "planned";

export type Kampo = {
  /** URL (/products/[id]) に使う ID。既存ページの ID は変更しない */
  id: string;
  /** public/images/vista/ の画像キー（vistaAssets.ts） */
  assetKey: string;
  name: string;
  reading: string;
  group: KampoGroup;
  status: KampoStatus;
  /** メーカー製品番号（採用製品が確認できたもののみ） */
  makerNumber?: string;
  /** カードに表示する短い説明（効果を保証しない） */
  summary: string;
  /** 診療時に医師が確認する主なポイント */
  checkPoints: string[];
  /** 特に注意が必要なケース（製品別の確認が前提） */
  cautions: string[];
};

export const KAMPO_GROUPS: { id: KampoGroup; title: string; en: string; lead: string }[] = [
  {
    id: "skin",
    title: "ニキビ・皮膚症状で検討されることがある漢方",
    en: "SKIN",
    lead: "肌の症状そのものについて、医師が適否を判断します。",
  },
  {
    id: "balance",
    title: "月経・冷えなど併存する症状で検討されることがある漢方",
    en: "BODY & BALANCE",
    lead: "肌の悩みとあわせて月経や冷えなどの症状がある場合に、その評価に応じて検討します。肌荒れそのものへの効果を約束するものではありません。",
  },
];

export const KAMPO: Kampo[] = [
  {
    id: "seijobofuto",
    assetKey: "kampoSeijoBofuto",
    name: "清上防風湯",
    reading: "せいじょうぼうふうとう",
    group: "skin",
    status: "available",
    makerNumber: "TJ-58",
    summary: "赤みや炎症を伴うニキビなどで検討されることがある医療用漢方です。",
    checkPoints: ["ニキビの部位・赤み・炎症の程度", "これまでの皮膚科治療・外用薬", "胃腸の状態や体力"],
    cautions: ["胃腸が弱い方", "他の漢方薬・甘草を含む薬を服用中の方"],
  },
  {
    id: "keigairengyoto",
    assetKey: "kampoKeigaiRengyoto",
    name: "荊芥連翹湯",
    reading: "けいがいれんぎょうとう",
    group: "skin",
    status: "available",
    makerNumber: "TJ-50",
    summary: "にきびなどの皮膚症状で検討されることがある医療用漢方です。",
    checkPoints: ["繰り返す肌の症状と経過", "鼻・のどなど他の症状の有無", "服用中の薬"],
    cautions: ["胃腸が弱い方", "他の漢方薬・甘草を含む薬を服用中の方"],
  },
  {
    id: "jumihaidokuto",
    assetKey: "kampoJumiHaidokuto",
    name: "十味敗毒湯",
    reading: "じゅうみはいどくとう",
    group: "skin",
    status: "available",
    makerNumber: "TJ-6",
    summary: "化膿を伴う皮膚の症状などで検討されることがある医療用漢方です。",
    checkPoints: ["化膿・腫れの有無と範囲", "症状が出始めた時期", "アレルギー歴"],
    cautions: ["強い痛み・発熱・急な悪化がある場合は対面受診を優先", "他の漢方薬・甘草を含む薬を服用中の方"],
  },
  {
    id: "keishibukuryogan",
    assetKey: "kampoKeishiBukuryogan",
    name: "桂枝茯苓丸",
    reading: "けいしぶくりょうがん",
    group: "balance",
    status: "available",
    makerNumber: "TJ-25",
    summary: "月経に伴う不調やのぼせなど、併存する症状の評価に応じて検討されることがあります。",
    checkPoints: ["月経周期と肌の状態の関係", "のぼせ・肩こり・下腹部の張り", "妊娠の可能性"],
    cautions: ["妊娠中・妊娠の可能性がある方", "胃腸が弱い方"],
  },
  {
    id: "tokishakuyakusan",
    assetKey: "kampoTokiShakuyakusan",
    name: "当帰芍薬散",
    reading: "とうきしゃくやくさん",
    group: "balance",
    status: "available",
    makerNumber: "TJ-23",
    summary: "冷えや月経に伴う不調など、併存する症状の評価に応じて検討されることがあります。",
    checkPoints: ["冷え・むくみ・疲れやすさ", "月経に伴う不調", "胃腸の状態"],
    cautions: ["胃腸が弱い方", "妊娠中・授乳中の方は医師に申告"],
  },
  {
    id: "kamishoyosan",
    assetKey: "kampoKamiShoyosan",
    name: "加味逍遙散",
    reading: "かみしょうようさん",
    group: "balance",
    status: "available",
    makerNumber: "TJ-24",
    summary: "月経関連の不調やいらだちなど、併存する症状の評価に応じて検討されることがあります。",
    checkPoints: ["月経前の気分の変化・いらだち", "のぼせ・ほてり", "睡眠や便通の状態"],
    cautions: ["胃腸が弱い方", "他の漢方薬・甘草を含む薬を服用中の方"],
  },
];

/** 全カード共通の注記 */
export const KAMPO_DOCTOR_NOTE = "医師判断で処方";
/** status が planned のときに表示するバッジ */
export const KAMPO_PLANNED_LABEL = "導入準備中";

export function findKampo(id: string) {
  return KAMPO.find((k) => k.id === id);
}

/** 6剤共通の副作用の注意（一般論。剤ごとの確認が前提） */
export const KAMPO_SAFETY_NOTE =
  "漢方薬にも副作用があります。発疹・かゆみ、胃部不快感、下痢などのほか、まれに偽アルドステロン症、肝機能障害、間質性肺炎などの重い副作用が起こることがあります。起こりうる副作用や飲み合わせの注意点は薬剤によって異なるため、医師が診療時に確認します。";

/** ページ下部・フッター等の共通開示 */
export const DISCLOSURE = {
  service:
    "本サービスは自由診療によるオンライン診療です。公的医療保険は適用されません。診療・処方は提携医療機関の医師が行い、運営会社（株式会社Social Bank）は診療・処方を行いません。掲載内容は特定の疾患の治癒や効果を保証するものではありません。",
  standardCare:
    "ニキビの状態によっては、皮膚科での標準的な治療（外用薬・内服薬など）や対面での診療が適切な場合があります。現在の治療を自己判断で中止しないでください。",
  emergency:
    "急激な悪化、強い痛みや腫れ、発熱などの全身症状がある場合は、お近くの医療機関を受診してください。お問い合わせフォームやLINEでは緊急の症状に対応できません。",
};
