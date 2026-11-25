import { CONSULT_SETUP, MAKEUP_MESSAGE } from "@/config/vista";
import TrackedSection from "../TrackedSection";
import SectionHeading from "../SectionHeading";
import LineIcon, { type LineIconName } from "../lineIcons";

type Card = { icon: LineIconName; tone: "rose" | "blue"; title: string; body: string; note?: string };

// TODO: BUSINESS_APPROVAL — メイク・ビデオ通話の運用（下記カード②③の文言）は提携医療機関の運用と照合すること
const CARDS: Card[] = [
  CONSULT_SETUP.femaleDoctorGuaranteed
    ? {
        icon: "doctor",
        tone: "rose",
        title: "女性医師に相談できる安心感",
        body: "女性医師が診察を担当します。肌の悩みや女性特有の体調についても、気兼ねなくご相談いただけます。",
      }
    : {
        icon: "doctor",
        tone: "rose",
        title: "女性特有の悩みも、相談しやすく",
        body: "肌の悩みや女性特有の体調についても、気兼ねなく相談できる診療を目指しています。",
        note: "担当医師についてご希望がある場合は、予約の際にご相談ください。",
      },
  {
    icon: "mirror",
    tone: "blue",
    title: "メイクをしたままでも受診できます",
    body: `${MAKEUP_MESSAGE.main}${MAKEUP_MESSAGE.caution}`,
    note: MAKEUP_MESSAGE.recommend,
  },
  {
    icon: "devices",
    tone: "rose",
    title: "ご自宅からビデオ通話で",
    body: "特別な機材は必要ありません。スマートフォンやパソコンを使い、普段のビデオ通話に近い感覚でご相談いただけます。",
    note: "通常のビデオ通話から開始しますが、診察に必要な場合は医師が画面上で確認をお願いすることがあります。",
  },
];

/** トップ：はじめてのオンライン診療でも、安心して。 */
export default function OnlineConsultIntro() {
  return (
    <TrackedSection trackId="home_online_consult_intro" className="section reassure" id="online" aria-labelledby="reassure-title">
      <div className="container">
        <SectionHeading
          id="reassure-title"
          eyebrow="ONLINE CONSULTATION"
          title={
            <>
              はじめてのオンライン診療でも、
              <br />
              安心して。
            </>
          }
          sub="診察はご自宅から、スマートフォンやパソコンで。肌のお悩みはもちろん、月経や冷え、便通など、気になる体調についても医師にご相談いただけます。"
        />
        <ul className="reassure-grid">
          {CARDS.map((c) => (
            <li className="reassure-card" key={c.title}>
              <div className={`icon-badge icon-badge--${c.tone}`}>
                <LineIcon name={c.icon} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              {c.note && <p className="reassure-card__note">{c.note}</p>}
            </li>
          ))}
        </ul>
      </div>
    </TrackedSection>
  );
}
