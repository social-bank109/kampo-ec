import LegalPage from "@/components/LegalPage";
import { PLAN } from "@/config/vista";

export const metadata = { title: "特定商取引法に基づく表記" };

// TODO: LEGAL_REVIEW — 本文は既存表記を維持。プラン名の変更（お試しプラン→美容漢方プラン）、
// 所在地・電話番号の表示方法、契約・請求主体（提携医療機関／当社）の明記は docs/vista-legal-diff.md を参照。
export default function Page() {
  return (
    <LegalPage title="特定商取引法に基づく表記" kicker="Tokushoho" toc={false}>
      <dl className="legal-dl">
        <dt>事業者名</dt>
        <dd>株式会社Social Bank</dd>
        <dt>所在地</dt>
        <dd>請求があった場合に遅滞なく開示します。</dd>
        <dt>連絡先</dt>
        <dd>お問い合わせフォームよりご連絡ください。</dd>
        <dt>販売価格</dt>
        <dd>
          {PLAN.name}（利用規約上の名称：{PLAN.legacyName}） 月額6,980円（税込）（料金ページに記載）。医師の診察の結果、漢方薬を処方しない判断となった場合は診察料3,300円（税込）。
        </dd>
        <dt>支払方法</dt>
        <dd>クレジットカード等（実装時に確定）</dd>
        <dt>支払時期</dt>
        <dd>診療料および処方代は、診療確定後にご請求します。</dd>
        <dt>役務提供時期</dt>
        <dd>
          診療・処方確定後、原則として最短翌々日以降に発送します。初回は原則30日分、継続後は原則3か月ごとの診察・90日分のまとめ発送となります。
        </dd>
        <dt>返品・キャンセル</dt>
        <dd>医薬品の性質上、原則として返品・キャンセルはお受けできません。</dd>
      </dl>
    </LegalPage>
  );
}
