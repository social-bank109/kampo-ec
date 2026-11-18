import Link from "next/link";
import { FLOW_STEPS, LINE_CTA_NOTE, PLAN, TAX_LABEL, yen } from "@/config/vista";
import SiteShell from "@/components/vista/SiteShell";
import PageHero from "@/components/vista/PageHero";
import LineCTA from "@/components/vista/LineCTA";
import SectionHeading from "@/components/vista/SectionHeading";
import VistaImage from "@/components/vista/VistaImage";
import DisclosureNotice from "@/components/vista/DisclosureNotice";

export const dynamic = "force-static";

export const metadata = {
  title: "医師への相談・受診の流れ",
  description:
    "肌悩みを、医師に相談するために。LINE追加から予約、Web問診、オンライン診療、処方判断、決済・配送、再診までの流れと、費用が発生するタイミングをご案内します。",
};

const MINI_FLOW = ["LINE追加", "予約日の調整", "Web問診", "オンライン診療", "必要時に処方", "決済・配送"];

const WORRIES = [
  {
    t: "LINE追加だけでは、何も確定しません",
    d: "友だち追加は、予約方法や診療の流れを確認するためのものです。予約・決済はその後の手続きで確定します。",
  },
  {
    t: "費用がかかるのは、診療のあとです",
    d: `LINE追加・予約の時点では費用は発生しません。処方がある場合は${PLAN.name}（月額${yen(PLAN.monthly)}・${TAX_LABEL}）、処方なしの場合は診察料${yen(PLAN.noPrescriptionFee)}（${TAX_LABEL}）です。`,
  },
  {
    t: "処方するかどうかは、医師が判断します",
    d: "症状・体調・既往歴・服薬状況を確認したうえで判断します。漢方が適さない場合や、皮膚科・対面診療が望ましい場合はその旨をご案内します。",
  },
];

export default function ConsultPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="CONSULTATION"
        crumbs={[{ label: "医師への相談" }]}
        title={
          <>
            肌悩みを、
            <br />
            医師に相談するために。
          </>
        }
        sub="VISTA Wellnessでは、提携医療機関の医師がオンライン診療で肌の症状と体調を確認し、必要に応じて医療用漢方を処方します。LINEはご予約・ご連絡のための窓口で、チャットだけで診断や処方を行うことはありません。"
      >
        <ol className="mini-flow" aria-label="受診までの流れ">
          {MINI_FLOW.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div className="cta-stack cta-stack--left" style={{ marginTop: 26 }}>
          <LineCTA position="consult" className="btn--wide" />
          <p className="small-note" style={{ margin: 0 }}>
            {LINE_CTA_NOTE}
          </p>
        </div>
      </PageHero>

      <section className="section--tight" aria-labelledby="worry-title" style={{ paddingTop: 64 }}>
        <div className="container">
          <SectionHeading id="worry-title" eyebrow="BEFORE YOU BOOK" title="予約の前に、よくある3つの不安" />
          <ul className="worry-grid">
            {WORRIES.map((w) => (
              <li className="worry" key={w.t}>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section--tight steps" aria-labelledby="flow-title">
        <div className="container">
          <div className="two-col">
            <div>
              <div className="eyebrow">HOW IT WORKS</div>
              <h2 className="section-title" id="flow-title">
                予約から再診までの流れ
              </h2>
              <p className="sub">
                配送は、医師の処方と決済が完了したあとです。初回は原則30日分を処方し、約1か月後の再診で効果や副作用、体調の変化を確認します。
              </p>
            </div>
            <div className="media" style={{ aspectRatio: "3 / 2" }}>
              <VistaImage assetKey="doctor" sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </div>
          <ol className="timeline">
            {FLOW_STEPS.map((s) => (
              <li key={s.n}>
                <div className="timeline__n">STEP {s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="cta-stack" style={{ marginTop: 36 }}>
            <LineCTA position="consult" className="btn--wide" />
            <p className="small-note" style={{ margin: 0 }}>
              {LINE_CTA_NOTE}
            </p>
          </div>
        </div>
      </section>

      <section className="section--tight" aria-labelledby="prepare-title">
        <div className="container container--narrow">
          <SectionHeading id="prepare-title" eyebrow="PREPARATION" title="診療の前にご準備いただくこと" />
          <div className="notice" style={{ marginTop: 24 }}>
            <ul>
              <li>現在の肌の状態（部位・期間・これまでの治療やスキンケア）</li>
              <li>月経周期と肌の状態の関係、冷え・便通・むくみなど気になる体調</li>
              <li>服用中のお薬・外用薬・サプリメント、既往歴、アレルギー</li>
              <li>妊娠中・妊娠の可能性・授乳中かどうか</li>
            </ul>
          </div>
          <p className="small-note" style={{ marginTop: 14 }}>
            悩みを先に整理したい方は{" "}
            <Link className="text-link" href="/check">
              肌荒れ・体調チェック
            </Link>
            をご利用ください（回答はどこにも送信されません）。
          </p>
          <div className="notice notice--olive" style={{ marginTop: 24 }}>
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
        <LineCTA position="consult" />
        <p className="small-note">{LINE_CTA_NOTE}</p>
      </section>

      <DisclosureNotice />
    </SiteShell>
  );
}
