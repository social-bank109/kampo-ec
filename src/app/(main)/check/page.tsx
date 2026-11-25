import SiteShell from "@/components/vista/SiteShell";
import PageHero from "@/components/vista/PageHero";
import SkinCheck from "@/components/vista/SkinCheck";

export const metadata = {
  title: "肌荒れ・体調チェック",
  description:
    "8つのステップで、医師に相談したい肌悩みと体調を整理するセルフチェック。診断・処方の代わりではありません。回答は保存・送信されません。",
};

export default function CheckPage() {
  return (
    <SiteShell sticky={false}>
      <PageHero
        plain
        eyebrow="SKIN & BODY CHECK"
        crumbs={[{ label: "肌荒れ・体調チェック" }]}
        title="肌荒れ・体調チェック"
        sub="肌の悩みと、月経・冷え・便通などの体調を整理して、医師に相談しやすくするためのチェックです。"
      />
      <SkinCheck />
    </SiteShell>
  );
}
