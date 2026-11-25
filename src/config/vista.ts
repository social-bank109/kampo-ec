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
  title: "VISTA Wellness｜繰り返す大人ニキビ・生理前の肌荒れに、女性医師による美容漢方オンライン診療",
  description:
    "繰り返す大人ニキビ・生理前の肌荒れに。肌だけでなく、月経や冷え・便通なども確認する、女性医師による美容漢方オンライン診療。自由診療。診療・処方は提携医療機関の医師が行います。",
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
    "女性医師によるオンライン診療（初診・再診）",
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
// 診療体制（未確認の事実は断定しない）
// ─────────────────────────────────────────────────────────────
export const CONSULT_SETUP = {
  /**
   * 女性医師の担当を保証できるか。
   * 2026/11/19 事業責任者の確認により true（女性医師が対応）。
   * 再診・代診を含め女性医師が担当する体制を維持できなくなった場合は false に戻すこと。
   */
  femaleDoctorGuaranteed: true,
  /**
   * 診察時間の目安（例："10〜15分程度"）。運用で確定するまで null（分数を掲載しない）。
   * TODO: BUSINESS_APPROVAL
   */
  durationLabel: null as string | null,
};

// ─────────────────────────────────────────────────────────────
// 受診の流れ（実際の順序を崩さないこと）
// 初回30日分 → 約1か月後に再診 → 継続時は原則3か月ごと・90日分（利用規約 第17条3項）
// ─────────────────────────────────────────────────────────────
export type FlowIcon = "line" | "calendar" | "form" | "video" | "card" | "box" | "repeat";

export const FLOW_STEPS: { n: string; id: string; icon: FlowIcon; title: string; short: string }[] = [
  { n: "01", id: "step-line", icon: "line", title: "LINE友だち追加", short: "公式LINEから予約の案内へ" },
  { n: "02", id: "step-booking", icon: "calendar", title: "診療希望日の申請・予約確定", short: "希望日を申請し、日程調整後に確定" },
  { n: "03", id: "step-questionnaire", icon: "form", title: "Web問診の回答", short: "肌や体調、服薬状況を事前に回答" },
  { n: "04", id: "step-consultation", icon: "video", title: "オンライン診療", short: "女性医師が症状・体調を確認し処方を判断" },
  { n: "05", id: "step-payment", icon: "card", title: "オンライン決済", short: "診療・処方内容と料金を確認して決済" },
  { n: "06", id: "step-delivery", icon: "box", title: "漢方のお届け", short: "処方された漢方をご自宅へ" },
  { n: "07", id: "step-followup", icon: "repeat", title: "再診・継続処方", short: "経過や副作用を確認し継続を判断" },
];

/** 4ステップ版（ホームの「受診の流れ」など簡潔な表示用） */
export const FLOW_SHORT = [
  { n: "01", title: "LINEを追加", body: "公式LINEから案内を確認" },
  { n: "02", title: "予約・Web問診", body: "希望日時の申請と問診への回答" },
  { n: "03", title: "オンライン診療", body: "女性医師が症状・体調を確認し処方を判断" },
  { n: "04", title: "決済・お届け", body: "処方がある場合に決済・発送" },
];

/** 診察時のメイクに関する統一メッセージ（受診の必須条件にはしない） */
export const MAKEUP_MESSAGE = {
  main: "メイクをしたままでもオンライン診療を受けられます。",
  caution: "ただし、メイクによって肌の状態が確認しにくくなる場合があります。",
  recommend: "可能であれば診察前にメイクを落としておくことをおすすめします。",
};
export const MAKEUP_TEXT = `${MAKEUP_MESSAGE.main}${MAKEUP_MESSAGE.caution}${MAKEUP_MESSAGE.recommend}`;

// ─────────────────────────────────────────────────────────────
// FAQ（id は計測用の非センシティブな識別子）
// ─────────────────────────────────────────────────────────────
export type FaqItem = { id: string; q: string; a: string };

