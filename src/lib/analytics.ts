// ─────────────────────────────────────────────────────────────
// 計測ユーティリティ（GTM dataLayer への push のみ）
//
// ・個人情報・健康情報（チェックの回答、症状、病名等）は絶対に含めない。
// ・push に失敗しても例外を外へ出さない（LINE への遷移を妨げない）。
// ・イベント仕様：docs/vista-analytics-events.md
// ─────────────────────────────────────────────────────────────

export type LineCtaPosition =
  | "header"
  | "hero"
  | "sticky"
  | "formulation"
  | "pricing"
  | "flow"
  | "faq"
  | "final"
  | "footer"
  | "consult"
  | "check_result"
  | "detail"
  | "contact";

type DataLayerEvent = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const CAMPAIGN_KEY = "vista_campaign";

/** utm_campaign を英数・_・- のみ、最大64文字に制限した値にする（それ以外は破棄） */
function sanitizeCampaign(v: string | null | undefined): string | undefined {
  if (!v) return undefined;
  const t = v.trim().slice(0, 64);
  return /^[A-Za-z0-9_\-]+$/.test(t) ? t : undefined;
}

/**
 * 流入時の utm_campaign をセッション内で保持する（非センシティブな広告キャンペーン名のみ）。
 * 取得できない場合は "(none)"。
 */
export function getCampaign(): string {
  try {
    const fromUrl = sanitizeCampaign(new URLSearchParams(window.location.search).get("utm_campaign"));
    if (fromUrl) {
      window.sessionStorage.setItem(CAMPAIGN_KEY, fromUrl);
      return fromUrl;
    }
    return sanitizeCampaign(window.sessionStorage.getItem(CAMPAIGN_KEY)) ?? "(none)";
  } catch {
    return "(none)";
  }
}

export function pushEvent(event: string, params: DataLayerEvent = {}) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {
    /* 計測失敗は無視（遷移・操作を妨げない） */
  }
}

/** LINE CTA クリック。page_path にはクエリ・ハッシュを含めない */
export function trackLineClick(position: LineCtaPosition) {
  pushEvent("line_cta_click", {
    page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    cta_position: position,
    campaign: typeof window !== "undefined" ? getCampaign() : undefined,
  });
}
