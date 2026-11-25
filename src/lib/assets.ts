// サーバー（ビルド時）専用。クライアントコンポーネントから import しないこと。
import fs from "node:fs";
import path from "node:path";
import { VISTA_ASSETS, type VistaAssetKey } from "@/config/vistaAssets";

/**
 * public/ 配下に画像ファイルが存在するかをビルド時（静的生成時）に確認する。
 * 画像を追加して再デプロイすれば、コード変更なしで自動的に表示へ切り替わる。
 */
export function publicFileExists(publicPath: string | undefined): boolean {
  if (!publicPath) return false;
  try {
    return fs.statSync(path.join(process.cwd(), "public", publicPath)).isFile();
  } catch {
    return false;
  }
}

const EXTS = [".webp", ".jpg", ".jpeg", ".png"];

/**
 * 指定パスが無ければ、同じファイル名で拡張子だけ違うもの（.webp/.jpg/.jpeg/.png）を探す。
 * 見つかった public パスを返す（無ければ null）。
 */
export function findPublicFile(publicPath: string | undefined): string | null {
  if (!publicPath) return null;
  if (publicFileExists(publicPath)) return publicPath;
  const base = publicPath.replace(/\.[a-z0-9]+$/i, "");
  for (const ext of EXTS) if (publicFileExists(base + ext)) return base + ext;
  return null;
}

export function resolveAsset(key: VistaAssetKey): {
  asset: (typeof VISTA_ASSETS)[VistaAssetKey] & { mobileSrc?: string };
  hasMain: boolean;
  hasMobile: boolean;
  available: boolean;
} {
  const a = VISTA_ASSETS[key] as (typeof VISTA_ASSETS)[VistaAssetKey] & { mobileSrc?: string };
  const held = "hold" in a && Boolean(a.hold);
  const mainPath = held ? null : findPublicFile(a.src);
  const mobilePath = held ? null : findPublicFile(a.mobileSrc);
  const hasMain = Boolean(mainPath);
  const hasMobile = Boolean(mobilePath);
  const fb = "fallback" in a ? (a.fallback as VistaAssetKey | undefined) : undefined;
  if (!hasMain && !hasMobile && fb && fb !== key && fb in VISTA_ASSETS) {
    // 代替アセットを表示（alt は本来の用途のものを維持）
    const r = resolveAsset(fb);
    if (r.available) return { ...r, asset: { ...r.asset, alt: a.alt } };
  }
  return {
    asset: { ...a, src: mainPath ?? a.src, mobileSrc: mobilePath ?? a.mobileSrc },
    hasMain,
    hasMobile,
    available: hasMain || hasMobile,
  };
}