const FAQ: Record<string, FaqItem> = {
  makeup: {
    id: "makeup",
    q: "オンライン診療では、すっぴんになる必要がありますか？",
    a: `${MAKEUP_TEXT}メイクを落とすことは受診の必須条件ではありません。肌の状態によっては、医師が対面診療をご案内することがあります。`,
  },
  camera: {
    id: "camera",
    q: "カメラに顔を近づける必要がありますか？",
    a: "通常のビデオ通話から診察を始めます。肌の状態によっては、医師がカメラの角度や距離の調整をお願いする場合があります。特別な撮影機材は必要ありません。",
  },
  online_assessment: {
    id: "online_assessment",
    q: "オンラインでも肌の状態を判断できますか？",
    a: "Web問診やビデオ通話を通じて、症状の経過や肌の状態、体調などを確認します。ただし、オンラインでは確認できない症状もあるため、医師が必要と判断した場合は対面診療をご案内します。",
  },
  female_doctor: {
    id: "female_doctor",
    q: "女性医師に診察してもらえますか？",
    a: CONSULT_SETUP.femaleDoctorGuaranteed
      ? "はい。VISTA Wellnessでは、女性医師が診察を担当します。肌の悩みや月経など女性特有の体調についても、安心してご相談ください。"
      : "現在、女性医師による診察をお約束するものではありません。担当医師についてご希望がある場合は、予約の際にご相談ください。",
  },
  topics: {
    id: "topics",
    q: "どんなことを相談できますか？",
    a: "繰り返す大人ニキビや肌荒れのほか、月経に伴う体調の変化、冷え、むくみ、便通など、気になっていることを医師にお話しください。症状によっては、皮膚科での標準的な治療や対面診療が適切な場合もあります。",
  },
  prescription: {
    id: "prescription",
    q: "必ず漢方を処方してもらえますか？",
    a: "処方の可否は医師が診療のうえ判断します。症状によっては漢方が適さない場合や、皮膚科等の対面診療をおすすめする場合があります。",
  },
  duration: {
    id: "duration",
    q: "診察時間は何分くらいですか？",
    a: CONSULT_SETUP.durationLabel
      ? `目安は${CONSULT_SETUP.durationLabel}です。症状やご相談内容によって前後します。`
      : "診察時間は、症状やご相談内容によって異なります。",
  },
  line_cost: {
    id: "line_cost",
    q: "LINEを追加すると費用は発生しますか？",
    a: `LINEの友だち追加や予約の時点では費用は発生しません。診療を受けた後、処方がある場合は${PLAN.name}の料金、処方なしの場合は診察料${yen(PLAN.noPrescriptionFee)}（${TAX_LABEL}）がかかります。`,
  },
  insurance: {
    id: "insurance",
    q: "保険は使えますか？",
    a: "本サービスは自由診療のため、公的医療保険は適用されません。",
  },
  side_effects: {
    id: "side_effects",
    q: "副作用はありますか？",
    a: "漢方薬にも副作用があります。発疹・かゆみ、胃部不快感、下痢などのほか、まれに偽アルドステロン症、肝機能障害、間質性肺炎などの重い副作用が起こることがあります。注意点は薬剤ごとに異なるため、診療時に医師が確認します。",
  },
  pregnancy: {
    id: "pregnancy",
    q: "妊娠中・授乳中でも相談できますか？",
    a: "妊娠中・妊娠の可能性がある方・授乳中の方は、必ず問診・診療時にお伝えください。処方できない、または対面での受診をご案内する場合があります。",
  },
  other_meds: {
    id: "other_meds",
    q: "ほかの薬や皮膚科の治療と併用できますか？",
    a: "服用中のお薬、外用薬、サプリメント、通院中の治療は問診で必ずお知らせください。医師が飲み合わせや併用の可否を確認します。現在の皮膚科治療を自己判断で中止しないでください。",
  },
  cancel: {
    id: "cancel",
    q: "予約のキャンセルや解約はできますか？",
    a: `予約の変更・キャンセルは所定の方法（公式LINE等）で手続きできます。診療予定日時の24時間前以降はキャンセル料${yen(PLAN.lateCancelFee)}（${TAX_LABEL}）がかかることがあります。定期プランの変更・休止・解約は${PLAN.changeDeadline}にお手続きください。詳しくは利用規約をご確認ください。`,
  },
};

