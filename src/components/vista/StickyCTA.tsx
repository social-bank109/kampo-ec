import { PLAN, TAX_LABEL } from "@/config/vista";
import LineCTA from "./LineCTA";

/** スマホ下部固定の LINE CTA（900px 以下でのみ表示。safe-area 対応） */
export default function StickyCTA() {
  return (
    <div className="sticky-cta">
      <div className="sticky-cta__price" aria-hidden="true">
        <b>¥{PLAN.monthly.toLocaleString("ja-JP")}</b>
        <span>/月（{TAX_LABEL}）</span>
      </div>
      <LineCTA position="sticky" />
    </div>
  );
}
