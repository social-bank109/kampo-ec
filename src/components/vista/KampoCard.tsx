import Link from "next/link";
import { KAMPO_DOCTOR_NOTE, KAMPO_PLANNED_LABEL, type Kampo } from "@/config/vista";
import type { VistaAssetKey } from "@/config/vistaAssets";
import { resolveAsset } from "@/lib/assets";
import VistaImage from "./VistaImage";

/** 漢方の画像枠。写真が未配備なら「医薬品の実物と誤認させない」抽象的な包みのイラスト */
export function KampoArt({ k, sizes }: { k: Kampo; sizes: string }) {
  const key = k.assetKey as VistaAssetKey;
  const { available } = resolveAsset(key);
  const groupCls = k.group === "balance" ? "kampo-art--balance" : "";
  if (available) {
    return (
      <div className={`kampo-art kampo-art--photo ${groupCls}`}>
        <VistaImage assetKey={key} sizes={sizes} />
      </div>
    );
  }
  const half = 2; // 「清上／防風湯」のように先頭2文字で改行
  return (
    <div className={`kampo-art ${groupCls}`} aria-hidden="true">
      <div className="kampo-sachet">
        <small>MEDICAL KAMPO</small>
        <b>
          {k.name.slice(0, half)}
          <br />
          {k.name.slice(half)}
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
            {k.group === "skin" ? "SKIN" : "BALANCE"} {String(index + 1).padStart(2, "0")}
          </span>
          {k.makerNumber && <span>{k.makerNumber}</span>}
          {k.status === "planned" && <span className="badge badge--planned">{KAMPO_PLANNED_LABEL}</span>}
        </div>
        <h4>{k.name}</h4>
        <div className="kampo-kana">{k.reading}</div>
        <p>{k.summary}</p>
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