/** トップページの FAQ */
export const FAQ_ITEMS: FaqItem[] = [
  FAQ.makeup,
  FAQ.camera,
  FAQ.online_assessment,
  FAQ.female_doctor,
  FAQ.topics,
  FAQ.prescription,
  FAQ.line_cost,
  FAQ.insurance,
  FAQ.side_effects,
  FAQ.pregnancy,
  FAQ.other_meds,
  FAQ.cancel,
];

/** 「予約から再診までの流れ」ページの FAQ */
export const FAQ_FLOW_ITEMS: FaqItem[] = [
  FAQ.makeup,
  FAQ.camera,
  FAQ.online_assessment,
  FAQ.female_doctor,
  FAQ.duration,
  FAQ.prescription,
  FAQ.line_cost,
  FAQ.cancel,
];

// ─────────────────────────────────────────────────────────────
// 医療用漢方（確定6剤）— 2026/11/25 小林医師との協議結果により正式採用
//
// ・ラインナップ（6剤）は確定事項。採用・除外をコード側で再判断しないこと。
// ・「正式採用」と「在庫確保・処方開始準備の完了」は別に管理する（supply）。
// ・効能・効果／主な注意事項・副作用は、2026/11/25 医師の確認レビュー済みの文面（文言を改変しないこと）。
//   null にすると公開画面は「確認中」表示に戻る。
// ─────────────────────────────────────────────────────────────
export type KampoCategory = "SKIN" | "BODY" | "BALANCE";

export type Kampo = {
  /** URL (/products/[id]) に使う ID */
  id: string;
  /** 画像キー（vistaAssets.ts） */
  assetKey: string;
  name: string;
  reading: string;
  category: KampoCategory;
  /** カード・詳細に出す「主な紹介テーマ」（効能・効果の記載ではない） */
  theme: string;
  /** 処方の概要（薬効を含まない説明のみ） */
  overview: string;
  /** 効能・効果（医師の確認レビュー済みの文面を段落ごとに）。null = 確認中 */
  officialIndications: string[] | null;
  /** 効能・効果の補足（「〜を保証するものではありません」等）。※付きで表示 */
  indicationNote?: string | null;
  /** 主な注意事項・副作用（医師の確認レビュー済みの文面を段落ごとに）。null = 確認中 */
  productCautions: string[] | null;
  /** 採用メーカー・製品番号（確定後に設定）。null = 未確定 */
  maker: string | null;
  /** 在庫確保・処方開始準備。unconfirmed = 未確認（公開表示はしない。運営管理用） */
  supply: "unconfirmed" | "ready";
  /** 医療レビューの状態 */
  medicalReview: "pending" | "approved";
};

export const KAMPO_SECTION = {
  title: "肌と心身の状態に合わせて選ぶ、6つの医療用漢方。",
  lead: "ニキビや肌荒れだけでなく、月経に伴う不調、冷え、便通なども確認し、一人ひとりの状態に合わせて医師が処方を検討します。",
};


