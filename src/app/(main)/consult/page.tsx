import Link from "next/link";
import { CONSULT_SETUP, MAKEUP_TEXT, FAQ_FLOW_ITEMS, FLOW_STEPS, LINE_CTA_NOTE, PLAN, TAX_LABEL, yen } from "@/config/vista";
import SiteShell from "@/components/vista/SiteShell";
import LineCTA from "@/components/vista/LineCTA";
import SectionHeading from "@/components/vista/SectionHeading";
import VistaImage from "@/components/vista/VistaImage";
import FAQAccordion from "@/components/vista/FAQAccordion";
import DisclosureNotice from "@/components/vista/DisclosureNotice";
import PageEvent from "@/components/vista/PageEvent";
import LineIcon from "@/components/vista/lineIcons";
import { ConversationExample } from "@/components/vista/sections/ConsultConversation";

export const dynamic = "force-static";

export const metadata = {
  title: "予約から再診までの流れ",
  description:
    "はじめてのオンライン診療でも大丈夫。LINEでの予約からWeb問診、医師のオンライン診療、オンライン決済、漢方のお届け、再診までの流れをご紹介します。",
};

const QUESTIONNAIRE = [
  "肌荒れが始まった時期",
  "肌荒れの部位や状態",
  "月経周期との関係",
  "冷え・むくみ・便通",
  "現在使用している薬",
  "既往歴・アレルギー",
  "妊娠・授乳の有無",
];

const DAY_FLOW = [
  "ビデオ通話に参加",
  "医師から肌悩みについて質問",
  "月経・冷え・便通などの体調を確認",
  "既往歴・服薬状況を確認",
  "医師が治療方針・処方の可否を説明",
];

// TODO: BUSINESS_APPROVAL — メイク・ビデオ通話の運用は提携医療機関の運用と照合すること
const RELIEF = [
  "事前問診があるので、相談内容を整理してから受診できる",
  "メイクをしたままでも受診できる（可能であれば診察前のメイク落としがおすすめ）",
  "通常のビデオ通話から診察を開始できる",
  "必要な肌の確認方法は医師が説明する",
  "対面診療が必要な場合は案内する",
];

const FOLLOWUP = ["肌症状の変化", "服薬状況", "副作用の有無", "体調・月経などの変化", "処方継続・変更の必要性"];

function StepHead({ index, children }: { index: number; children: React.ReactNode }) {
  const s = FLOW_STEPS[index];
  return (
    <div className="flow-step__head">
      <div className="icon-badge icon-badge--rose">
        <LineIcon name={s.icon} />
      </div>
      <div>
        <div className="flow-step__n">
          STEP {index + 1}｜{s.title}
        </div>
        <h2 className="flow-step__title">{children}</h2>
      </div>
    </div>
  );
}

