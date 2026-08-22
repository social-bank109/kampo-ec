# 漢方画像の追加方法

漢方の商品画像は `public/images/kampo/` に置き、
`src/components/data.ts` の `MEDICINES[].image` からパスで参照しています。

画像が未登録（`image: undefined`）の場合、または指定パスの画像が読み込めなかった場合は、
自動的にプレースホルダー（「写真準備中」の枠）が表示されます。
**画像が無くても 404 やビルドエラーにはなりません。**

---

## 追加手順

1. 対象漢方の正式な画像を用意する
   - 他の漢方の商品写真を流用しないこと
   - ネットからの無断取得、AI による架空パッケージの生成は行わないこと
2. WebP 形式を推奨（既存画像は JPG。混在して問題ありません）
3. 下表の「指定ファイル名」にリネームする
4. `public/images/kampo/` へ配置する
5. `src/components/data.ts` の該当漢方の `image` を確認する
   - 下表の「data.ts の設定」が `image: undefined` の場合は、
     指定パスの文字列に書き換える（1行のみ）
6. `npm run dev` で表示を確認する
7. `npm run build` でエラーが出ないことを確認する

---

## 画像仕様

| 項目 | 推奨 |
| --- | --- |
| 形式 | WebP（既存は JPG） |
| サイズ | 800×800px 程度 |
| 比率 | 1:1 |
| 背景 | 白背景または透明 |
| 容量 | 300KB 程度を目安（既存は 70〜85KB） |

カード内は `object-fit: contain` で表示するため、パッケージ全体が切れずに収まります。

---

## 現在の登録状況

### 登録済み（既存の命名を維持）

| 漢方 | TJ番号 | ファイル名 |
| --- | --- | --- |
| 防已黄耆湯 | TJ020 | `boiogito.jpg` |
| 防風通聖散 | TJ062 | `bofutsushosan.jpg` |
| 加味逍遙散 | TJ024 | `kamishoyosan.jpg` |
| 酸棗仁湯 | TJ103 | `sansonninto.jpg` |
| 加味帰脾湯 | TJ137 | `kamikihito.jpg` |
| 半夏厚朴湯 | TJ016 | `hangekobokuto.jpg` |
| 当帰芍薬散 | TJ023 | `tokishakuyakusan.jpg` |

### 未登録（追加が必要）

配置先はいずれも `public/images/kampo/` です。

| 漢方 | TJ番号 | 指定ファイル名 | data.ts の設定 |
| --- | --- | --- | --- |
| 女神散 | TJ067 | `kampo-tj067-nyoshinsan.webp` | `image: undefined` → パスに要変更 |
| 柴胡加竜骨牡蛎湯 | TJ012 | `kampo-tj012-saikokaryukotsuboreito.webp` | `image: undefined` → パスに要変更 |
| 当帰四逆加呉茱萸生姜湯 | TJ038 | `kampo-tj038-tokishigyakukagoshuyushokyoto.webp` | `image: undefined` → パスに要変更 |
| 温経湯 | TJ106 | `kampo-tj106-unkeito.webp` | `image: undefined` → パスに要変更 |

画像を配置したら、`src/components/data.ts` の該当箇所を次のように書き換えてください。

```ts
// 変更前
image: undefined,

// 変更後（例：女神散）
image: "/images/kampo/kampo-tj067-nyoshinsan.webp",
```

### 現在は未使用の画像

以下は標準処方体系の見直しにより、サイト上の表示対象から外れた漢方の画像です。
ファイルは削除せず残してあります（将来取り扱いを再開する場合に備えて）。

- `keishibukuryogan.jpg`（桂枝茜苓丸）
- `yokukansan.jpg`（抑肝散）
- `yokukansankachinpihange.jpg`（抑肝散加陳皮半夏）
- `hochuekkito.jpg`（補中益気湯）

---

## 参考：命名規則

新規追加分は次の規則で統一しています。

```
kampo-tj{3桁のTJ番号}-{ローマ字表記}.webp
```

既存画像（`{ローマ字表記}.jpg`）は、URL・参照の安定性のためリネームしていません。
