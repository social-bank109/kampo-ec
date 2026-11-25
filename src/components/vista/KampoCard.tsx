import Link from "next/link";
import { KAMPO_DOCTOR_NOTE, type Kampo } from "@/config/vista";
import { VISTA_ASSETS, type VistaAssetKey } from "@/config/vistaAssets";
import { resolveAsset } from "@/lib/assets";
import VistaImage from "./VistaImage";

/** 漢方の画像枠。写真が未配備なら「医薬品の実物と誤認させない」抽象的な包みのイラスト */
export function KampoArt({ k, sizes }: { k: Kampo; sizes: string }) {
  const key = k.assetKey as VistaAssetKey;
  const { available } = resolveAsset(key);
  const groupCls = k.category === "SKIN" ? "" : "kampo-art--balance";
  if (available) {
    return (
      <div
        className={`kampo-art kampo-art--photo ${groupCls}`}
        style={{ background: (VISTA_ASSETS[key] as { bg?: string }).bg }}
      >
        <VistaImage assetKey={key} sizes={sizes} />
      </div>
    );
  }
  // 「清上／防風湯」「桂枝／茯苓丸／加薏苡仁」のように区切って表示
  const lines = k.name.length <= 5 ? [k.name.slice(0, 2), k.name.slice(2)] : [k.name.slice(0, 2), k.name.slice(2, 5), k.name.slice(5)];
  return (
    <div className={`kampo-art ${groupCls}`} aria-hidden="true">
      <div className={`kampo-sachet ${lines.length > 2 ? "kampo-sachet--long" : ""}`}>
        <small>MEDICAL KAMPO</small>
        <b>
          {lines.map((l, i) => (
            <span key={i} style={{ display: "block" }}>
              {l}
            </span>
          ))}
        </b>
        <em>イメージ</em>
      </div>
    </div>
  );
}

/** 漢方カード（選んで注文する UI にはしない） */
export default function KampoCard({ k, index }: { k: Kampo; index: number }) {
  return (
    <article className="kampo-card">
      <KampoArt k={k} sizes="(max-width: 420px) 110px, (max-width: 1024px) 50vw, 380px" />
      <div className="kampo-body">
        <div className="kampo-meta">
          <span>
            {String(index + 1).padStart(2, "0")} / {k.category}
          </span>
        </div>
        <h4>{k.name}</h4>
        <div className="kampo-kana">{k.reading}</div>
        <p>
          <span className="kampo-theme-label">主な紹介テーマ</span>
          {k.theme}
        </p>
        <div className="kampo-foot">
          <span className="badge">{KAMPO_DOCTOR_NOTE}</span>
          <Link className="kampo-more" href={`/products/${k.id}`} aria-label={`${k.name}について詳しく見る`}>
            詳しく見る →
          </Link>
        </div>
      </div>
    </article>
  );
}
