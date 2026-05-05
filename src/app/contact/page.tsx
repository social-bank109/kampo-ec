import LegalPage, { PlaceholderNotice } from "@/components/LegalPage";

export const metadata = { title: "お問い合わせ" };

export default function Page() {
  return (
    <LegalPage title="お問い合わせ" kicker="Contact">
      <p>
        サービス内容、ご利用、料金プランについてのお問い合わせは、本ページの問い合わせフォーム（実装予定）または、
        記載のメールアドレスからご連絡ください。
      </p>
      <p>
        診療・処方・配送に関するお問い合わせは、提携クリニックの窓口でも受け付けています。
        ご利用中の方は、マイページ等の案内に従ってお問い合わせください。
      </p>
      <PlaceholderNotice />
    </LegalPage>
  );
}
