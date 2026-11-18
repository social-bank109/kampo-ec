import LegalPage from "@/components/LegalPage";
import HubspotForm from "@/components/HubspotForm";

export const metadata = { title: "お問い合わせ" };

export default function Page() {
  return (
    <LegalPage title="お問い合わせ" kicker="Contact">
      <p>
        サービス内容、ご利用、料金プランについてのお問い合わせは、本ページの問い合わせフォームからご連絡ください。
      </p>
      <p>診療・処方・配送に関するお問い合わせは、提携クリニックの窓口でも受け付けています。</p>
      <HubspotForm />
    </LegalPage>
  );
}
