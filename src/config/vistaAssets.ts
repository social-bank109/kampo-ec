// ─────────────────────────────────────────────────────────────
// VISTA Wellness 画像アセットマップ
//
// 画像は public/images/vista/ に、下記のファイル名で配置してください。
// ファイルが存在すればビルド時に自動で <picture> 表示に切り替わり、
// 存在しなければ用途ラベル付きのプレースホルダーを表示します（壊れた画像は出ません）。
// 詳細：docs/vista-image-assets.md
// ─────────────────────────────────────────────────────────────

export const VISTA_IMAGE_DIR = "/images/vista";

export type VistaAsset = {
  /** PC（または共通）画像のパス（public からの相対） */
  src: string;
  /** スマホ用の別画像（任意。無ければ src を使用） */
  mobileSrc?: string;
  /** 推奨サイズ（CLS 抑制のため aspect-ratio に使用） */
  width: number;
  height: number;
  mobileWidth?: number;
  mobileHeight?: number;
  alt: string;
  /** プレースホルダーに表示する用途ラベル */
  label: string;
  /** 表示方法（製品写真は contain で切らずに表示） */
  fit?: "cover" | "contain";
  /** 未配備時に代わりに表示する既存アセット（無ければプレースホルダー） */
  fallback?: string;
  /** 画像の背景色（製品写真の余白を枠になじませる） */
  bg?: string;
  /**
   * 掲載保留。ファイルがあってもプレースホルダーを表示する（権利・表記の確認待ち等）。
   * 理由を文字列で記載。解除する場合はこの行を削除。
   */
  hold?: string;
};

export const VISTA_ASSETS = {
  hero: {
    src: `${VISTA_IMAGE_DIR}/hero-desktop.webp`,
    mobileSrc: `${VISTA_IMAGE_DIR}/hero-mobile.webp`,
    width: 1586,
    height: 992,
    mobileWidth: 1134,
    mobileHeight: 1387,
    alt: "頬に手をあて、肌と体調に思いをめぐらせる女性のイラスト",
    label: "HERO PHOTO — hero-desktop / hero-mobile",
  },
  approach: {
    src: `${VISTA_IMAGE_DIR}/approach-skin.webp`,
    width: 1161,
    height: 1355,
    alt: "肌・月経・冷え・腸などの体調に目を向けることを表したイラスト",
    label: "APPROACH — approach-skin",
  },
  doctor: {
    src: `${VISTA_IMAGE_DIR}/doctor-consultation.webp`,
    width: 1536,
    height: 1024,
    alt: "自宅からパソコンでオンライン診療を受ける女性のイラスト",
    label: "ONLINE CONSULTATION — doctor-consultation",
  },
  flowHero: {
    // 「予約から再診までの流れ」ページのFV（女性が自宅でPCを利用するイラスト）
    // 未配備時は doctor-consultation.webp を表示（2026/11/19 配置済み）
    src: `${VISTA_IMAGE_DIR}/flow-hero.webp`,
    width: 1536,
    height: 1024,
    fallback: "doctor",
    alt: "自宅でパソコンを開き、オンライン診療の準備をする女性のイラスト",
    label: "FLOW HERO — flow-hero",
  },
  flowDelivery: {
    // STEP 6「漢方のお届け」（薬包・お届けのイラスト）
    src: `${VISTA_IMAGE_DIR}/flow-delivery.webp`,
    width: 1448,
    height: 1086,
    alt: "ご自宅に届いた漢方の薬包のイラスト",
    label: "DELIVERY — flow-delivery",
  },
  kampoSeijoBofuto: {
    // 漢方の画像はアップロード済みの public/images/kampo/ を使用
    src: "/images/kampo/seijo-bofuto.webp",
    width: 600,
    height: 386,
    fit: "contain",
    bg: "#ffffff",
    alt: "清上防風湯のイメージ",
    label: "清上防風湯",
  },
  kampoKeigaiRengyoto: {
    // 漢方の画像はアップロード済みの public/images/kampo/ を使用
    src: "/images/kampo/keigairengyoto.webp",
    width: 600,
    height: 386,
    fit: "contain",
    bg: "#ffffff",
    alt: "荊芥連翹湯のイメージ",
    label: "荊芥連翹湯",
  },
  kampoJumiHaidokuto: {
    // 漢方の画像はアップロード済みの public/images/kampo/ を使用
    src: "/images/kampo/jyumihaidokuto.webp",
    width: 600,
    height: 386,
    fit: "contain",
    bg: "#ffffff",
    alt: "十味敗毒湯のイメージ",
    label: "十味敗毒湯",
  },
  kampoUnseiin: {
    // 2026/11/25 追加（確定6剤）。画像配置済み
    src: "/images/kampo/unseiin.webp",
    width: 600,
    height: 386,
    fit: "contain",
    bg: "#ffffff",
    alt: "温清飲のイメージ",
    label: "温清飲 — kampo/unseiin",
  },
  kampoBofutsushosan: {
    // 2026/11/25 追加（確定6剤）。旧サイト用にアップロード済みの画像を使用
    src: "/images/kampo/bofutsushosan.jpg",
    width: 840,
    height: 840,
    fit: "contain",
    alt: "防風通聖散のイメージ",
    label: "防風通聖散 — kampo/bofutsushosan",
  },
  kampoKeishiBukuryoganKaYokuinin: {
    // 2026/11/25 追加（確定6剤）。画像配置済み（桂枝茯苓丸 keishibukuryogan とは別の画像）
    src: "/images/kampo/keishibukuryogankayokuinin.webp",
    width: 600,
    height: 386,
    fit: "contain",
    bg: "#ffffff",
    alt: "桂枝茯苓丸加薏苡仁のイメージ",
    label: "桂枝茯苓丸加薏苡仁 — kampo/keishibukuryogankayokuinin",
  },
  kampoKeishiBukuryogan: {
    // 漢方の画像はアップロード済みの public/images/kampo/ を使用
    src: "/images/kampo/keishibukuryogan.jpg",
    width: 840,
    height: 840,
    fit: "contain",
    alt: "桂枝茯苓丸のイメージ",
    label: "桂枝茯苓丸",
  },
  kampoTokiShakuyakusan: {
    // 漢方の画像はアップロード済みの public/images/kampo/ を使用
    src: "/images/kampo/tokishakuyakusan.jpg",
    width: 840,
    height: 840,
    fit: "contain",
    alt: "当帰芍薬散のイメージ",
    label: "当帰芍薬散",
  },
  kampoKamiShoyosan: {
    // 漢方の画像はアップロード済みの public/images/kampo/ を使用
    src: "/images/kampo/kamishoyosan.jpg",
    width: 840,
    height: 840,
    fit: "contain",
    alt: "加味逍遙散のイメージ",
    label: "加味逍遙散",
  },
  og: {
    // SNS（LINE等）の互換性のため OGP は JPEG（og-image.webp から 1200×630 で生成）
    src: `${VISTA_IMAGE_DIR}/og-image.jpg`,
    width: 1200,
    height: 630,
    alt: "VISTA Wellness",
    label: "OGP",
  },
} satisfies Record<string, VistaAsset>;

export type VistaAssetKey = keyof typeof VISTA_ASSETS;
