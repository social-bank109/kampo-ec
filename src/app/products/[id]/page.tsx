import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ARCHIVED_KAMPO,
  KAMPO,
  KAMPO_DOCTOR_NOTE,
  KAMPO_PENDING_NOTE,
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

/**
 * 確定6剤 + 旧ページ（URLを維持するため削除しない。noindex・「現在の処方ラインナップ外」の注記）
 */
export function generateStaticParams() {
  const ids = new Set([...KAMPO.map((k) => k.id), ...ARCHIVED_KAMPO.map((k) => k.id), ...MEDICINES.map((m) => m.id)]);
  return [...ids].map((id) => ({ id }));
}

function archivedInfo(id: string) {
  const a = ARCHIVED_KAMPO.find((x) => x.id === id);
  if (a) return { name: a.name, reading: a.reading, medicine: undefined };
  const m = MEDICINES.find((x) => x.id === id);
  if (m) return { name: m.name, reading: m.reading, medicine: m };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const k = findKampo(id);
  if (k)
    return {
      title: `${k.name}（${k.reading}）`,
      description: `${k.name}（${k.reading}）について。主な紹介テーマ：${k.theme}。処方の可否は医師が診療のうえ判断します。`,
    };
  const a = archivedInfo(id);
  if (!a) return {};
  // 現在の処方ラインナップ外のページは残すが、検索インデックス対象から外す
  return { title: `${a.name}（${a.reading}）`, robots: { index: false, follow: true } };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (findKampo(id)) return <KampoDetail id={id} />;
  if (archivedInfo(id)) return <ArchivedDetail id={id} />;
  notFound();
}

function Crumbs({ name }: { name: string }) {
  return (
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
          <span aria-current="page">{name}</span>
        </li>
      </ol>
    </nav>
  );
}

function KampoDetail({ id }: { id: string }) {
  const k = findKampo(id)!;
  return (
    <SiteShell>
      {/* 1. 処方名・読み方 */}
      <section className="page-hero page-hero--plain">
        <div className="container">
          <Crumbs name={k.name} />
          <div className="detail-hero" style={{ marginTop: 16 }}>
            <div>
              <div className="kampo-meta">
                <span>{k.category}</span>
                {k.maker && <span>{k.maker}</span>}
                <span className="badge">{KAMPO_DOCTOR_NOTE}</span>
              </div>
              <h1 style={{ marginBottom: 4, overflowWrap: "anywhere" }}>{k.name}</h1>
              <div className="kampo-kana" style={{ fontSize: 13 }}>
                {k.reading}
              </div>
              <p className="sub" style={{ marginTop: 12 }}>
                主な紹介テーマ：{k.theme}
              </p>
            </div>
            <div className="detail-hero__art">
              <KampoArt k={k} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <div className="container container--narrow" style={{ paddingTop: 24, paddingBottom: 40 }}>
        {/* 2. 処方の概要 */}
        <section className="detail-section">
          <h2>処方の概要</h2>
          <p>{k.overview}</p>
        </section>

        {/* 3. 正式な効能・効果 */}
        <section className="detail-section">
          <h2>効能・効果</h2>
          {k.officialIndications ? (
            <>
              {k.officialIndications.map((t) => (
                <p key={t} style={{ marginBottom: 10 }}>
                  {t}
                </p>
              ))}
              {k.indicationNote && <p className="detail-note">※{k.indicationNote}</p>}
            </>
          ) : (
            <p className="detail-pending">{KAMPO_PENDING_NOTE}</p>
          )}
        </section>

        {/* 4. どのような症状・体質で検討されるか */}
        <section className="detail-section">
          <h2>どのような悩みで検討されるか</h2>
          <p>主な紹介テーマ：{k.theme}</p>
          <p style={{ marginTop: 10 }}>
            実際には、肌の状態に加えて、PMS（月経前症候群）など月経に伴う不調、冷え、便通、睡眠、ストレス、既往歴・服薬状況などを確認し、この漢方が適するかどうかを医師が判断します。同じ悩みでも、処方されない場合や別の処方が検討される場合があります。
          </p>
        </section>

        {/* 5. 主な注意事項・副作用 */}
        <section className="detail-section">
          <h2>主な注意事項・副作用</h2>
          {k.productCautions ? (
            <>
              {k.productCautions.map((t) => (
                <p key={t} style={{ marginBottom: 10 }}>
                  {t}
                </p>
              ))}
            </>
          ) : (
            <>
              <p className="detail-pending">{KAMPO_PENDING_NOTE}</p>
              <p style={{ marginTop: 12 }}>{KAMPO_SAFETY_NOTE}</p>
            </>
          )}
          <p className="detail-note" style={{ marginTop: 4 }}>
            服用後に気になる症状や体調の変化があった場合は、自己判断で続けずに医師・薬剤師へご相談ください。
          </p>
        </section>

        {/* 6. オンライン診療での処方について */}
        <section className="detail-section">
          <h2>オンライン診療での処方について</h2>
          <p>
            この漢方は、ご希望を伝えれば処方されるものではありません。Web問診とオンライン診療で医師が状態を確認し、処方の可否と内容を判断します。オンラインでは十分に確認できない場合や、皮膚科の標準治療・対面診療が適切な場合は、医療機関への受診をご案内します。
          </p>
          <p style={{ marginTop: 10 }}>
            料金については
            <Link className="text-link" href="/pricing">
              料金ページ
            </Link>
            をご確認ください。
          </p>
        </section>

        {/* 7. CTA */}
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

function ArchivedDetail({ id }: { id: string }) {
  const a = archivedInfo(id)!;
  const m = a.medicine;
  return (
    <SiteShell sticky={false}>
      <section className="page-hero page-hero--plain">
        <div className="container">
          <div className="eyebrow">MEDICAL KAMPO — ARCHIVE</div>
          <h1 style={{ marginBottom: 4 }}>{a.name}</h1>
          <div className="kampo-kana" style={{ fontSize: 13 }}>
            {a.reading}
          </div>
        </div>
      </section>
      <div className="container container--narrow" style={{ paddingTop: 24, paddingBottom: 48 }}>
        <div className="notice" style={{ margin: "16px 0 8px" }}>
          <strong>この漢方は、現在のVISTA Wellnessの処方ラインナップには含まれていません</strong>
          <p>
            このページは以前の掲載内容です。現在取り扱っている医療用漢方は
            <Link className="text-link" href="/#kampo">
              こちら
            </Link>
            をご覧ください。処方の可否・内容は、診療のうえ医師が判断します。
          </p>
        </div>
        {m && (
          <>
            <section className="detail-section">
              <h2>概要（以前の掲載内容）</h2>
              <p>{m.description}</p>
            </section>
            <section className="detail-section">
              <h2>副作用・リスク</h2>
              <p>漢方薬でも、体質や併用薬によって副作用が生じることがあります。主なものとして、以下が知られています。</p>
              <ul style={{ marginTop: 8 }}>
                {SIDE_EFFECTS_GENERAL.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          </>
        )}
        <p className="small-note" style={{ marginTop: 12 }}>
          掲載内容は特定の疾患の診断・治療・治癒を保証するものではありません。
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
