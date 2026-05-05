# 薬剤画像

各薬剤の写真をこのディレクトリに配置してください。
ファイル名はデータ定義（`src/components/data.ts` の `MEDICINES[].image`）に合わせます。

```
boiogito.jpg
bofutsushosan.jpg
kamishoyosan.jpg
tokishakuyakusan.jpg
keishibukuryogan.jpg
hangekobokuto.jpg
sansonninto.jpg
kamikihito.jpg
yokukansan.jpg
hochuekkito.jpg
yokukansankachinpihange.jpg
```

画像を配置後、対応する薬剤の `placeholder: true` を `false` に変更すると、
プレースホルダー枠から実画像表示に切り替わります。
