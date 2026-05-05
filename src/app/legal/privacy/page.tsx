import LegalPage, { PlaceholderNotice } from "@/components/LegalPage";

export const metadata = { title: "プライバシーポリシー" };

export default function Page() {
  return (
    <LegalPage title="プライバシーポリシー" kicker="Privacy">
      <p>本ページは仮掲載です。サービス提供開始までに正式なプライバシーポリシーを掲載します。</p>
      <p>
        VISTA Wellnessは、利用者の個人情報および医療関連情報を、関連法令および提携クリニックの医療情報取扱規定に従って適切に管理します。
        収集した情報は、診療・処方・配送・本人確認・サポート対応・サービス改善のために必要な範囲で利用します。
      </p>
      <PlaceholderNotice />
    </LegalPage>
  );
}
