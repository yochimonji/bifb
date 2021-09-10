# 開発者ドキュメント
開発者用の各ドキュメントをまとめたドキュメント
## フォルダ構成
```
.
|-- .devcontainer
|   `-- devcontainer.json
|-- .eslintrc.js
|-- .gitignore
|-- Dockerfile
|-- README.md
|-- docker-compose.yml
|-- docs
|   `-- README.md
|-- package-lock.json
|-- package.json
|-- public                  // 静的ファイル用フォルダ
|   |-- index.html
|-- src                     // アプリ本体
|   |-- components          // 各種コンポーネント
|   |   |-- SampleBox1.tsx
|   |   `-- index.ts
|   |-- App.tsx
|   |-- index.tsx
`-- tsconfig.json
```
## Docker環境構築方法
Dockerを用いて開発環境を構築する方法について書かれたドキュメントです。VSCodeのGUIの操作方法のみ記載しています。  
[DockerOperation.md](./DockerOperation.md)
## Git, GitHub運用ルール
Git, GitHubの運用方法について書かれたドキュメントです。  
[GitOperationRule.md](./GitOperationRule.md)
## その他運用ルール
パッケージインストール時の注意事項、Linter、Formatter、コメントについて書かれたドキュメントです。  
[OtherOperationRule.md](./OtherOperationRule.md)