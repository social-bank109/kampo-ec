// サーバーコンポーネント（ビルド時に public/ の画像有無を確認）
import { resolveAsset } from "@/lib/assets";
import type { VistaAssetKey } from "@/config/vistaAssets";
import ImagePlaceholder from "./ImagePlaceholder";

/**
 * vistaAssets.ts の画像を <picture> で表示。未配備ならプレースホルダー。
 * 親要素でサイズ（高さ or aspect-ratio）を確保して CLS を防ぐこと。
 */
export default function VistaImage({
  assetKey,
  sizes = "100vw",
  priority = false,
  tone,
  decorative = false,
  mobileBreakpoint = 900,
}: {
  assetKey: VistaAssetKey;
  sizes?: string;
  priority?: boolean;
  tone?: "rose" | "sage";
  /** true の場合 alt="" （装飾画像） */
  decorative?: boolean;
  mobileBreakpoint?: number;
}) {
  const { asset, hasMain, hasMobile, available } = resolveAsset(assetKey);
  if (!available) return <ImagePlaceholder label={asset.label} tone={tone} />;

  const main = hasMain ? asset.src : asset.mobileSrc!;
  const a = asset as typeof asset & { mobileWidth?: number; mobileHeight?: number };
  return (
    <picture>
      {hasMain && hasMobile && (
        <source
          media={`(max-width: ${mobileBreakpoint}px)`}
          srcSet={asset.mobileSrc}
          width={a.mobileWidth}
          height={a.mobileHeight}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element -- 静的書き出し画像を <picture> で出し分けるため */}
      <img
        src={main}
        alt={decorative ? "" : asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </picture>
  );
}
