# エンジニアのための相互フィードバックアプリ

## 概要
**BiFB** (**Bi**directional **F**eed**B**ack) はエンジニアが相互にフィードバックを行い、開発している作品の改善のヒントを得られるアプリです。エンジニアはBiFBに作品を掲載することで他のエンジニアからフィードバックを受けることができます。また、他のエンジニアが開発した作品のフィードバックを行うことで、新たなアイディアを生み出すことにも役立ちます。  
本作品は[技育展2021](https://talent.supporterz.jp/geekten/2021/)で発表しました。

## 機能一覧
- 作品一覧表示
- 作品投稿・編集（Markdown形式）
- フィードバック投稿
- 作品検索（いいね数、新着）

## 今後実装予定の機能一覧
- GitHub連携
  - 作品投稿
  - 自動更新
- フィードバックを受けた際にメール・Slack・GitHubのIssueへ通知
- ユーザーページにいいね・フィードバックした作品一覧を追加
- ユーザー情報の編集
- 作品検索（トレンド）

## 開発メンバー
- [@yochimonji](https://github.com/yochimonji)
- [@shrbt6](https://github.com/shrbt6)
- [@ltoppyl](https://github.com/ltoppyl)

## 使用技術
- React
- TypeScript
- Chakra UI
- Firebese
  - Authentication
  - Firestore Database
  - Storage
  - Hosting
- Docker