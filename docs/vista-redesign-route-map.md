# VISTA Wellness 美容漢方リニューアル — ルート／ファイル対応表

基準コミット（変更前）：`bea6465`。フレームワーク（Next.js 15 App Router / React 18 / TypeScript）・デプロイ（Vercel）は変更していません。

## 1. 変更前の構成（調査結果）

- レイアウト：最大幅480pxのスマホアプリ風フレーム（`.app-frame`）＋下部タブバー（ホーム／料金／体質チェック／相談）
- スタイル：各コンポーネントのインラインスタイル（`src/components/ui.tsx` に集約）
- データ：`src/components/data.ts` に料金・漢方11剤・主訴・体質チェック設問を集約
- LINE導線：`LINE_ADD_FRIEND_URL = https://lin.ee/yn4fg0L`（data.ts）。**参照は `/consult` の1か所のみ**で、
  「確認事項に同意する」チェックをONにしないとボタンが無効（disabled）。クリック時は `window.open()` で遷移
- 予約・Web問診・決済：サイト外（LINE／提携医療機関）。**リポジトリ内に Stripe・CLIUS・決済リンク・予約APIのコードは存在しない**
- 計測：GTM（GTM-T2DXVQVQ）＋ Vercel Analytics。LINEクリックのイベント計測は無し
- お問い合わせ：HubSpot フォーム埋め込み（portal 20633516 / form a6ad77f9-…）
- テスト基盤：なし（lint / typecheck / build のみ）

### LINEボタンが押されなかった要因（推定）

| 点検項目 | 結果 |
|---|---|
| 導線 | ホーム・料金・チェックのCTAはすべて `/consult` 行き。LINEボタンは `/consult` にしかなかった |
| 同意チェック | チェックONまでボタンが `disabled`（グレー表示）。押せないボタンに見えていた |
| `window.open` | クリック時JSで別タブを開く方式。一部のアプリ内ブラウザ（Instagram/LINE等）でポップアップ扱い・ブロックの懸念 |
| 重なり／pointer-events | タブバー（固定）とCTAの重なりは過去に修正済み。今回はタブバー自体を廃止 |
| Cookie同意 | CMP なし（ブロック要因なし） |
| リンク先 | `https://lin.ee/yn4fg0L` は既存の本番URLを継続使用 |

→ 新実装では、全CTAを `<a href="https://lin.ee/…" target="_blank" rel="noopener noreferrer">` の**通常リンク**にし、同意チェック・モーダル・中間ページを撤廃。

## 2. ルート対応表

| ルート | 変更前 | 変更後 | ファイル |
|---|---|---|---|
| `/` | 総合ウェルネス（PMS・睡眠・不安）＋お試しプラン、11剤カード | 美容漢方LP（モック準拠）：HERO／安心の3要素／共感／アプローチ／特長／6剤／料金／流れ／FAQ／最終CTA | `src/app/(main)/page.tsx` |
| `/pricing` | お試しプラン＋将来4プラン補足 | 美容漢方プラン1つ＋初回総額＋条件表 | `src/app/(main)/pricing/page.tsx` |
| `/check` | 体質チェック（5ステップ・主訴スコア） | 肌荒れ・体調チェック（8ステップ・パターン分類のみ） | `src/app/(main)/check/page.tsx`, `src/components/vista/SkinCheck.tsx` |
| `/consult` | 同意チェック後にLINE（`window.open`） | 「肌悩みを、医師に相談するために。」LINE直リンク×3位置＋固定CTA | `src/app/(main)/consult/page.tsx` |
| `/products/[id]` | 11剤の詳細（クライアント描画） | 新6剤の詳細＋旧ページ（noindex・旧掲載の注記付き）を静的生成 | `src/app/products/[id]/page.tsx` |
| `/about/jiyu-shinryo` | 段落のみ | 見出し・目次付きの情報ページ（既存記載は維持） | `src/app/about/jiyu-shinryo/page.tsx` |
| `/legal/iryo-koukoku` | 段落のみ | 見出し・目次付き（既存開示は維持＋節を追加） | `src/app/legal/iryo-koukoku/page.tsx` |
| `/legal/terms` | 全文 | **文言変更なし**。新デザイン＋自動目次 | `src/app/legal/terms/page.tsx` |
| `/legal/privacy` | 全文 | **文言変更なし**。新デザイン＋自動目次 | `src/app/legal/privacy/page.tsx` |
| `/legal/tokushoho` | 表 | 新デザイン。プラン名のみ「美容漢方プラン（利用規約上の名称：お試しプラン）」 | `src/app/legal/tokushoho/page.tsx` |
| `/contact` | HubSpotフォーム | 同フォームを維持。受付範囲・緊急症状の注記・予約導線を追加 | `src/app/contact/page.tsx` |

`/products/` の旧ページ（防已黄耆湯・酸棗仁湯など）は削除せず、URLを維持したまま `noindex` ＋「以前の掲載内容です」の注記を表示。新トップからはリンクしていません。

## 3. 新規ファイル

| ファイル | 役割 |
|---|---|
| `src/config/vista.ts` | サイト設定の唯一の参照元（LINE URL・CTA文言・料金・条件表・流れ・FAQ・6剤） |
| `src/config/vistaAssets.ts` | 画像アセットマップ |
| `src/lib/assets.ts` | ビルド時に画像の有無を判定（無ければプレースホルダー） |
| `src/lib/analytics.ts` | `line_cta_click` 等の dataLayer push |
| `src/components/vista/*` | Header / Footer / SiteShell / StickyCTA / LineCTA / SectionHeading / PageHero / ImagePlaceholder / VistaImage / KampoCard / FAQAccordion / DisclosureNotice / LegalToc / SkinCheck / icons |
| `src/app/globals.css` | デザイントークン（CSS変数）と共通スタイル |
| `docs/legal-backup/*.txt` | 変更前の法務・情報ページのソース全文バックアップ |

## 4. 削除したファイル（git履歴に残存）

`src/app/(main)/layout.tsx`（タブバー）、`src/components/ScreenTop.tsx` / `ScreenPricing.tsx` / `ScreenConsult.tsx` / `ScreenSelfCheck.tsx` / `ScreenDetail.tsx` / `ui.tsx` / `navigation.ts`

`src/components/data.ts` は旧4プラン・旧11剤の記録として残し、レガシー扱いのコメントを追加（LINE URL は config から再エクスポート）。

## 5. 旧情報の置換表

| 旧 | 新 |
|---|---|
| こころと体のゆらぎに、医師と選ぶ漢方を。 | その肌荒れ、また繰り返していませんか。 |
| PMS・更年期・睡眠・不安 等の主訴 | 繰り返す大人ニキビ・生理前の肌荒れ（＋月経・冷え・便通の確認） |
| お試しプラン 月額6,980円（税込） | 美容漢方プラン 月額6,980円（税込）※税区分は要承認 |
| 将来の4プラン（ライト〜集中ケア）補足 | 新規向け表示から削除（利用規約第16条6項の記載は法務判断待ち） |
| 体質チェック | 肌荒れ・体調チェック |
| 「体質チェックをはじめる」「この悩みを医師に相談する」等 | 「LINEで診療予約へ」に統一 |
| タブバー | ヘッダーナビ＋ハンバーガーメニュー＋スマホ固定LINE CTA |
| メタ情報（総合ウェルネス） | 美容漢方のタイトル・説明、OGP画像は `og-image.webp` 配置で自動設定 |
