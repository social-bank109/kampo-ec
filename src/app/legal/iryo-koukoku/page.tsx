import LegalPage, { PlaceholderNotice } from "@/components/LegalPage";

export const metadata = { title: "医療広告ガイドラインに基づく表示" };

export default function Page() {
  return (
    <LegalPage title="医療広告ガイドラインに基づく表示" kicker="Medical advertising">
      <p>
        本サービスは自由診療によるオンライン診療および医療用漢方の継続処方サービスです。
        以下は、厚生労働省「医業若しくは歯科医業又は病院若しくは診療所に関する広告等に関する指針（医療広告ガイドライン）」に基づく情報提供です。
      </p>
      <h3 style={{ marginTop: 18 }}>治療内容</h3>
      <p>オンライン診療による問診・診察、医師による処方判断、医療用漢方エキス製剤の継続処方、ご自宅への配送。</p>
      <h3 style={{ marginTop: 18 }}>標準的な費用</h3>
      <p>月額3,800円〜15,300円（税別）。プランにより異なります。</p>
      <h3 style={{ marginTop: 18 }}>主なリスク・副作用</h3>
      <p>
        発疹・かゆみ、胃部不快感・食欲不振、下痢、肝機能障害、間質性肺炎、偽アルドステロン症など。
        体質や併用薬によって症状が出ることがあります。
      </p>
      <h3 style={{ marginTop: 18 }}>未承認医薬品の取り扱い</h3>
      <p>本サービスでは、国内で承認されている医療用漢方エキス製剤のみを取り扱います。</p>
      <PlaceholderNotice />
    </LegalPage>
  );
}