export const KAMPO: Kampo[] = [
  {
    id: "jumihaidokuto",
    assetKey: "kampoJumiHaidokuto",
    name: "十味敗毒湯",
    reading: "じゅうみはいどくとう",
    category: "SKIN",
    theme: "ニキビ・化膿性の皮膚症状など",
    overview: "肌の症状についてのご相談で、医師が適否を検討する医療用漢方です。",
    officialIndications: [
      "化膿を伴う皮膚のトラブルや、急性の皮膚症状などに用いられる漢方薬です。",
      "医療用製剤では、化膿性皮膚疾患、急性皮膚疾患の初期、じんましん、急性湿疹、水虫などが効能・効果として認められています。",
      "ニキビなどの皮膚症状についても、肌の状態や体質を確認したうえで、医師が処方を検討します。"
    ],
    indicationNote: null,
    productCautions: [
      "発疹、かゆみ、食欲不振、胃の不快感、吐き気、下痢などがあらわれることがあります。",
      "また、まれに血液中のカリウムが低下し、むくみや血圧上昇、筋力低下などを引き起こす偽アルドステロン症やミオパチーが生じることがあります。",
      "甘草を含む漢方薬や一部の医薬品との併用には注意が必要です。妊娠中・授乳中の方、胃腸が弱い方、ほかのお薬を服用している方は、事前に医師へお知らせください。"
    ],
    maker: null,
    supply: "unconfirmed",
    medicalReview: "approved",
  },
  {
    id: "unseiin",
    assetKey: "kampoUnseiin",
    name: "温清飲",
    reading: "うんせいいん",
    category: "SKIN",
    theme: "乾燥を伴う皮膚症状・炎症など",
    overview: "乾燥を伴う肌の症状などのご相談で、医師が適否を検討する医療用漢方です。",
    officialIndications: [
      "皮膚の色つやが悪く、のぼせを伴う方などに用いられる漢方薬です。",
      "ツムラの医療用製剤では、月経不順、月経困難、血の道症、更年期障害、神経症などが効能・効果として認められています。",
      "肌の状態だけでなく、月経に伴う不調やのぼせなども含めて確認し、医師が適応を判断します。"
    ],
    indicationNote: "乾燥肌や美白への直接的な効果を保証するものではありません。",
    productCautions: [
      "発疹、皮膚の赤み、食欲不振、胃の不快感、吐き気、下痢などがあらわれることがあります。",
      "まれに、間質性肺炎、肝機能障害・黄疸などの重大な副作用が生じることがあります。",
      "また、山梔子（サンシシ）を含むため、長期間の服用では腸間膜静脈硬化症という腸の血管に関わる疾患にも注意が必要です。",
      "服用中に咳、息苦しさ、発熱、繰り返す腹痛や下痢などが生じた場合は、服用を中止し、速やかに医師へ相談してください。"
    ],
    maker: null,
    supply: "unconfirmed",
    medicalReview: "approved",
  },
  {
    id: "bofutsushosan",
    assetKey: "kampoBofutsushosan",
    name: "防風通聖散",
    reading: "ぼうふうつうしょうさん",
    category: "BODY",
    theme: "便秘・肥満症などの身体の不調",
    overview: "便通や体重など、身体の状態についてのご相談で、医師が適否を検討する医療用漢方です。",
    officialIndications: [
      "お腹まわりに皮下脂肪が多く、便秘がちな方などに用いられる漢方薬です。",
      "医療用製剤では、肥満症、便秘、むくみ、高血圧に伴う動悸・肩こり・のぼせなどが効能・効果として認められています。",
      "便通や体重に関するお悩みがある場合に、体質や症状を確認したうえで医師が処方を検討します。"
    ],
    indicationNote: "便秘の改善が直接的にニキビや肌荒れの改善につながることを保証するものではありません。",
    productCautions: [
      "下痢、腹痛、吐き気、食欲不振、動悸、不眠、発汗、発疹などがあらわれることがあります。",
      "まれに、間質性肺炎、肝機能障害・黄疸、偽アルドステロン症、ミオパチー、腸間膜静脈硬化症などの重大な副作用が生じることがあります。",
      "麻黄（マオウ）や大黄（ダイオウ）などを含むため、高血圧、心疾患、甲状腺疾患、腎疾患がある方や、下痢をしやすい方は特に注意が必要です。",
      "妊娠中や妊娠の可能性がある方への使用は原則として避けることが望ましく、授乳中の方も必ず医師へお知らせください。"
    ],
    maker: null,
    supply: "unconfirmed",
    medicalReview: "approved",
  },
  {
    id: "kamishoyosan",
    assetKey: "kampoKamiShoyosan",
    name: "加味逍遙散",
    reading: "かみしょうようさん",
    category: "BALANCE",
    theme: "PMS（月経前症候群）に関連する不調・精神神経症状など",
    overview: "PMS（月経前症候群）など月経に伴う不調のご相談で、医師が適否を検討する医療用漢方です。",
    officialIndications: [
      "疲れやすく、肩こりや精神的な不安などがあり、月経に伴う不調や冷えなどが気になる方に用いられる漢方薬です。",
      "医療用製剤では、冷え症、虚弱体質、月経不順、月経困難、更年期障害、血の道症などが効能・効果として認められています。",
      "PMS（月経前症候群）に関連するお悩みがある場合も、具体的な症状や体質を医師が確認し、処方の適否を判断します。"
    ],
    indicationNote: "PMSのすべての症状や、肌荒れへの効果を保証するものではありません。",
    productCautions: [
      "発疹、皮膚の赤み、かゆみ、食欲不振、胃の不快感、吐き気、腹痛、下痢などがあらわれることがあります。",
      "まれに、偽アルドステロン症、ミオパチー、肝機能障害・黄疸、腸間膜静脈硬化症などの重大な副作用が生じることがあります。",
      "甘草や山梔子を含むため、ほかの漢方薬との併用や長期間の服用には注意が必要です。",
      "妊娠中または妊娠の可能性がある方への使用は原則として避けることが望ましいため、必ず医師へお知らせください。"
    ],
    maker: null,
    supply: "unconfirmed",
    medicalReview: "approved",
  },
  {
    id: "tokishakuyakusan",
    assetKey: "kampoTokiShakuyakusan",
    name: "当帰芍薬散",
    reading: "とうきしゃくやくさん",
    category: "BALANCE",
    theme: "冷え・むくみ・月経関連の不調など",
    overview: "冷えやむくみ、月経に関連する不調のご相談で、医師が適否を検討する医療用漢方です。",
    officialIndications: [
      "疲れやすく、腰や足が冷えやすい方などに用いられる漢方薬です。",
      "医療用製剤では、月経不順、月経困難、更年期障害、貧血、倦怠感など、さまざまな症状が効能・効果として認められています。",
      "冷えや月経に伴う不調、むくみなどが気になる場合に、医師が体質や症状を確認して処方を検討します。"
    ],
    indicationNote: "肌荒れやニキビに対する直接的な効果を保証するものではありません。",
    productCautions: [
      "発疹、かゆみ、食欲不振、胃の不快感、吐き気、嘔吐、腹痛、下痢などがあらわれることがあります。",
      "また、肝機能に関する検査値の異常が生じる場合があります。",
      "胃腸が弱い方では、服用によって胃の不快感などが生じることがあるため注意が必要です。",
      "妊娠中・授乳中の方、ほかのお薬を服用している方は、事前に医師へお知らせください。"
    ],
    maker: null,
    supply: "unconfirmed",
    medicalReview: "approved",
  },
  {
    id: "keishibukuryogankayokuinin",
    assetKey: "kampoKeishiBukuryoganKaYokuinin",
    name: "桂枝茯苓丸加薏苡仁",
    reading: "けいしぶくりょうがんかよくいにん",
    category: "BALANCE",
    theme: "月経関連症状やニキビなどの皮膚症状",
    overview:
      "桂枝茯苓丸に薏苡仁（よくいにん）を加えた処方です。桂枝茯苓丸とは別の医療用漢方として扱います。月経に関連する症状や肌の症状のご相談で、医師が適否を検討します。",
    officialIndications: [
      "比較的体力があり、のぼせや足の冷え、肩こり、下腹部の不調などが気になる方に用いられる漢方薬です。",
      "医療用製剤では、月経不順、血の道症、ニキビ、しみ、手足のあれなどが効能・効果として認められています。",
      "肌の悩みと月経に関連する症状などをあわせて確認し、医師が体質や症状に応じて処方を検討します。"
    ],
    indicationNote: "すべてのニキビやしみに効果があることを保証するものではありません。",
    productCautions: [
      "発疹、皮膚の赤み、かゆみ、胃の不快感、下痢などがあらわれることがあります。",
      "体力が著しく低下している方では、副作用があらわれやすくなる可能性があります。",
      "また、桃仁（トウニン）や牡丹皮（ボタンピ）を含むため、妊娠中または妊娠の可能性がある方への使用は原則として避けることが望ましいとされています。",
      "妊娠の可能性がある方や授乳中の方、ほかのお薬を服用している方は、必ず医師へお知らせください。"
    ],
    maker: null,
    supply: "unconfirmed",
    medicalReview: "approved",
  },
];

