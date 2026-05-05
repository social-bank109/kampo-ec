import LegalPage, { PlaceholderNotice } from "@/components/LegalPage";

export const metadata = { title: "利用規約" };

export default function Page() {
  return (
    <LegalPage title="利用規約" kicker="Terms">
      <p>本ページは仮掲載です。サービス提供開始までに正式な利用規約を掲載します。</p>
      <p>
        VISTA Wellnessは、提携クリニックの医師によるオンライン診療および医療用漢方の継続処方を仲介するサービスです。
        利用者は、自由診療であること、医師の判断により処方されない場合があること、配送頻度が処方内容や服薬状況により異なることに同意のうえ、
        本サービスをご利用ください。
      </p>
      <PlaceholderNotice />
    </LegalPage>
  );
}
