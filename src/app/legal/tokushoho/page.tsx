import LegalPage from "@/components/LegalPage";

export const metadata = { title: "特定商取引法に基づく表記" };

export default function Page() {
  return (
    <LegalPage title="特定商取引法に基づく表記" kicker="Tokushoho">
      <dl style={{ display: "grid", gridTemplateColumns: "112px 1fr", rowGap: 8, columnGap: 12 }}>
        <dt>事業者名</dt>
        <dd>株式会社Social Bank</dd>
        <dt>所在地</dt>
        <dd>請求があった場合に遅滞なく開示します。</dd>
        <dt>連絡先</dt>
        <dd>お問い合わせフォームよりご連絡ください。</dd>
        <dt>販売価格</dt>
        <dd>各料金プランページに記載（月額6,980円〜19,800円・税込）。医師の診察の結果、漢方薬を処方しない判断となった場合は診察料3,300円（税込）。</dd>
        <dt>支払方法</dt>
        <dd>クレジットカード等（実装時に確定）</dd>
        <dt>支払時期</dt>
        <dd>診療料および処方代は、診療確定後にご請求します。</dd>
        <dt>役務提供時期</dt>
        <dd>診療・処方確定後、原則として最短翌々日以降に発送します。初回は原則30日分、継続後は原則3か月ごとの診察・90日分のまとめ発送となります。</dd>
        <dt>返品・キャンセル</dt>
        <dd>医薬品の性質上、原則として返品・キャンセルはお受けできません。</dd>
      </dl>
    </LegalPage>
  );
}
