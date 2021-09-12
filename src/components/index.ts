// エントリーポイント
// コンポーネントと型定義の書き方の例
export { default as SampleBox1 } from "./SampleBox1";
export { default as SampleBox2 } from "./SampleBox2";
// 複数のコンポーネントで同じ型定義を使う場合別ファイルに分けた方が便利
export type { SampleBox2Props } from "./SampleBox2Props";
