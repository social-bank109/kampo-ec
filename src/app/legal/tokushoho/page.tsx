import LegalPage, { PlaceholderNotice } from "@/components/LegalPage";

export const metadata = { title: "特定商取引法に基づく表記" };

export default function Page() {
  return (
    <LegalPage title="特定商取引法に基づく表記" kicker="Tokushoho">
      <dl style={{ display: "grid", gridTemplateColumns: "112px 1fr", rowGap: 8, columnGap: 12 }}>
        <dt>事業者名</dt>
        <dd>（仮）VISTA Wellness 運営事業者</dd>
        <dt>所在地</dt>
        <dd>請求があった場合に遅滞なく開示します。</dd>
        <dt>連絡先</dt>
        <dd>お問い合わせフォームよりご連絡ください。</dd>
        <dt>販売価格</dt>
        <dd>各料金プランページに記載（月額3,800円〜15,300円・税別）。</dd>
        <dt>支払方法</dt>
        <dd>クレジットカード等（実装時に確定）</dd>
        <dt>支払時期</dt>
        <dd>診療料および処方代は、診療確定後にご請求します。</dd>
        <dt>役務提供時期</dt>
        <dd>診療・処方確定後、原則として最短翌々日以降に発送します。</dd>
        <dt>返品・キャンセル</dt>
        <dd>医薬品の性質上、原則として返品・キャンセルはお受けできません。</dd>
      </dl>
      <PlaceholderNotice />
    </LegalPage>
  );
}
