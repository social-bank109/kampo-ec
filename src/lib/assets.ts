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

export function resolveAsset(key: VistaAssetKey) {
  const a = VISTA_ASSETS[key] as (typeof VISTA_ASSETS)[VistaAssetKey] & { mobileSrc?: string };
  const held = "hold" in a && Boolean(a.hold);
  const hasMain = !held && publicFileExists(a.src);
  const hasMobile = !held && publicFileExists(a.mobileSrc);
  return { asset: a, hasMain, hasMobile, available: hasMain || hasMobile };
}
