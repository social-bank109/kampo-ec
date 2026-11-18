import Link from "next/link";
import {
  DISCLOSURE,
  FAQ_ITEMS,
  FLOW_SHORT,
  KAMPO,
  KAMPO_GROUPS,
  KAMPO_SAFETY_NOTE,
  LINE_CTA_NOTE,
  PLAN,
  TAX_LABEL,
  yen,
} from "@/config/vista";
import SiteShell from "@/components/vista/SiteShell";
import LineCTA from "@/components/vista/LineCTA";
import VistaImage from "@/components/vista/VistaImage";
import SectionHeading from "@/components/vista/SectionHeading";
import KampoCard from "@/components/vista/KampoCard";
import FAQAccordion from "@/components/vista/FAQAccordion";
import DisclosureNotice from "@/components/vista/DisclosureNotice";

export const dynamic = "force-static";

const CONCERNS = [
  { n: "01 / CHIN", t: ["顎まわりや口元に、", "ニキビができやすい。"] },
  { n: "02 / PERIOD", t: ["生理前になると、", "毎月のように肌が荒れる。"] },
  { n: "03 / REPEAT", t: ["治ったと思っても、", "同じ場所にまたできる。"] },
  { n: "04 / BALANCE", t: ["肌だけでなく、冷えや", "便通の悩みも気になる。"] },
];

