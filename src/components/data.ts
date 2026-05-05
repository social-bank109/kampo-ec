// Product catalog — 医療用漢方（医師処方が必要な番号方剤）

export const BRAND = {
  name: "VISTA",
  sub: "Wellness",
  tagline: "女性のゆらぎに、医師と選ぶ漢方を。",
  jp_tagline: "ヴィスタ ウェルネス",
};

export type Ingredient = { k: string; v: string };
export type Product = {
  id: string;
  no: string;
  formula: string;
  ruby: string;
  alias: string;
  concern: string;
  headline: string;
  price: number;
  priceOTC: number | null;
  insurance: boolean;
  rxOnly: boolean;
  tone: string;
  accent: string;
  tags: string[];
  who: string[];
  hope: string[];
  ingredients: Ingredient[];
  availability: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "v106",
    no: "No. 106",
    formula: "温経湯",
    ruby: "うんけいとう",
    alias: "ぬくもり処方",
    concern: "冷え・めぐり・乾きのゆらぎが重なる方へ",
    headline: "手足の冷えと、ほてりが同時に来るあなたへ。",
    price: 1980,
    priceOTC: null,
    insurance: true,
    rxOnly: true,
    tone: "#f3e8e2",
    accent: "#a7665b",
    tags: ["冷え", "周期", "乾き"],
    who: [
      "下半身は冷えるのに、手のひらや足裏だけ火照る",
      "乾燥やくすみが気になり、唇が荒れやすい",
      "周期のゆらぎで気分の波が大きくなる",
    ],
    hope: [
      "冷えとほてりの両方をととのえる方向",
      "周期にともなう不調の波をゆるやかに",
      "うるおいを保ちやすいコンディションへ",
    ],
    ingredients: [
      { k: "当帰・芍薬", v: "血のめぐりをととのえる" },
      { k: "桂皮・呉茱萸", v: "体をあたためる" },
      { k: "麦門冬・阿膠", v: "うるおいを保つ" },
      { k: "半夏・生姜", v: "水のめぐりを助ける" },
    ],
    availability: "医療用のみ（薬局では入手できません）",
  },
  {
    id: "v67",
    no: "No. 67",
    formula: "女神散",
    ruby: "にょしんさん",
    alias: "めぐり処方",
    concern: "のぼせ・めまい・心のゆらぎが続く方へ",
    headline: "時期によって波が大きくなる、心と体に。",
    price: 2480,
    priceOTC: null,
    insurance: true,
    rxOnly: true,
    tone: "#eee2e6",
    accent: "#8f4e69",
    tags: ["のぼせ", "ゆらぎ", "めまい"],
    who: [
      "顔や頭にカッと熱がこもる感じがある",
      "立ちくらみ・頭重が日によって出る",
      "気分の浮き沈みが以前より大きく感じる",
    ],
    hope: [
      "のぼせ・ほてりが和らぎやすいコンディション",
      "気分のゆらぎ幅がゆるやかに整う方向",
      "頭の重さが残りにくい日中のすごし方",
    ],
    ingredients: [
      { k: "当帰・川芎・芍薬", v: "血のめぐりを助ける" },
      { k: "香附子・木香", v: "気のめぐりをひらく" },
      { k: "黄芩・黄連", v: "熱をしずめる" },
      { k: "檳榔子", v: "下へのめぐりを助ける" },
    ],
    availability: "医療用のみ（薬局では入手できません）",
  },
  {
    id: "v11",
    no: "No. 11",
    formula: "柴胡桂枝乾姜湯",
    ruby: "さいこけいしかんきょうとう",
    alias: "しずけさ処方",
    concern: "疲れやすく、眠りが浅い虚弱のゆらぎに",
    headline: "がんばれない自分を、責めてしまう夜に。",
    price: 2280,
    priceOTC: null,
    insurance: true,
    rxOnly: true,
    tone: "#e6ebe5",
    accent: "#5e7a5e",
    tags: ["疲労", "眠り", "虚弱"],
    who: [
      "疲れやすく、夕方以降の気力が続かない",
      "寝つきが浅く、途中で目が覚めやすい",
      "緊張すると汗をかきやすく、体が冷える",
    ],
    hope: [
      "体の芯の疲労感がやわらぐ方向",
      "夜の頭の張りつめがほどける感覚",
      "朝起きたときの『休めた』という実感",
    ],
    ingredients: [
      { k: "柴胡", v: "緊張をゆるめる" },
      { k: "桂枝・乾姜", v: "体をあたためる" },
      { k: "牡蠣・栝楼根", v: "うるおいを補う" },
      { k: "甘草・黄芩", v: "全体をととのえる" },
    ],
    availability: "医療用のみ（薬局では入手できません）",
  },
  {
    id: "v16",
    no: "No. 16",
    formula: "半夏厚朴湯",
    ruby: "はんげこうぼくとう",
    alias: "のどほぐし処方",
    concern: "のどのつかえ、胸のざわつきが続く方に",
    headline: "のどに何かが引っかかる、あの感覚に。",
    price: 1680,
    priceOTC: 3800,
    insurance: true,
    rxOnly: false,
    tone: "#e7ebef",
    accent: "#4f6a84",
    tags: ["のど", "不安", "息苦しさ"],
    who: [
      "のどや胸元に何かがつかえる感じがある",
      "緊張すると息が浅くなり、ため息が増える",
      "検査では異常がないと言われている",
    ],
    hope: [
      "胸のあたりの張りつめがほどけていく感覚",
      "会話や食事を落ち着いて楽しめる時間",
      "緊張の『あと残り』が少なくなる",
    ],
    ingredients: [
      { k: "半夏", v: "のどのつかえに" },
      { k: "厚朴", v: "気のめぐりを助ける" },
      { k: "蘇葉", v: "気分をひらく" },
      { k: "茯苓・生姜", v: "水のめぐりをととのえる" },
    ],
    availability: "医師処方を推奨（医療用の方が一般的に選ばれます）",
  },
  {
    id: "v137",
    no: "No. 137",
    formula: "加味帰脾湯",
    ruby: "かみきひとう",
    alias: "やわらぎ処方",
    concern: "不眠・考えすぎ・心の張りつめがある方に",
    headline: "考え事が止まらない、眠れない夜へ。",
    price: 2380,
    priceOTC: null,
    insurance: true,
    rxOnly: true,
    tone: "#ede6da",
    accent: "#8a6f37",
    tags: ["眠り", "不安", "疲労"],
    who: [
      "布団に入っても考え事が止まらない",
      "心配ごとで食欲が落ちやすい",
      "疲れているのに頭だけが冴えてしまう",
    ],
    hope: [
      "夜の頭のざわつきがほどける感覚",
      "『休めた』と感じる朝が増えていく",
      "日中の気持ちのフラットな時間が広がる",
    ],
    ingredients: [
      { k: "人参・黄耆", v: "気をおぎなう" },
      { k: "酸棗仁・遠志", v: "心をしずめる" },
      { k: "柴胡・梔子", v: "熱をしずめる" },
      { k: "当帰・大棗", v: "血のめぐりをととのえる" },
    ],
    availability: "医療用のみ（薬局では入手できません）",
  },
  {
    id: "v57",
    no: "No. 57",
    formula: "温清飲",
    ruby: "うんせいいん",
    alias: "すっぴん処方",
    concern: "かゆみ・乾燥・のぼせが混ざる肌不調に",
    headline: "乾くのに、のぼせる。その肌のゆらぎへ。",
    price: 2180,
    priceOTC: null,
    insurance: true,
    rxOnly: true,
    tone: "#eae6ed",
    accent: "#6a5e8a",
    tags: ["かゆみ", "乾燥", "のぼせ"],
    who: [
      "乾燥が強いのに、部分的に赤みやほてりが出る",
      "夜になるとかゆみで眠りが浅くなる",
      "化粧品の選択肢が狭まってきている",
    ],
    hope: [
      "乾きとほてりの両方をととのえる方向",
      "夜にかゆみで目が覚める頻度の緩和",
      "メイクのりの安定感",
    ],
    ingredients: [
      { k: "当帰・川芎・芍薬・地黄", v: "血のうるおいを補う" },
      { k: "黄芩・黄連・黄柏・梔子", v: "熱をしずめる" },
    ],
    availability: "医療用のみ（薬局では入手できません）",
  },
];

