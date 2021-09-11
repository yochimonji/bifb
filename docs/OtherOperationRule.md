# その他運用ルール
パッケージインストール時の注意事項、ESLint、Prettier、import/export、コメントVSCodeの設定・拡張機能について書かれたドキュメントです。 

## パッケージインストール時の注意事項
注意事項は以下の2点です。

- コンテナ内でパッケージを追加しても良いか
- パッケージインストール時のコマンド


### コンテナ内でパッケージを追加しても良いか

結論から言うと、コンテナ内で新しくパッケージをインストールして問題ありません。ただし、**developブランチにマージする際にメンバー全員にアナウンス**をお願いします。  
パッケージをインストールした人以外はビルドし直す必要があります。また、パッケージをインストールした人もチェックアウトした際にはビルドし直す必要があります。（[Docker環境構築方法](./DockerOperation.md)）


### パッケージインストール時のコマンド

`npm`のバージョンによって`create-react-app`との相性が悪く、`npm install xxxxx`ではパッケージをインストールできません。今回作成したDocker環境も相性が悪いため、以下のオプションをつけて実行します。

```
npm install --no-audit xxxxx
```

## ESLint, Prettier, Airbnb
ビルド時に全て自動で設定されているので特に設定することはありません。
- 規約に沿わないコーディングを見つけると赤や黄の波線が引かれます。
  - 基本的に赤や黄の波線は全て規約に沿ったコーディングになるよう修正します。
  - 他のメンバーに相談しても解消できない場合はその行だけESLintの対象から外します。
- 保存すると自動フォーマットが走ります。
  - ちょっとした間違い（ ; つけ忘れなど）は自動で修正してくれます。
  - React, TypeScript, Chakra UI 的に問題ないコードでも、コーディング規約に違反するとエラーになります。
- `npm start` を実行中は時々ESLintやPrettierがバグって修正しても赤い波線が消えないことがあります。その場合は `Ctrl + c` で `npm start` を終了して、もう一度 `npm start` してください。


## import/export、コメントアウト
例となるファイルを置いたので参考にしてください。（そのうち削除します。）

## VSCodeの設定、拡張機能
VSCodeの設定や拡張機能はDocker Containerを建てると自動で適用されます。詳細は[devcontainer.json](../.devcontainer/devcontainer.json)に書かれています。

### 設定 (settings)
js, ts, tsxファイルは以下の設定が適用されます。コーディング規約に沿った設定になってます。

- タブをスペース2つに変換
- 保存時にESLint, Prettierの設定に自動フォーマット

### 拡張機能
必須機能と便利機能を追加しました。変更したい、追加したいなどあればメンバーに相談しましょう。（むしろ便利な機能があれば教えて欲しい）

- "dbaeumer.vscode-eslint"：JS用Linter
- "esbenp.prettier-vscode"：JS用Prettier
- "formulahendry.auto-rename-tag"：HTML開始タグの編集を終了タグにも伝える
- "donjayamanne.githistory"：Gitの履歴確認
- "mosapride.zenkaku"：全角スペース
- "oderwat.indent-rainbow"：インデントをカラフルにする
- "xabikos.javascriptsnippets"：JS用Snippets
- "yzhang.markdown-all-in-one"：Markdownツール