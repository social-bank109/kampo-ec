// 繊細な線画アイコン（ダークブラウンの細線、currentColor）
const base = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export type LineIconName =
  | "doctor"
  | "mirror"
  | "devices"
  | "form"
  | "video"
  | "judge"
  | "line"
  | "calendar"
  | "card"
  | "box"
  | "repeat";

export default function LineIcon({ name }: { name: LineIconName }) {
  switch (name) {
    case "doctor": // 女性医師（まとめ髪・白衣・聴診器）
      return (
        <svg {...base}>
          <circle cx="24" cy="15" r="6.5" />
          <path d="M17.6 14c.6-4.8 4-7.6 7.4-7.6 3.6 0 6.4 2.6 6.8 6.4" />
          <path d="M30.8 10.6c2.4.4 3.4 2.4 2.6 4.4" />
          <path d="M11 41c.6-8.6 6-13.4 13-13.4S36.4 32.4 37 41" />
          <path d="M20 28.4 24 35l4-6.6" />
          <path d="M18.6 29.4c-1.6 3.4-1.4 6.4.8 8.2" />
          <circle cx="20.4" cy="38.6" r="1.6" />
        </svg>
      );
    case "mirror": // 手鏡
      return (
        <svg {...base}>
          <ellipse cx="22" cy="18" rx="10" ry="11" />
          <ellipse cx="22" cy="18" rx="7" ry="8" />
          <path d="M26 26.8 33.6 40.4a2 2 0 0 1-3.4 2L22.8 29" />
          <path d="M19 13.6c1-1.4 2.4-2 3.8-2" />
          <path d="M36 9l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1z" />
        </svg>
      );
    case "devices": // PC とスマートフォン
      return (
        <svg {...base}>
          <rect x="6" y="10" width="28" height="19" rx="1.6" />
          <path d="M3 33h34l-2 3H5z" />
          <rect x="34" y="18" width="11" height="20" rx="2" />
          <path d="M38.4 34.6h2.2" />
          <circle cx="20" cy="19.4" r="3" />
          <path d="M14.4 27c1-2.6 3.2-4 5.6-4s4.6 1.4 5.6 4" />
        </svg>
      );
    case "form": // Web問診
      return (
        <svg {...base}>
          <rect x="11" y="7" width="26" height="34" rx="2" />
          <path d="M19 7V5h10v2" />
          <path d="M16.6 17.4l1.8 1.8 3.2-3.4M16.6 26.4l1.8 1.8 3.2-3.4" />
          <path d="M25 17.8h7M25 26.8h7M16.6 34.4h15.4" />
        </svg>
      );
    case "video": // ビデオ診察
      return (
        <svg {...base}>
          <rect x="5" y="11" width="28" height="22" rx="2" />
          <path d="M33 19l10-5v20l-10-5" />
          <circle cx="19" cy="20" r="4" />
          <path d="M12 31c1.4-3.6 4-5.4 7-5.4s5.6 1.8 7 5.4" />
        </svg>
      );
    case "judge": // 医師による判断（カルテ＋チェック）
      return (
        <svg {...base}>
          <path d="M14 6h16l7 7v29H14z" />
          <path d="M30 6v7h7" />
          <path d="M19 21h12M19 27h8" />
          <circle cx="33" cy="35" r="7" />
          <path d="M30 35l2.2 2.2 4-4.4" />
        </svg>
      );
    case "line": // LINE（吹き出し）
      return (
        <svg {...base}>
          <path d="M24 9c-9.4 0-17 6-17 13.4 0 6.6 6 12 14 13.2l-1 5.4 6.6-5.2C34.4 35 41 29.4 41 22.4 41 15 33.4 9 24 9z" />
          <path d="M16 19v7h4M23 19v7M27 26v-7l5 7v-7M36.6 19H33v7h3.6M33 22.6h3.2" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...base}>
          <rect x="7" y="10" width="34" height="31" rx="2" />
          <path d="M7 18h34M15 6v8M33 6v8" />
          <path d="M18.6 29.4l3.4 3.4 7.4-7.6" />
        </svg>
      );
    case "card": // オンライン決済
      return (
        <svg {...base}>
          <rect x="5" y="12" width="34" height="22" rx="2" />
          <path d="M5 18.6h34M10 27.6h8" />
          <circle cx="37" cy="33" r="7" />
          <path d="M34 33l2.2 2.2 4-4.4" />
        </svg>
      );
    case "box": // お届け
      return (
        <svg {...base}>
          <path d="M8 16l16-8 16 8v18l-16 8-16-8z" />
          <path d="M8 16l16 8 16-8M24 24v18M16 12l16 8" />
        </svg>
      );
    case "repeat": // 再診・継続
      return (
        <svg {...base}>
          <path d="M38 20a14 14 0 0 0-25.6-5.4M10 28a14 14 0 0 0 25.6 5.4" />
          <path d="M12 7.6v7h7M36 40.4v-7h-7" />
          <path d="M19.6 24l3.2 3.2 6-6.4" />
        </svg>
      );
  }
}
