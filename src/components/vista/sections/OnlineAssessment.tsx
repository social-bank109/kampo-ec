import TrackedSection from "../TrackedSection";
import SectionHeading from "../SectionHeading";
import LineIcon, { type LineIconName } from "../lineIcons";

const STEPS: { icon: LineIconName; title: string; body: string }[] = [
  { icon: "form", title: "Web問診", body: "症状の経過や生活習慣、服薬状況などを確認" },
  { icon: "video", title: "ビデオ診察", body: "医師が直接お話を伺い、必要に応じて視診" },
  { icon: "judge", title: "医師による判断", body: "処方の可否を判断し、必要な場合は対面診療を案内" },
];

/** トップ：オンラインでも、肌の状態を診てもらえるの？ */
export default function OnlineAssessment() {
  return (
    <TrackedSection trackId="home_online_assessment" className="section assess" aria-labelledby="assess-title">
      <div className="container container--narrow">
        <SectionHeading
          id="assess-title"
          eyebrow="CAN A DOCTOR SEE MY SKIN ONLINE?"
          title={
            <>
              オンラインでも、
              <br />
              肌の状態を診てもらえるの？
            </>
          }
        />
        <div className="assess__text">
          <p>
            オンライン診療では、事前のWeb問診やビデオ通話を通じて、肌のお悩み、症状の経過、既往歴、服薬状況などを確認します。
          </p>
          <p>医師がオンラインで評価できる範囲を判断し、必要に応じて医療用漢方の処方を検討します。</p>
          <p>
            一方で、触診や検査が必要な場合など、オンラインだけでは十分な判断ができないこともあります。その場合は対面診療をご案内します。
          </p>
        </div>
        <ol className="assess-steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="assess-step">
              <div className="icon-badge icon-badge--blue">
                <LineIcon name={s.icon} />
              </div>
              <div className="assess-step__n">0{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="small-note center" style={{ marginTop: 20 }}>
          オンライン診療は、対面診療と同じ診察・検査ができるものではありません。また、受診すれば必ず処方されるものではありません。
        </p>
      </div>
    </TrackedSection>
  );
}
