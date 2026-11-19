import TrackedSection from "../TrackedSection";
import SectionHeading from "../SectionHeading";
import VistaImage from "../VistaImage";
import FlowLink from "../TrackedLink";

const TALK: { who: "doctor" | "patient"; text: string }[] = [
  { who: "doctor", text: "肌荒れは、いつ頃から気になりますか？" },
  { who: "patient", text: "生理前になると、顎まわりにニキビが繰り返しできます。" },
  { who: "doctor", text: "月経周期によって変化するんですね。冷えや便通など、ほかに気になる体調はありますか？" },
  { who: "patient", text: "冷えが気になることがあります。" },
];

/** 会話形式の UI（トップ・流れページで共用） */
export function ConversationExample() {
  return (
    <figure className="chat" aria-label="診察での会話の例">
      <ol className="chat__list">
        {TALK.map((t, i) => (
          <li key={i} className={`chat__row chat__row--${t.who}`}>
            <span className="chat__who">{t.who === "doctor" ? "医師" : "患者"}</span>
            <p className="chat__bubble">{t.text}</p>
          </li>
        ))}
      </ol>
      <figcaption className="small-note">
        ※会話は診察内容を説明するためのサンプルです。実際の診療内容は、症状やご相談内容によって異なります。
      </figcaption>
    </figure>
  );
}

/** トップ：オンライン診療って、何をするの？ */
export default function ConsultConversation() {
  return (
    <TrackedSection trackId="home_consult_conversation" className="section conversation" aria-labelledby="talk-title">
      <div className="container">
        <SectionHeading
          id="talk-title"
          eyebrow="YOUR FIRST CONSULTATION"
          title="オンライン診療って、何をするの？"
          sub="難しい準備は必要ありません。Web問診の内容をもとに、女性医師が肌のお悩みや体調について確認します。"
        />
        <div className="conversation__grid">
          <div>
            <div className="conversation__art media">
              <VistaImage assetKey="doctor" sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <p className="image-caption">※イラストはイメージです。</p>
          </div>
          <div>
            <ConversationExample />
            <p className="conversation__summary">
              このように、肌の状態だけでなく、月経・冷え・便通・服薬状況なども確認し、女性医師が適切な治療を検討します。
            </p>
            <FlowLink position="home_conversation" className="btn btn--outline">
              オンライン診療の流れを詳しく見る
              <span aria-hidden="true">→</span>
            </FlowLink>
          </div>
        </div>
      </div>
    </TrackedSection>
  );
}
