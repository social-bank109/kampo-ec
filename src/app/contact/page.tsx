import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import HubspotForm from "@/components/HubspotForm";
import LineCTA from "@/components/vista/LineCTA";

export const metadata = { title: "お問い合わせ" };

export default function Page() {
  return (
    <LegalPage title="お問い合わせ" kicker="Contact" toc={false}>
      <div className="contact-grid">
        <section className="contact-box">
          <h2>このフォームで受け付けるもの</h2>
          予約方法・配送・料金・サービス全般に関するお問い合わせ
        </section>
        <section className="contact-box">
          <h2>受け付けていないもの</h2>
          診療・処方に関する医学的なご相談、緊急の症状。医学的なご相談は、オンライン診療で医師にご相談ください。
        </section>
      </div>
      <div className="notice" style={{ marginBottom: 24 }}>
        <strong>緊急の症状について</strong>
        <p>
          急激な悪化、強い痛みや腫れ、発熱などの症状がある場合は、お問い合わせフォームではなく、お近くの医療機関を受診してください。
        </p>
      </div>
      <p>
        サービス内容、ご利用、料金プランについてのお問い合わせは、本ページの問い合わせフォームからご連絡ください。
      </p>
      <p>診療・処方・配送に関するお問い合わせは、提携クリニックの窓口でも受け付けています。</p>
      <p className="small-note">
        お問い合わせ内容に、病歴・症状の詳細や写真を記載する必要はありません。個人情報の取扱いは
        <Link href="/legal/privacy">プライバシーポリシー</Link>をご確認ください。
      </p>
      <div className="form-shell">
        <HubspotForm />
      </div>
      <div className="cta-stack" style={{ marginTop: 36 }}>
        <p className="small-note" style={{ margin: 0 }}>
          診療のご予約はLINEから
        </p>
        <LineCTA position="contact" variant="outline" />
      </div>
    </LegalPage>
  );
}
