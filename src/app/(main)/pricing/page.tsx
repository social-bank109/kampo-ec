import Link from "next/link";
import { FEE_ROWS, LINE_CTA_NOTE, PLAN, TAX_LABEL, yen } from "@/config/vista";
import SiteShell from "@/components/vista/SiteShell";
import PageHero from "@/components/vista/PageHero";
import LineCTA from "@/components/vista/LineCTA";
import SectionHeading from "@/components/vista/SectionHeading";
import DisclosureNotice from "@/components/vista/DisclosureNotice";

export const dynamic = "force-static";

export const metadata = {
  title: "料金",
  description: `${PLAN.name} 月額${yen(PLAN.monthly)}（${TAX_LABEL}）。オンライン診療・医療用漢方1剤・配送を含む、ひとつのプランです。自由診療。`,
};

export default function PricingPage() {
  const price = PLAN.monthly.toLocaleString("ja-JP");
  return (
    <SiteShell>
      <PageHero
        eyebrow="PRICING"
        title="料金"
        crumbs={[{ label: "料金" }]}
        sub="VISTA Wellnessの料金は、美容漢方プランひとつだけ。プランを選ぶ必要はありません。処方の有無・内容は、診療のうえ医師が判断します。"
      />

      <section className="section--tight" style={{ paddingTop: 56 }}>
        <div className="container center">
          <div className="price-card" style={{ marginTop: 0 }}>
            <div className="price-card__label">{PLAN.name}</div>
            <div className="price-card__amount">
              <sup>¥</sup>
              {price}
              <small>/ 月（{TAX_LABEL}）</small>
            </div>
            <div className="price-card__rule" />
            <ul className="check-list">
              {PLAN.includes.map((t) => (
                <li key={t}>{t}</li>
              ))}
              <li>初回は原則30日分、継続時は原則90日分をまとめてお届け</li>
            </ul>
            <LineCTA position="pricing" />
            <p className="small-note">{LINE_CTA_NOTE}</p>
            <div className="price-first">
              <b>はじめてのお支払い（初回総額）</b>
              <br />
              処方ありの場合：{yen(PLAN.monthly)}（{TAX_LABEL}）
              <br />
              処方なしの場合：診察料{yen(PLAN.noPrescriptionFee)}（{TAX_LABEL}）
              <br />
              <span className="small-note">
                LINEの友だち追加・予約の時点では費用は発生しません。お支払いは診療後です。
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section--tight" aria-labelledby="fee-title">
        <div className="container container--narrow">
          <SectionHeading id="fee-title" eyebrow="DETAILS" title="料金と条件の詳細" />
          <table className="fee-table" style={{ marginTop: 28 }}>
            <tbody>
              {FEE_ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>
                    {r.value}
                    {r.note && <small>{r.note}</small>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="small-note" style={{ marginTop: 18, paddingLeft: "1.2em" }}>
            <li>自由診療のため、公的医療保険は適用されません。</li>
            <li>
              料金は1剤・医師の処方日数を前提とした目安です。処方内容は医師が判断し、ご希望の漢方が必ず処方されるものではありません。
            </li>
            <li>
              実際の決済は、提携医療機関または運営会社が案内する単位（1か月ごと・3か月ごと等）で行われる場合があります。決済前にLINE等で金額をご案内します。
            </li>
            <li>症状や安全性の観点から、他の医療機関への受診をご案内する場合があります。</li>
          </ul>
          <div className="notice" style={{ marginTop: 24 }}>
            <strong>既にご利用中の方へ</strong>
            <p>
              これまでにお申し込みいただいた方の料金・条件は、ご契約時にご案内した内容が適用されます。ご不明点はLINEまたは
              <Link className="text-link" href="/contact">
                お問い合わせ
              </Link>
              からご確認ください。
            </p>
          </div>
          <p className="small-note" style={{ marginTop: 20 }}>
            詳細は
            <Link className="text-link" href="/legal/terms">
              利用規約
            </Link>
            ・
            <Link className="text-link" href="/legal/tokushoho">
              特定商取引法に基づく表記
            </Link>
            ・
            <Link className="text-link" href="/about/jiyu-shinryo">
              自由診療について
            </Link>
            ・
            <Link className="text-link" href="/legal/iryo-koukoku">
              医療広告ガイドラインに基づく表示
            </Link>
            をご確認ください。
          </p>
        </div>
      </section>

      <section className="end-cta">
        <div className="eyebrow">NEXT STEP</div>
        <h2 className="section-title">まずは、医師に相談するところから。</h2>
        <p className="sub">LINEで予約日を調整し、オンラインで診療を受けられます。</p>
        <LineCTA position="pricing" />
        <p className="small-note">{LINE_CTA_NOTE}</p>
      </section>

      <DisclosureNotice />
    </SiteShell>
  );
}
