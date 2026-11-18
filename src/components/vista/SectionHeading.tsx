export default function SectionHeading({
  eyebrow,
  title,
  sub,
  as: Tag = "h2",
  center = true,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  as?: "h1" | "h2";
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={center ? "center" : undefined}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <Tag className="section-title" id={id}>
        {title}
      </Tag>
      {sub && <p className="sub">{sub}</p>}
    </div>
  );
}
