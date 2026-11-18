import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  KAMPO,
  KAMPO_DOCTOR_NOTE,
  KAMPO_GROUPS,
  KAMPO_PLANNED_LABEL,
  KAMPO_SAFETY_NOTE,
  LINE_CTA_NOTE,
  findKampo,
} from "@/config/vista";
import { MEDICINES, SIDE_EFFECTS_GENERAL } from "@/components/data";
import SiteShell from "@/components/vista/SiteShell";
import LineCTA from "@/components/vista/LineCTA";
import { KampoArt } from "@/components/vista/KampoCard";
import DisclosureNotice from "@/components/vista/DisclosureNotice";

export const dynamicParams = false;

/** 新6剤 + 旧サイトで公開していた漢方ページ（URLを維持するため削除しない） */
export function generateStaticParams() {
  const ids = new Set([...KAMPO.map((k) => k.id), ...MEDICINES.map((m) => m.id)]);
  return [...ids].map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const k = findKampo(id);
  if (k) return { title: `${k.name}（${k.reading}）`, description: `${k.name}について。${k.summary}処方の可否は医師が判断します。` };
  const m = MEDICINES.find((x) => x.id === id);
  if (!m) return {};
  // 旧コンセプト（睡眠・不安等）のページは残すが、検索インデックス対象から外す
  return { title: `${m.name}（${m.reading}）`, robots: { index: false, follow: true } };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const k = findKampo(id);
  if (k) return <KampoDetail id={id} />;
  const m = MEDICINES.find((x) => x.id === id);
  if (!m) notFound();
  return <LegacyDetail id={id} />;
}

