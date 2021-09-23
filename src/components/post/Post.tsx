import React, { useState, useRef, useContext } from "react";
import {
  Input,
  HStack,
  Stack,
  Image,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  Icon,
} from "@chakra-ui/react";
import { BsImage } from "react-icons/bs";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import loadImage from "blueimp-load-image";
import { useHistory } from "react-router-dom";

import app from "../../base";
import { GithubIcon, ProductIcon, TagIcon, MarkdownForm } from "..";
import { postProduct } from "../../firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";

const storage = getStorage(app);

const Post = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [iconName, setIconName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [tags, setTags] = useState("");
  const [mainText, setMainText] = useState("");
  const [error, setError] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [validAbstract, setValidAbstract] = useState(false);
  const [validIconUrl, setValidIconUrl] = useState(false);
  const [validTags, setValidTags] = useState(false);
  const [validMainText, setValidMainText] = useState(false);

  const iconInputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  /**
   * タイトルの変更に合わせてタイトルのstateを変更
   * @param event 入力が変更されたイベント
   */
  const handleTitle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  };

  /**
   * 概要の変更に合わせて概要のstateを変更
   * @param event 入力が変更されたイベント
   */
  const handleAbstract: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setAbstract(event.target.value);
  };

  /**
   * アップロードされた画像ファイルのプレビューを表示する関数
   * @param event fileをアップロードするイベント
   */
  const handleIcon: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    // ファイルが選択されているかチェック
    if (event.target.files == null || event.target.files[0] == null) {
      setError("ファイルが選択されていません");
      setIconUrl("");
    } else {
      // ファイルが選択されている場合、新しいファイル名を生成
      setError("");
      const icon = event.target.files[0];
      const newIconName = `icon/${uuidv4()}${icon.name.slice(
        icon.name.lastIndexOf(".")
      )}`;

      // ファイルを選択し直した時に既存のファイルをStorageから削除
      if (iconName !== "") {
        const oldIconRef = ref(storage, iconName);
        await deleteObject(oldIconRef);
      }
      setIconName(newIconName);

      // アイコンの圧縮・クロップ処理してcanvas形式に変換
      const loadIcon = await loadImage(icon, {
        maxHeight: 512,
        maxWidth: 512,
        crop: true,
        canvas: true,
      });
      const canvasIcon = loadIcon.image as HTMLCanvasElement;

      // canvasをBlobに変換してStorageに保存
      const newIconRef = ref(storage, newIconName);
      canvasIcon.toBlob(
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        async (blobIcon) => {
          if (blobIcon == null) {
            setError("アイコンの変換に失敗しました");
          } else {
            await uploadBytes(newIconRef, blobIcon)
              .then(() => {
                setError("");
              })
              .catch(() => {
                setError(`アイコンのアップロードに失敗しました。`);
              });
            const downloadUrl = await getDownloadURL(newIconRef);
            setIconUrl(downloadUrl);
          }
        },
        "image/jpeg",
        0.95
      );
    }
  };

  /**
   * 画像変更ボタンクリックでRefのhidden属性の画像用inputタグをクリックする関数
   */
  const onClickIconButton: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (iconInputRef.current != null) {
      iconInputRef.current.click();
    }
  };

  /**
   * GitHub URL の変更に合わせてgithubUrlを変更
   * @param event GitHubリンクの入力イベント
   */
  const handleGithubUrl: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setGithubUrl(event.target.value);
  };

  /**
   * GitHub URL の変更に合わせてgithubUrlを変更
   * @param event GitHubリンクの入力イベント
   */
  const handleProductUrl: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setProductUrl(event.target.value);
  };

  /**
   * タグ入力欄の変更に合わせてtagsを変更
   * @param event tagsの入力イベント
   */
  const handleTags: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTags(event.target.value);
  };

  /**
   * マークダウンの入力の変更に合わせてmainTextを変更
   * @param event マークダウンの入力イベント
   */
  const handleMainText: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setMainText(event.target.value);
  };

  /**
   * 入力値のバリデーションを行う関数
   * @returns 投稿可能かのBoolean
   */
  const validate = () => {
    let canPost = true;
    // タイトル、概要、アイコンURL、説明文は同じ処理
    if (title === "") {
      canPost = false;
      setValidTitle(true);
    } else {
      setValidTitle(false);
    }
    if (abstract === "") {
      canPost = false;
      setValidAbstract(true);
    } else {
      setValidAbstract(false);
    }
    if (iconUrl === "") {
      canPost = false;
      setValidIconUrl(true);
    } else {
      setValidIconUrl(false);
    }
    if (mainText === "") {
      canPost = false;
      setValidMainText(true);
    } else {
      setValidMainText(false);
    }
    // タグは空白で区切って5つまでとしている
    // normalizeで全角を半角に統一
    // 1つ目のreplaceで前後の空白を削除
    // 2つ目のreplaceで空白が2回以上続いたら1つの空白に置換
    const newTags = tags
      .normalize("NFKC")
      .replace(/(^\s+)|(\s+$)/g, "")
      .replace(/(\s{2,})/g, " ");
    // 処理を行なったタグで更新しておく
    setTags(newTags);
    const tagList = newTags.split(" ");
    if (tagList.length > 5) {
      canPost = false;
      setValidTags(true);
    } else {
      setValidTags(false);
    }
    return canPost;
  };

  // 投稿ボタンを押したら作品情報をFirestoreに保存する関数
  const handlePost: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const canPost = validate();
    // タグはvalidateと同様の処理を行う
    // stateはすぐに更新されないことがあるため
    const tagList = tags
      .normalize("NFKC")
      .replace(/(^\s+)|(\s+$)/g, "")
      .replace(/(\s{2,})/g, " ")
      .split(" ");
    // 重複要素を削除
    const nonDuplicatedTagList = [...new Set(tagList)];
    // ログイン済みでバリデーションOKの場合Firestoreに保存
    if (currentUser != null && canPost) {
      const productId = await postProduct(
        title,
        abstract,
        iconUrl,
        githubUrl,
        productUrl,
        nonDuplicatedTagList,
        mainText,
        currentUser.uid
      );
      if (productId) {
        history.push("/");
      } else {
        // eslint-disable-next-line no-alert
        alert("投稿処理に失敗しました");
      }
    }
  };

  return (
    <Stack spacing={{ base: "4", md: "2" }} pt="8">
      <HStack align="center">
        <Stack w={{ base: "40%", sm: "30%", md: "20%" }}>
          {/* 画像はstateの変数から読み込む */}
          {iconUrl ? (
            <Image w="100%" fit="cover" src={iconUrl} />
          ) : (
            <Button w="100%" variant="ghost" onClick={onClickIconButton}>
              <Icon as={BsImage} boxSize="8" />
            </Button>
          )}
          {/* 画像アップロード用のhidden属性を付与したinput */}
          {/* 下のButtonをクリックするとinputもクリックされる */}
          <input
            hidden
            ref={iconInputRef}
            type="file"
            accept="image/*"
            onChange={handleIcon}
          />
          {/* 上のinputの代わりのアイコン変更用ボタン */}
          <Button
            variant="ghost"
            fontSize="sm"
            w="100%"
            h="100%"
            onClick={onClickIconButton}
          >
            アイコン選択
          </Button>
          {/* アイコン選択時のエラー */}
          {error && (
            <Text fontSize="sm" color="red" m="0">
              {error}
            </Text>
          )}
          {/* 投稿ボタンをクリックした際のバリデーション情報 */}
          {validIconUrl && (
            <Text fontSize="xs" color="red" m="0" align="center">
              作品のアイコンを選択してください
            </Text>
          )}
        </Stack>
        {/* 作品タイトルと概要 */}
        <Stack w={{ base: "60%", sm: "70%", md: "80%" }} h="auto" pt="4">
          <FormControl w="100%" h="60%">
            <FormLabel>作品タイトル</FormLabel>
            <Input
              fontSize="xl"
              variant="flushed"
              value={title}
              onChange={handleTitle}
            />
            {validTitle && (
              <FormHelperText color="red">
                作品タイトルを入力してください。
              </FormHelperText>
            )}
          </FormControl>
          <FormControl w="100%" h="40%">
            <FormLabel fontSize={{ base: "sm", sm: "md" }}>
              この作品を一言で表すと？
            </FormLabel>
            <Input
              variant="flushed"
              value={abstract}
              onChange={handleAbstract}
            />
            {validAbstract && (
              <FormHelperText color="red">
                作品概要を入力してください。
              </FormHelperText>
            )}
          </FormControl>
        </Stack>
      </HStack>
      {/* GitHubリンク入力欄 */}
      <Stack flexDir={{ base: "column", md: "row" }} pl="2">
        <GithubIcon
          w={{ base: "100%", md: "20%" }}
          justify={{ base: "flex-start", md: "center" }}
        />
        <FormControl w={{ base: "100%", md: "80%" }}>
          <Input
            variant="flushed"
            type="url"
            placeholder="https://example.com"
            value={githubUrl}
            onChange={handleGithubUrl}
          />
        </FormControl>
      </Stack>
      {/* 作品リンク入力欄 */}
      <Stack flexDir={{ base: "column", md: "row" }} pl="2">
        <ProductIcon
          w={{ base: "100%", md: "20%" }}
          justify={{ base: "flex-start", md: "center" }}
        />
        <FormControl w={{ base: "100%", md: "80%" }}>
          <Input
            variant="flushed"
            type="url"
            placeholder="https://example.com"
            value={productUrl}
            onChange={handleProductUrl}
          />
        </FormControl>
      </Stack>
      {/* タグ入力欄 */}
      <Stack flexDir={{ base: "column", md: "row" }} pl="2">
        <TagIcon
          w={{ base: "100%", md: "20%" }}
          justify={{ base: "flex-start", md: "center" }}
          pb={{ base: "0", md: "2" }}
        />
        <FormControl w={{ base: "100%", md: "80%" }}>
          <Input variant="flushed" value={tags} onChange={handleTags} />
          {validTags ? (
            <FormHelperText color="red">
              タグはスペースで区切って5つまで入力してください（例：Webアプリ
              JavaScript）
            </FormHelperText>
          ) : (
            <FormHelperText>
              タグはスペースで区切って5つまで入力してください（例：Webアプリ
              JavaScript）
            </FormHelperText>
          )}
        </FormControl>
      </Stack>
      <MarkdownForm
        pageType="post"
        text={mainText}
        validText={validMainText}
        handleText={handleMainText}
        handlePost={handlePost}
      />
    </Stack>
  );
};

export default Post;