// Self-check questions
type Weights = Partial<Record<"cold" | "flux" | "weary" | "throat" | "mind" | "skin", number>>;

export type Question =
  | { id: string; prompt: string; sub?: string; kind: "single"; options: { label: string; w: Weights }[] }
  | { id: string; prompt: string; sub?: string; kind: "multi"; options: { label: string; w: Weights }[] }
  | { id: string; prompt: string; sub?: string; kind: "scale"; scale: string[] };

export const QUESTIONS: Question[] = [
  {
    id: "body",
    prompt: "最近、体でいちばん気になることは？",
    kind: "single",
    options: [
      { label: "冷えと、部分的なほてりが同時にある", w: { cold: 3 } },
      { label: "のぼせ・めまい・頭重が出やすい", w: { flux: 3 } },
      { label: "疲れやすく、午後になると失速する", w: { weary: 3 } },
      { label: "のどや胸元に『つかえ感』がある", w: { throat: 3 } },
      { label: "肌の乾燥・かゆみ・ほてりが混ざる", w: { skin: 3 } },
      { label: "頭のざわつきで眠りが浅い", w: { mind: 3 } },
    ],
  },
  {
    id: "mood",
    prompt: "心のゆらぎは、どのように感じますか？",
    sub: "当てはまるものをすべて。",
    kind: "multi",
    options: [
      { label: "時期によって浮き沈みが大きい", w: { flux: 2 } },
      { label: "考え事が止まらない夜がある", w: { mind: 2 } },
      { label: "緊張すると息が浅くなる・ため息が増える", w: { throat: 2 } },
      { label: "自分を責めてしまう感覚が強い", w: { mind: 1, weary: 1 } },
      { label: "大きな波は感じない", w: {} },
    ],
  },
  {
    id: "cycle",
    prompt: "周期にともなうゆらぎは？",
    kind: "single",
    options: [
      { label: "前〜中に体と心の波がはっきり出る", w: { flux: 2, cold: 1 } },
      { label: "冷え・むくみ・下半身の重さが強い", w: { cold: 2 } },
      { label: "肌の調子が大きく変わる", w: { skin: 2 } },
      { label: "特に強くは感じない", w: {} },
    ],
  },
  {
    id: "sleep",
    prompt: "眠りの状態に近いのは？",
    kind: "single",
    options: [
      { label: "寝つきも目覚めもおおむね良い", w: {} },
      { label: "布団に入っても頭が止まらない", w: { mind: 3 } },
      { label: "途中で目が覚め、そのあと眠れない", w: { mind: 1, weary: 1 } },
      { label: "かゆみや不快感で眠りが浅い", w: { skin: 2 } },
    ],
  },
  {
    id: "skin",
    prompt: "お肌や粘膜のコンディションは？",
    sub: "当てはまるものをすべて。",
    kind: "multi",
    options: [
      { label: "乾燥・くすみ・唇の荒れが気になる", w: { cold: 1, skin: 1 } },
      { label: "夜にかゆみを感じることがある", w: { skin: 2 } },
      { label: "赤み・ほてりが部分的に出る", w: { skin: 1, flux: 1 } },
      { label: "目立った不調はない", w: {} },
    ],
  },
  {
    id: "heaviness",
    prompt: "全体として、不調の重さはどのくらい？",
    sub: "生活への影響度の感覚で。",
    kind: "scale",
    scale: ["1 軽い", "2", "3", "4", "5 重い"],
  },
];