function KampoDetail({ id }: { id: string }) {
  const k = findKampo(id)!;
  const group = KAMPO_GROUPS.find((g) => g.id === k.group)!;
  return (
    <SiteShell>
      <section className="page-hero page-hero--plain">
        <div className="container">
          <nav aria-label="パンくずリスト">
            <ol className="breadcrumb">
              <li>
                <Link href="/">ホーム</Link>
              </li>
              <li>
                <span aria-hidden="true">/ </span>
                <Link href="/#kampo">医療用漢方</Link>
              </li>
              <li>
                <span aria-hidden="true">/ </span>
                <span aria-current="page">{k.name}</span>
              </li>
            </ol>
          </nav>
          <div className="detail-hero" style={{ marginTop: 16 }}>
            <div>
              <div className="kampo-meta">
                <span>{group.en}</span>
                {k.makerNumber && <span>{k.makerNumber}</span>}
                <span className="badge">{KAMPO_DOCTOR_NOTE}</span>
                {k.status === "planned" && <span className="badge badge--planned">{KAMPO_PLANNED_LABEL}</span>}
              </div>
              <h1 style={{ marginBottom: 4 }}>{k.name}</h1>
              <div className="kampo-kana" style={{ fontSize: 13 }}>
                {k.reading}
              </div>
              <p className="sub" style={{ marginTop: 12 }}>
                {k.summary}
              </p>
              <p className="small-note" style={{ marginTop: 10 }}>
                {group.lead}
              </p>
            </div>
            <div className="detail-hero__art">
              <KampoArt k={k} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <div className="container container--narrow" style={{ paddingTop: 24, paddingBottom: 40 }}>
        {k.status === "planned" && (
          <div className="notice" style={{ margin: "16px 0 8px" }}>
            <strong>現在、導入準備中です</strong>
            <p>
              この漢方は取り扱い開始に向けて準備中のため、現時点では処方できません。
            </p>
          </div>
        )}
        <section className="detail-section">
          <h2>診療時に医師が確認する主なポイント</h2>
          <ul>
            {k.checkPoints.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="small-note" style={{ marginTop: 8 }}>
            ※一例です。症状・体質・既往歴・服薬状況・妊娠の可能性などを確認のうえ、処方の可否を医師が判断します。
          </p>
        </section>
        <section className="detail-section">
          <h2>特に注意が必要な方</h2>
          <ul>
            {k.cautions.map((t) => (
              <li key={t}>{t}</li>
            ))}
            <li>妊娠中・妊娠の可能性がある方、授乳中の方</li>
          </ul>
        </section>
        <section className="detail-section">
          <h2>副作用・リスク</h2>
          <p>{KAMPO_SAFETY_NOTE}</p>
          <p style={{ marginTop: 10 }}>
            服用後に気になる症状や体調の変化があった場合は、服用を続けずに医師・薬剤師へご相談ください。
          </p>
        </section>
        <section className="detail-section">
          <h2>このページについて</h2>
          <p>
            医療用漢方に関する一般的な情報提供を目的としたページです。効能・効果、用法・用量、注意事項は、処方される製品の添付文書に基づき医師・薬剤師が説明します。掲載内容は効果や治癒を保証するものではありません。皮膚科の標準治療や対面診療が適切な場合もあります。
          </p>
        </section>
        <div className="cta-stack" style={{ marginTop: 16 }}>
          <LineCTA position="detail" className="btn--wide" />
          <p className="small-note" style={{ margin: 0 }}>
            {LINE_CTA_NOTE}漢方を指定して予約するものではありません。
          </p>
          <Link className="text-link small-note" href="/#kampo">
            ほかの漢方を見る
          </Link>
        </div>
      </div>
      <DisclosureNotice />
    </SiteShell>
  );
}

function LegacyDetail({ id }: { id: string }) {
  const m = MEDICINES.find((x) => x.id === id)!;
  return (
    <SiteShell sticky={false}>
      <section className="page-hero page-hero--plain">
        <div className="container">
          <div className="eyebrow">MEDICAL KAMPO — ARCHIVE</div>
          <h1 style={{ marginBottom: 4 }}>{m.name}</h1>
          <div className="kampo-kana" style={{ fontSize: 13 }}>
            {m.reading}
          </div>
        </div>
      </section>
      <div className="container container--narrow" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div className="notice" style={{ margin: "16px 0 8px" }}>
          <strong>このページは以前の掲載内容です</strong>
          <p>
            VISTA Wellnessは現在、繰り返す大人ニキビ・生理前の肌荒れを中心とした美容漢方オンライン診療としてご案内しています。この漢方の現在の取り扱いや処方の可否は、診療時に医師にご確認ください。料金は
            <Link className="text-link" href="/pricing">
              料金ページ
            </Link>
            をご覧ください。
          </p>
        </div>
        <section className="detail-section">
          <h2>概要</h2>
          <p>{m.description}</p>
        </section>
        {m.doctorConsiders && (
          <section className="detail-section">
            <h2>医師が検討するケース（例）</h2>
            <ul>
              {m.doctorConsiders.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        )}
        {m.cautionCases && (
          <section className="detail-section">
            <h2>注意が必要なケース</h2>
            <ul>
              {m.cautionCases.map((t) => (
                <li key={t}>{t}</li>
              ))}
              <li>妊娠中・授乳中の方は、必ず医師にご相談ください。</li>
            </ul>
          </section>
        )}
        <section className="detail-section">
          <h2>副作用・リスク</h2>
          <p>漢方薬でも、体質や併用薬によって副作用が生じることがあります。主なものとして、以下が知られています。</p>
          <ul style={{ marginTop: 8 }}>
            {SIDE_EFFECTS_GENERAL.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
        <p className="small-note" style={{ marginTop: 12 }}>
          実際の処方は、提携医療機関の医師が診療のうえ判断します。掲載内容は特定の疾患の診断・治療・治癒を保証するものではありません。
        </p>
        <p style={{ marginTop: 20 }}>
          <Link className="text-link" href="/">
            VISTA Wellness トップへ
          </Link>
        </p>
      </div>
      <DisclosureNotice />
    </SiteShell>
  );
}