export default function FlowPage() {
  const step4Title = CONSULT_SETUP.femaleDoctorGuaranteed
    ? "女性医師と、肌や体調についてお話しします"
    : "医師と、肌や体調についてお話しします";

  return (
    <SiteShell>
      <PageEvent event="flow_page_view" />

      {/* FV */}
      <section className="page-hero flow-hero" aria-labelledby="flow-hero-title">
        <div className="container">
          <nav aria-label="パンくずリスト">
            <ol className="breadcrumb">
              <li>
                <Link href="/">ホーム</Link>
              </li>
              <li>
                <span aria-hidden="true">/ </span>
                <span aria-current="page">予約から再診までの流れ</span>
              </li>
            </ol>
          </nav>
          <div className="two-col">
            <div>
              <div className="eyebrow">HOW IT WORKS</div>
              <h1 id="flow-hero-title">
                予約から再診まで、
                <br />
                ひとつずつご案内します。
              </h1>
              <p className="sub">
                はじめてのオンライン診療でも大丈夫。LINEでの予約から女性医師の診察、お薬のお届け、再診までの流れをご紹介します。
              </p>
              <div className="cta-stack cta-stack--left" style={{ marginTop: 24 }}>
                <LineCTA position="flow_hero" className="btn--wide" />
                <p className="small-note" style={{ margin: 0 }}>
                  {LINE_CTA_NOTE}
                </p>
              </div>
            </div>
            <div className="media flow-hero__art">
              <VistaImage assetKey="flowHero" priority sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* 全体フロー */}
      <section className="section--tight flow-overview-wrap" aria-labelledby="overview-title">
        <div className="container">
          <h2 id="overview-title" className="visually-hidden">
            全体の流れ
          </h2>
          <ol className="flow-overview">
            {FLOW_STEPS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span className="flow-overview__n">{s.n}</span>
                  <span className="icon-badge icon-badge--small">
                    <LineIcon name={s.icon} />
                  </span>
                  <span className="flow-overview__title">{s.title}</span>
                  <span className="flow-overview__short">{s.short}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="container container--narrow flow-steps">
        {/* STEP 1 */}
        <section className="flow-step" id="step-line">
          <StepHead index={0}>まずはLINEから</StepHead>
          <p>VISTA Wellness公式LINEを友だち追加し、診療予約の案内に進みます。</p>
          <p className="flow-step__note">LINEを追加しただけでは、診療予約や決済は確定しません。</p>
          <div className="cta-stack cta-stack--left" style={{ marginTop: 18 }}>
            <LineCTA position="flow_step1" />
          </div>
        </section>

        {/* STEP 2 */}
        <section className="flow-step" id="step-booking">
          <StepHead index={1}>ご希望の診療日時をお知らせください</StepHead>
          <p>LINEから案内される予約フォームで診療希望日を申請します。日程調整後、予約が確定します。</p>
          <p className="flow-step__note">
            フォームの送信は「希望日の申請」です。送信した時点では予約は確定しません。
          </p>
        </section>

        {/* STEP 3 */}
        <section className="flow-step" id="step-questionnaire">
          <StepHead index={2}>事前に肌や体調について教えてください</StepHead>
          <p>
            肌荒れの状態、月経との関係、冷え・便通などの体調、これまでの治療や服薬状況について、Web問診に回答します。
          </p>
          <h3 className="flow-step__sub">問診で確認する主な内容</h3>
          <ul className="chip-grid">
            {QUESTIONNAIRE.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>

        {/* STEP 4 */}
        <section className="flow-step flow-step--feature" id="step-consultation">
          <StepHead index={3}>{step4Title}</StepHead>
          <div className="two-col flow-step__media-row">
            <div>
              <div className="media" style={{ aspectRatio: "3 / 2" }}>
                <VistaImage assetKey="doctor" sizes="(max-width: 900px) 100vw, 400px" />
              </div>
              <p className="image-caption">※イラストはイメージです。</p>
            </div>
            <div>
              <p>予約した日時に、スマートフォンやパソコンからオンライン診療に参加します。</p>
              <p>事前のWeb問診をもとに、女性医師が症状の経過や体調について確認します。</p>
              <p>肌の状態についても必要に応じて画面越しに確認し、医師が適切な診療・治療方針を判断します。</p>
            </div>
          </div>

          <h3 className="flow-step__sub">診察当日の流れ</h3>
          <ol className="day-list">
            {DAY_FLOW.map((d, i) => (
              <li key={d}>
                <span className="day-list__n" aria-hidden="true">
                  {["①", "②", "③", "④", "⑤"][i]}
                </span>
                {d}
              </li>
            ))}
          </ol>

          <h3 className="flow-step__sub">診察での会話の例</h3>
          <ConversationExample />

          <h3 className="flow-step__sub">安心ポイント</h3>
          <ul className="check-list check-list--left">
            {RELIEF.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          <p className="flow-step__note">
            {MAKEUP_TEXT}肌の状態によっては、医師がカメラの角度や距離の調整をお願いすることがあります。
          </p>

          <div className="notice" style={{ marginTop: 20 }}>
            <strong>医師の診療について</strong>
            <p>
              オンライン診療では触診や検査ができないため、医師が得られる情報には限りがあります。オンラインで適切な診療ができない場合は、対面診療をご案内します。
            </p>
          </div>
          <div className="cta-stack" style={{ marginTop: 26 }}>
            <LineCTA position="flow_step4" className="btn--wide" />
            <p className="small-note" style={{ margin: 0 }}>
              {LINE_CTA_NOTE}
            </p>
          </div>
        </section>

        {/* STEP 5 */}
        <section className="flow-step" id="step-payment">
          <StepHead index={4}>診療後、オンラインでお支払い</StepHead>
          <p>診療・処方内容と料金をご確認いただいたうえで、案内に従ってオンライン決済を行います。</p>
          <div className="price-first" style={{ margin: "16px 0 0", maxWidth: "none" }}>
            処方ありの場合：{PLAN.name} 月額{yen(PLAN.monthly)}（{TAX_LABEL}）
            <br />
            処方なしの場合：診察料{yen(PLAN.noPrescriptionFee)}（{TAX_LABEL}）
            <br />
            <span className="small-note">LINEの友だち追加・予約の時点では費用は発生しません。</span>
          </div>
          <p className="flow-step__note">
            お支払い方法や配送料などの詳細は、
            <Link className="text-link" href="/pricing">
              料金ページ
            </Link>
            ・
            <Link className="text-link" href="/legal/tokushoho">
              特定商取引法に基づく表記
            </Link>
            をご確認ください。
          </p>
        </section>

        {/* STEP 6 */}
        <section className="flow-step" id="step-delivery">
          <StepHead index={5}>処方された漢方をご自宅へ</StepHead>
          <div className="two-col flow-step__media-row">
            <div className="media" style={{ aspectRatio: "4 / 3" }}>
              <VistaImage assetKey="flowDelivery" sizes="(max-width: 900px) 100vw, 400px" />
            </div>
            <div>
              <p>医師が処方した医療用漢方を、ご指定の住所へお届けします。初回は原則30日分です。</p>
              <p className="flow-step__note">処方内容や配送時期は診療・決済状況等によって異なります。</p>
            </div>
          </div>
        </section>

        {/* STEP 7 */}
        <section className="flow-step" id="step-followup">
          <StepHead index={6}>その後も、医師が状態を確認します</StepHead>
          <p>
            初回の処方後も、症状の変化や副作用の有無などを確認します。再診で医師が継続の可否や処方内容を判断し、状態が安定している場合には、まとめ処方・配送に対応することがあります。
          </p>
          <div className="followup-plan">
            <div>
              <b>初回</b>
              <span>原則30日分を処方</span>
            </div>
            <div>
              <b>約1か月後</b>
              <span>再診で経過・副作用を確認</span>
            </div>
            <div>
              <b>継続時</b>
              <span>原則3か月ごとに診察・90日分をお届け</span>
            </div>
          </div>
          <h3 className="flow-step__sub">再診で確認する内容</h3>
          <ul className="chip-grid">
            {FOLLOWUP.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="flow-step__note">
            漢方は処方したら終わりではありません。再診を通じて、安全に続けられるか、いまの処方が適切かを医師が確認します。
          </p>
        </section>
      </div>

      {/* FAQ */}
      <section className="section faq" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="オンライン診療のよくあるご質問" />
          <FAQAccordion items={FAQ_FLOW_ITEMS} />
          <div className="notice notice--olive" style={{ maxWidth: 820, margin: "28px auto 0" }}>
            <strong>LINEを利用できない場合</strong>
            <p>
              <Link className="text-link" href="/contact">
                お問い合わせフォーム
              </Link>
              からご連絡ください。なお、お問い合わせフォームでは診療・処方に関する医学的なご相談や、緊急の症状には対応できません。
            </p>
          </div>
        </div>
      </section>

      <section className="end-cta">
        <div className="eyebrow">START WITH A CONSULTATION</div>
        <h2 className="section-title">肌悩みを、医師に相談する第一歩。</h2>
        <p className="sub">まずはLINEから、診療予約へ。</p>
        <LineCTA position="flow_final" />
        <p className="small-note">{LINE_CTA_NOTE}</p>
      </section>

      <DisclosureNotice />
    </SiteShell>
  );
}
