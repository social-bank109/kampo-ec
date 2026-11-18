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
};

export const VISTA_ASSETS = {
  hero: {
    src: `${VISTA_IMAGE_DIR}/hero-desktop.webp`,
    mobileSrc: `${VISTA_IMAGE_DIR}/hero-mobile.webp`,
    width: 1600,
    height: 1000,
    mobileWidth: 900,
    mobileHeight: 1100,
    alt: "自然な素肌の質感をイメージしたビジュアル",
    label: "HERO PHOTO — hero-desktop / hero-mobile",
  },
  approach: {
    src: `${VISTA_IMAGE_DIR}/approach-skin.webp`,
    width: 1200,
    height: 1400,
    alt: "肌と体調の両面に目を向けることをイメージしたビジュアル",
    label: "APPROACH — approach-skin",
  },
  doctor: {
    src: `${VISTA_IMAGE_DIR}/doctor-consultation.webp`,
    width: 1200,
    height: 800,
    alt: "オンライン診療のイメージ",
    label: "ONLINE CONSULTATION — doctor-consultation",
  },
  kampoSeijoBofuto: {
    src: `${VISTA_IMAGE_DIR}/kampo-seijo-bofuto.webp`,
    width: 800,
    height: 600,
    alt: "清上防風湯のイメージ",
    label: "清上防風湯",
  },
  kampoKeigaiRengyoto: {
    src: `${VISTA_IMAGE_DIR}/kampo-keigai-rengyoto.webp`,
    width: 800,
    height: 600,
    alt: "荊芥連翹湯のイメージ",
    label: "荊芥連翹湯",
  },
  kampoJumiHaidokuto: {
    src: `${VISTA_IMAGE_DIR}/kampo-jumi-haidokuto.webp`,
    width: 800,
    height: 600,
    alt: "十味敗毒湯のイメージ",
    label: "十味敗毒湯",
  },
  kampoKeishiBukuryogan: {
    src: `${VISTA_IMAGE_DIR}/kampo-keishi-bukuryogan.webp`,
    width: 800,
    height: 600,
    alt: "桂枝茯苓丸のイメージ",
    label: "桂枝茯苓丸",
  },
  kampoTokiShakuyakusan: {
    src: `${VISTA_IMAGE_DIR}/kampo-toki-shakuyakusan.webp`,
    width: 800,
    height: 600,
    alt: "当帰芍薬散のイメージ",
    label: "当帰芍薬散",
  },
  kampoKamiShoyosan: {
    src: `${VISTA_IMAGE_DIR}/kampo-kami-shoyosan.webp`,
    width: 800,
    height: 600,
    alt: "加味逍遙散のイメージ",
    label: "加味逍遙散",
  },
  og: {
    src: `${VISTA_IMAGE_DIR}/og-image.webp`,
    width: 1200,
    height: 630,
    alt: "VISTA Wellness",
    label: "OGP",
  },
} satisfies Record<string, VistaAsset>;

export type VistaAssetKey = keyof typeof VISTA_ASSETS;