export type AxisKey = "cold" | "flux" | "weary" | "throat" | "mind" | "skin";

export const TYPES: Record<AxisKey, { label: string; sub: string; pick: string[] }> = {
  cold: { label: "冷えとゆらぎが重なるタイプ", sub: "めぐりとうるおいを底上げする方向", pick: ["v106"] },
  flux: { label: "のぼせと波が大きいタイプ", sub: "上へのこもりをしずめ、波をやわらげる方向", pick: ["v67"] },
  weary: { label: "疲れが抜けにくいタイプ", sub: "土台の気力とあたたかさをととのえる方向", pick: ["v11", "v137"] },
  throat: { label: "のどと胸がつまるタイプ", sub: "気のめぐりをひらき、緊張をほぐす方向", pick: ["v16"] },
  mind: { label: "考えすぎて眠れないタイプ", sub: "心の張りつめをしずめ、眠りをととのえる方向", pick: ["v137", "v11"] },
  skin: { label: "乾きとかゆみのタイプ", sub: "熱をしずめ、うるおいを補う方向", pick: ["v57"] },
};

export type Answers = Record<string, number | number[]>;

export function recommend(answers: Answers) {
  const score: Record<AxisKey, number> = { cold: 0, flux: 0, weary: 0, throat: 0, mind: 0, skin: 0 };
  for (const q of QUESTIONS) {
    const a = answers[q.id];
    if (a == null) continue;
    if (q.kind === "single" && typeof a === "number") {
      const opt = q.options[a];
      if (opt?.w) for (const k in opt.w) {
        const key = k as AxisKey;
        score[key] = (score[key] || 0) + (opt.w[key] || 0);
      }
    } else if (q.kind === "multi" && Array.isArray(a)) {
      for (const idx of a) {
        const opt = q.options[idx];
        if (opt?.w) for (const k in opt.w) {
          const key = k as AxisKey;
          score[key] = (score[key] || 0) + (opt.w[key] || 0);
        }
      }
    }
  }
  let topAxis: AxisKey = "cold";
  let topScore = -1;
  (Object.keys(score) as AxisKey[]).forEach((k) => {
    if (score[k] > topScore) {
      topScore = score[k];
      topAxis = k;
    }
  });
  if (topScore <= 0) topAxis = "cold";
  const type = TYPES[topAxis];
  const picked = type.pick.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean).slice(0, 2) as Product[];
  return { type, axis: topAxis, score, products: picked };
}