const BENEFITS = [
  {
    t: "医師による診療",
    d: "提携医療機関の医師が、肌の症状と体調をオンラインで確認。漢方が適するかどうかも含めて判断します。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M8 21h8m-4-3v3M9 10h6m-3-3v6" />
      </svg>
    ),
  },
  {
    t: "医学的判断に基づく医療用漢方",
    d: "症状・体質・既往歴・服薬状況を踏まえ、医師が必要と判断した場合に医療用漢方の処方を検討します。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M7 17c0-8 3-12 11-13-1 8-5 12-11 13Zm0 0-3 3" />
      </svg>
    ),
  },
  {
    t: "ご自宅へ配送・継続フォロー",
    d: "処方・決済のあと、ご自宅へお届け。約1か月後の再診で、経過や副作用の有無を医師が確認します。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M3 7h18v12H3zM3 7l9 6 9-6M8 4h8" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const price = PLAN.monthly.toLocaleString("ja-JP");
  return (
    <SiteShell>
      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__photo">
          <VistaImage assetKey="hero" priority sizes="(max-width: 900px) 100vw, 57vw" />
        </div>
        <div className="hero__content">
          <div className="hero__kicker">MEDICAL KAMPO FOR SKIN</div>
          <h1 id="hero-title">
            その肌荒れ、
            <br />
            また繰り返して
            <br />
            いませんか。
          </h1>
          <p className="hero__desc">
            繰り返す大人ニキビ・生理前の肌荒れに。
            <br />
            肌だけでなく、月経や冷え・便通なども確認する、医師による美容漢方オンライン診療。
          </p>
          <p className="hero__price">
            {PLAN.name} 月額<b>¥{price}</b>（{TAX_LABEL}）
          </p>
          <div className="cta-stack cta-stack--left">
            <LineCTA position="hero" />
            <p className="small-note" style={{ margin: 0 }}>
              {LINE_CTA_NOTE}
              <br />
              処方なしの場合は診察料{yen(PLAN.noPrescriptionFee)}（{TAX_LABEL}）。自由診療です。
            </p>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <div className="trust">
        <ul className="trust__inner">
          <li className="trust__item">
            <i aria-hidden="true">✧</i>医師が診療のうえ判断
          </li>
          <li className="trust__item">
            <i aria-hidden="true">✧</i>必要時に医療用漢方
          </li>
          <li className="trust__item">
            <i aria-hidden="true">✧</i>自宅からオンライン受診
          </li>
        </ul>
      </div>

      {/* CONCERNS */}
      <section className="section concerns" aria-labelledby="concerns-title">
        <div className="container">
          <SectionHeading
            id="concerns-title"
            eyebrow="DOES THIS SOUND FAMILIAR?"
            title={
              <>
                こんな肌悩み、
                <br />
                ありませんか？
              </>
            }
            sub={
              <>
                スキンケアは頑張っている。
                <br />
                それでも、肌が思うように安定しない。
              </>
            }
          />
          <div className="concerns-grid">
            {CONCERNS.map((c) => (
              <article className="concern" key={c.n}>
                <div className="concern__n">{c.n}</div>
                <p>
                  {c.t[0]}
                  <br />
                  {c.t[1]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="bridge">
        <div className="eyebrow">A DIFFERENT PERSPECTIVE</div>
        <p>
          肌だけを、見つめすぎない。
          <br />
          からだの調子にも、目を向けてみる。
        </p>
      </div>

      {/* APPROACH */}
      <section className="approach" id="concept" aria-labelledby="approach-title">
        <div className="approach__art">
          <VistaImage assetKey="approach" tone="sage" sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="approach__body">
          <div className="eyebrow">OUR APPROACH</div>
          <h2 className="section-title" id="approach-title">
            肌だけでなく、
            <br />
            体調にも目を向ける。
          </h2>
          <p className="sub">
            ニキビや肌荒れの背景は、人によって異なります。VISTA
            Wellnessでは、肌の症状に加えて月経・冷え・便通・服薬状況なども問診で確認し、医師が漢方治療の適否を判断します。
          </p>
          <ol className="approach__steps">
            <li>
              <strong>01</strong>
              <span>繰り返す肌の症状と、これまでの治療歴を確認</span>
            </li>
            <li>
              <strong>02</strong>
              <span>月経周期・冷え・便通など、あわせて気になる不調も確認</span>
            </li>
            <li>
              <strong>03</strong>
              <span>診療のうえ、必要に応じて医療用漢方を検討</span>
            </li>
          </ol>
          <p className="approach__note">{DISCLOSURE.standardCare}必要に応じて皮膚科・対面診療をご案内します。</p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section benefits" aria-labelledby="benefits-title">
        <div className="container center">
          <SectionHeading
            id="benefits-title"
            eyebrow="WHY VISTA WELLNESS"
            title={
              <>
                肌と向き合う時間を、
                <br />
                もっと自分らしく。
              </>
            }
          />
          <div className="benefit-grid">
            {BENEFITS.map((b) => (
              <div className="benefit" key={b.t}>
                <div className="benefit__icon">{b.icon}</div>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULATIONS */}
      <section className="section formulary" id="kampo" aria-labelledby="kampo-title">
        <div className="container">
          <div className="formulary__intro">
            <SectionHeading
              id="kampo-title"
              eyebrow="FORMULATIONS"
              title={
                <>
                  医師が、症状と体調に合わせて。
                  <br />
                  医療用漢方という選択肢。
                </>
              }
              sub="VISTA Wellnessで取り扱っている6つの医療用漢方をご紹介します。肌の状態や月経・冷えなどの症状、服薬状況を踏まえ、処方の必要性は医師が判断します。"
            />
          </div>
          {KAMPO_GROUPS.map((g) => (
            <div className="formulary__group" key={g.id}>
              <div className="group-heading">
                <h3>{g.title}</h3>
                <small>{g.en}</small>
              </div>
              <p className="group-lead">{g.lead}</p>
              <div className="kampo-grid">
                {KAMPO.filter((k) => k.group === g.id).map((k, i) => (
                  <KampoCard key={k.id} k={k} index={i} />
                ))}
              </div>
            </div>
          ))}
          <div className="kampo-message">
            <div className="kampo-message__icon" aria-hidden="true">
              ✳
            </div>
            <div>
              <strong>漢方薬は、好きなものを選んで購入する商品ではありません。</strong>
              <p>
                同じ肌悩みでも、適切な治療は人によって異なります。医師が症状・体質・持病・服薬状況・妊娠の可能性などを確認し、処方するかどうかを判断します。皮膚科の標準治療や対面受診が適切な場合もあります。
              </p>
            </div>
          </div>
          <p className="small-note" style={{ marginTop: 16 }}>
            ※{KAMPO_SAFETY_NOTE}
          </p>
          <div className="cta-stack" style={{ marginTop: 28 }}>
            <LineCTA position="formulation" variant="outline" />
          </div>
        </div>
      </section>

      <section className="quote">
        <div className="eyebrow">YOUR SKIN, YOUR PACE</div>
        <p>
          “また荒れた”で終わらせず、
          <br />
          自分の肌と、からだを知るきっかけに。
        </p>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing" aria-labelledby="pricing-title">
        <div className="container center">
          <SectionHeading
            id="pricing-title"
            eyebrow="SIMPLE PRICING"
            title={
              <>
                迷わず選べる、
                <br />
                ひとつのプラン。
              </>
            }
            sub={
              <>
                複雑なプラン選択は必要ありません。
                <br />
                処方内容は、診察のうえ医師が判断します。
              </>
            }
          />
          <div className="price-card">
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
            </ul>
            <LineCTA position="pricing" />
            <p className="small-note">{LINE_CTA_NOTE}</p>
            <div className="price-first">
              <b>はじめてのお支払い</b>
              <br />
              処方ありの場合：{yen(PLAN.monthly)}（{TAX_LABEL}）
              <br />
              処方なしの場合：診察料{yen(PLAN.noPrescriptionFee)}（{TAX_LABEL}）
              <br />
              <span className="small-note">LINE追加・予約の時点では費用は発生しません。</span>
            </div>
          </div>
          <p className="small-note" style={{ marginTop: 18 }}>
            再診・配送・お支払い方法・解約条件などの詳細は
            <Link className="text-link" href="/pricing">
              料金ページ
            </Link>
            をご確認ください。
          </p>
        </div>
      </section>

      {/* FLOW */}
      <section className="section steps" id="flow" aria-labelledby="flow-title">
        <div className="container center">
          <SectionHeading id="flow-title" eyebrow="HOW IT WORKS" title="受診の流れ" />
          <ol className="step-grid">
            {FLOW_SHORT.map((s) => (
              <li className="step" key={s.n}>
                <div className="step__num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="small-note" style={{ marginTop: 34 }}>
            初回は原則30日分。約1か月後の再診で継続できる場合は、原則3か月ごとの診察・90日分のお届けに移行します。
            <br />
            <Link className="text-link" href="/consult">
              予約から再診までの詳しい流れ
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="よくあるご質問" />
          <FAQAccordion items={FAQ_ITEMS} />
          <p className="small-note center" style={{ marginTop: 24 }}>
            詳しくは
            <Link className="text-link" href="/about/jiyu-shinryo">
              自由診療について
            </Link>
            ・
            <Link className="text-link" href="/legal/terms">
              利用規約
            </Link>
            をご確認ください。
          </p>
        </div>
      </section>

      {/* END CTA */}
      <section className="end-cta" aria-labelledby="end-title">
        <div className="eyebrow">START WITH A CONSULTATION</div>
        <h2 className="section-title" id="end-title">
          肌悩みを、
          <br />
          医師に相談する第一歩。
        </h2>
        <p className="sub">
          繰り返す肌の悩みを、医師に相談。
          <br />
          まずはLINEから診療予約へ。
        </p>
        <LineCTA position="final" />
        <p className="small-note">{LINE_CTA_NOTE}</p>
        <p className="small-note">
          まず悩みを整理したい方は{" "}
          <Link className="text-link" href="/check">
            肌荒れ・体調チェック
          </Link>
        </p>
      </section>

      <DisclosureNotice />
    </SiteShell>
  );
}
