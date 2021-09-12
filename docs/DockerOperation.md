# Docker 環境構築方法

Docker を用いて開発環境を構築する方法について書かれたドキュメントです。VSCode の GUI の操作方法のみ記載しています。

## 初めに

今回は Docker Container 内で開発を行います。ローカル環境で開発は行わないので注意してください。ローカル環境用の設定は行っていないため、ローカル環境で開発すると Linter の設定などが合わず、不要なコンフリクトが発生する原因になります。

## Build 方法

Docker Countainer をビルドしてコンテナ内に入ります。

1. 前提として以下が必要。
   - `docker`コマンドと`docker-compose`コマンドが動く環境
   - VSCode の拡張機能の Remote - Containers (または Remote Development) と Docker(← 拡張機能名です)のインストール
2. 任意のフォルダにリポジトリをクローンします。  
   `git clone https://github.com/yochimonji/bifb.git`
3. VSCode でクローンしたフォルダを開きます。
4. 左下の緑色の「><」のようなマークをクリックします。  
   ![remote_window](https://github.com/yochimonji/bifb/blob/images/remote_window.png)
5. 「Reopen in Container」をクリックしてしばらく待ちます（build は時間がかかる）。
6. 以下のような画面が表示されたら起動成功。  
   ![first_start](https://github.com/yochimonji/bifb/blob/images/build.png)
7. ローカル環境で動かす時と同じように開発できるはずです。(`npm start`など試してみてください。)  
   各種ファイルはローカル環境のファイルと同期しています。  
   また、Git や ESLint、拡張機能は起動するだけで使えるようになっています（使えないところがあったら教えてください）。

## Rebuild 方法

パッケージや拡張機能を追加した際は Rebuild が必要になります。

1. 左下の緑色の「Dev Container: bifb」をクリックします。  
   ![rebuild](https://github.com/yochimonji/bifb/blob/images/rebuild.png)
2. 「Rebuild Container」をクリックしてしばらく待ちます。
3. Rebuild 前と同じ画面に戻ってきたら完了です。

## コンテナ削除方法

何らかの不具合などでコンテナを削除する方法です。

1. コンテナ内にいる場合、左下の緑色の「Dev Container: bifb」をクリックします。  
   ![rebuild](https://github.com/yochimonji/bifb/blob/images/rebuild.png)
2. 「Reopen Folder Locally」をクリックしてローカル環境に戻ります。
3. 左の Activity bar の Docker アイコンをクリックします。
4. コンテナを削除します。CONTANERS -> bifb -> bifb_node を右クリックして、「Remove」をクリックします。警告も「Remove」をクリックします。  
   ![rm_container](https://github.com/yochimonji/bifb/blob/images/rm_container.png)
5. イメージを削除します。IMAGES -> bifb_node -> latest を右クリックして、「Remove」をクリックします。警告も「Remove」をクリックします。  
   ![rm_image](https://github.com/yochimonji/bifb/blob/images/rm_image.png)
6. [Build方法](#build-方法)の 4. 以降をもう一度行い、Buildしなおします。
