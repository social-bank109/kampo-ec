import { PhotoIcon } from "./icons";

/** 画像未配備時の枠（背景色＋控えめな模様＋用途ラベル）。壊れた画像アイコンは出さない */
export default function ImagePlaceholder({
  label,
  tone = "rose",
  className = "",
  style,
}: {
  label: string;
  tone?: "rose" | "sage";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`ph ${tone === "sage" ? "ph--sage" : ""} ${className}`} style={style} aria-hidden="true">
      <span className="ph__label">
        <PhotoIcon />
        {label}
      </span>
    </div>
  );
}
