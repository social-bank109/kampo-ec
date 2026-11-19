# VISTA Wellness 計測設計・テスト手順

## 方針

- 計測は **GTM（GTM-T2DXVQVQ）の dataLayer への push のみ**。GA4・広告タグへの送信は GTM 側の設定で行う
- **個人情報・健康情報は一切送らない**：チェックの回答、症状、病名、妊娠・服薬の有無などは、イベント名・パラメータ・URL のいずれにも含めない
- チェックの回答はブラウザのメモリ（React state）のみ。URLクエリ・localStorage・サーバーには保存しない
- 計測の失敗・ブロックで遷移を妨げない（`preventDefault` しない／例外は握りつぶす）
- 実装：`src/lib/analytics.ts`

## イベント一覧

| イベント | 発火タイミング | パラメータ | 実装箇所 |
|---|---|---|---|
| （ページビュー） | 各ページ表示 | GTM / Vercel Analytics の標準計測 | `src/app/layout.tsx` |
| `line_cta_click` | LINE CTA（`a[data-cta="line"]`）のクリック | `page_path`（クエリ・ハッシュなし）、`cta_position`、`campaign` | `src/components/vista/LineCTA.tsx` |
| `skin_check_start` | チェックの「チェックをはじめる」 | `page_path` | `src/components/vista/SkinCheck.tsx` |
| `skin_check_complete` | 結果画面の表示 | `page_path` | 同上 |
| `section_view` | トップの新セクションが画面に40%以上表示（1ページ表示につき1回） | `section_id`（`home_online_consult_intro` / `home_consult_conversation` / `home_online_assessment`）、`page_path` | `src/components/vista/TrackedSection.tsx` |
| `flow_link_click` | 「予約から再診までの流れ」ページへのリンクのクリック | `link_position`（`home_conversation` / `home_flow`）、`page_path` | `src/components/vista/TrackedLink.tsx` |
| `flow_page_view` | 「予約から再診までの流れ」ページ（`/consult`）の表示 | `page_path` | `src/components/vista/PageEvent.tsx` |
| `faq_toggle` | FAQ の開閉 | `faq_id`（設問の識別子のみ）、`faq_state`（open/close）、`page_path` | `src/components/vista/FAQAccordion.tsx` |

### `cta_position` の値

| 値 | 位置 |
|---|---|
| `header` | ヘッダー（PCナビ／スマホメニュー内） |
| `hero` | ホーム ファーストビュー |
| `sticky` | スマホ下部固定バー（料金・相談・ホーム・漢方詳細） |
| `formulation` | ホーム 漢方6剤セクション下 |
| `pricing` | ホーム料金カード、料金ページ（カード・最下部） |
| `final` | ホーム 最終CTA |
| `flow_hero` / `flow_step1` / `flow_step4` / `flow_final` | 予約から再診までの流れページ（FV・STEP1・STEP4後・最下部） |
| `consult` | （旧相談ページ。現在は未使用） |
| `check_result` | チェック結果画面 |
| `detail` | 漢方詳細ページ |
| `contact` | お問い合わせページ |
| `footer` / `flow` / `faq` | 予約（将来の配置用） |

### `campaign`

流入URLの `utm_campaign` を英数字・`_`・`-` のみ／64文字以内に制限した値（それ以外は破棄）。セッション中は sessionStorage に保持。無い場合は `(none)`。
**広告管理画面で、キャンペーン名に症状・個人を特定し得る文字列を使わないこと。**

## GTM 側の設定（要対応）

1. トリガー：カスタムイベント `line_cta_click`
2. 変数：データレイヤー変数 `page_path` / `cta_position` / `campaign`
3. GA4 イベントタグ：イベント名 `line_cta_click`、上記3パラメータを送信（GA4でカスタムディメンション登録）
4. **二重発火の防止**：GTM に `lin.ee` 宛の「リンククリック」トリガーやクリック計測タグが既にある場合は停止するか、条件に `data-cta != line` を追加
5. 広告のコンバージョン（Meta Pixel 等）に使う場合も、送るのはイベント名と `cta_position` まで

### トップ／流れページからの LINE クリックの区別

`line_cta_click` の `page_path`（`/` または `/consult`）と `cta_position` で区別できます。GA4 の探索レポートで `page_path × cta_position` を行に置くと比較できます。

## 指標の注意

- `line_cta_click` は「LINEボタンのクリック数」であり、**実際の友だち追加数ではない**。友だち追加数は LINE Official Account Manager の分析（友だち追加経路・流入経路）で確認する
- GA4 で友だち追加数を推定・補正しない
- 予約数・受診数は LINE／提携医療機関側の数値で確認する

## テスト手順

1. GTM プレビューモード（Tag Assistant）でサイトを開く（`?utm_campaign=test_xxx` を付ける）
2. 各ページの LINE ボタンを押し、`line_cta_click` が1回だけ発火し、`cta_position` が上表どおりであることを確認
3. LINE（`https://lin.ee/yn4fg0L`）が新しいタブで開くこと、元タブが残ることを確認
4. 広告ブロッカー有効でもリンク遷移できることを確認
5. `/check` を最後まで回答し、dataLayer に回答内容が含まれないこと、URL が変わらないことを確認
6. 実機：iOS Safari、Android Chrome、LINE／Instagram のアプリ内ブラウザでタップ→LINEアプリ（未インストール時はブラウザの案内ページ）が開くこと

開発時の自動確認結果（Playwright, 375px）：
`[{"event":"skin_check_start","page_path":"/check"},{"event":"skin_check_complete","page_path":"/check"},{"event":"line_cta_click","page_path":"/check","cta_position":"check_result","campaign":"test_cmp"}]`