/** 全カード共通の注記 */
export const KAMPO_DOCTOR_NOTE = "医師判断で処方";

/** 効能・効果／製剤固有の注意事項が確認中のときの表示 */
export const KAMPO_PENDING_NOTE =
  "採用する製剤の添付文書に基づき、医師の確認後に掲載します。処方の際は、医師・薬剤師が効能・効果や注意事項をご説明します。";

export function findKampo(id: string) {
  return KAMPO.find((k) => k.id === id);
}

/**
 * 確定6剤に含まれず、メインの処方一覧から除外した漢方（旧ページのURLは維持し noindex）。
 * ※桂枝茯苓丸は「桂枝茯苓丸加薏苡仁」とは別の処方。
 */
export const ARCHIVED_KAMPO: { id: string; name: string; reading: string }[] = [
  { id: "seijobofuto", name: "清上防風湯", reading: "せいじょうぼうふうとう" },
  { id: "keigairengyoto", name: "荊芥連翹湯", reading: "けいがいれんぎょうとう" },
  { id: "keishibukuryogan", name: "桂枝茯苓丸", reading: "けいしぶくりょうがん" },
];

// ─────────────────────────────────────────────────────────────
// 診療コンセプト・医師の専門性
// ─────────────────────────────────────────────────────────────
export const CONCEPT = {
  title: "肌だけでなく、心と身体の状態にも目を向ける。",
  paragraphs: [
    "肌荒れやニキビの背景には、さまざまな要因が関係することがあります。",
    "VISTA Wellnessでは、肌の状態に加えて、PMS（月経前症候群）などの月経に伴う不調、冷え、便通、睡眠、ストレスなどについても確認します。",
  ],
  /** 医師の専門性に触れる一文（DOCTOR_PROFILE.publish が true のときのみ表示） */
  withSpecialty:
    "小林医師の精神科領域に関する専門性も活かしながら、医師が一人ひとりの状態に合わせて、医療用漢方による治療が適切かを判断します。",
  withoutSpecialty: "医師が一人ひとりの状態に合わせて、医療用漢方による治療が適切かを判断します。",
};

export const DOCTOR_PROFILE = {
  name: "小林医師",
  field: "精神科領域",
  /**
   * 医師名・専門性を公開してよいか。
   * TODO: BUSINESS_APPROVAL / MEDICAL_REVIEW — 正式な資格・診療体制・ご本人の掲載承認を確認後に true。
   * ※精神科領域の専門性であり、皮膚科専門医であるかのように表現しないこと。
   */
  publish: false,
};


/** 漢方薬一般の副作用の注意（一般論。製剤ごとの注意は確認中） */
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
