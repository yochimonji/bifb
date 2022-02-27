/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Input,
  HStack,
  Stack,
  Image,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Text,
  Icon,
} from "@chakra-ui/react";
import { BsImage } from "react-icons/bs";
import { getStorage, ref, getDownloadURL, deleteObject, connectStorageEmulator } from "firebase/storage";
import { useHistory, useLocation } from "react-router-dom";

import app from "../../base";
import { GithubIcon, ProductIcon, TagIcon, MarkdownForm, postImage } from "..";
import { editProduct, fetchProduct, postProduct, reduceTagNum } from "../../firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";

const storage = getStorage(app);

const Post = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [iconName, setIconName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [tagList, setTagList] = useState("");
  const [mainText, setMainText] = useState("");
  const [error, setError] = useState("");
  const [validTitle, setValidTitle] = useState(false);
  const [validAbstract, setValidAbstract] = useState(false);
  const [validIconUrl, setValidIconUrl] = useState(false);
  const [validTagList, setValidTagList] = useState(false);
  const [validMainText, setValidMainText] = useState(false);
  const [editProductId, setEditProductId] = useState("");
  const [pastTagList, setPastTagList] = useState("");

  const iconInputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

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
  const handleAbstract: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setAbstract(event.target.value);
  };

  /**
   * アップロードされた画像ファイルのプレビューを表示する関数
   * @param event fileをアップロードするイベント
   */
  const handleIcon: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    // ファイルが選択されているかチェック
    if (event.target.files == null || event.target.files[0] == null) {
      setError("ファイルが選択されていません");
      setIconUrl("");
    } else {
      setError("");
      // ファイルを選択し直した時に既存のファイルをStorageから削除
      if (iconName !== "") {
        const oldIconRef = ref(storage, iconName);
        await deleteObject(oldIconRef);
      }

      // FileをStorageに保存し、アイコン名とURLをstateにセット
      const icon = event.target.files[0];
      const newIconName = await postImage(icon, "icon", true);
      const newIconRef = ref(storage, newIconName);
      const downloadUrl = await getDownloadURL(newIconRef);
      setIconName(newIconName);
      setIconUrl(downloadUrl);
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
  const handleGithubUrl: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setGithubUrl(event.target.value);
  };

  /**
   * GitHub URL の変更に合わせてgithubUrlを変更
   * @param event GitHubリンクの入力イベント
   */
  const handleProductUrl: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setProductUrl(event.target.value);
  };

  /**
   * タグ入力欄の変更に合わせてtagListを変更
   * @param event tagListの入力イベント
   */
  const handleTagList: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTagList(event.target.value);
  };

  /**
   * マークダウンの入力の変更に合わせてmainTextを変更
   * @param event マークダウンの入力イベント
   */
  const handleMainText: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
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
    const newTagList = tagList
      .normalize("NFKC")
      .replace(/(^\s+)|(\s+$)/g, "")
      .replace(/(\s{2,})/g, " ");
    // 処理を行なったタグで更新しておく
    setTagList(newTagList);
    const tagListLength = newTagList.split(" ").length;
    if (tagListLength > 5) {
      canPost = false;
      setValidTagList(true);
    } else {
      setValidTagList(false);
    }
    return canPost;
  };

  // 投稿ボタンを押したら作品情報をFirestoreに保存する関数
  const handlePost: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const canPost = validate();
    // タグはvalidateと同様の処理を行う
    // stateはすぐに更新されないことがあるため
    const newTagList = tagList
      .normalize("NFKC")
      .replace(/(^\s+)|(\s+$)/g, "")
      .replace(/(\s{2,})/g, " ")
      .split(" ");
    const pastTagListArray = pastTagList
      .normalize("NFKC")
      .replace(/(^\s+)|(\s+$)/g, "")
      .replace(/(\s{2,})/g, " ")
      .split(" ");
    // 重複要素を削除
    const nonDuplicatedTagList = [...new Set(newTagList)];
    // ログイン済みでバリデーションOKの場合Firestoreに保存
    if (currentUser != null && canPost) {
      let productId = "";
      if (editProductId) {
        const differenceReduceTagList = pastTagListArray.filter((i) => nonDuplicatedTagList.indexOf(i) === -1);
        const differenceIncreaseTagList = nonDuplicatedTagList.filter((i) => pastTagListArray.indexOf(i) === -1);

        if (differenceReduceTagList.length !== 0) {
          differenceReduceTagList.forEach((tag) => {
            const tmpReduceTagNum = reduceTagNum(tag);
          });
        }

        productId = await editProduct(
          editProductId,
          title,
          abstract,
          iconUrl,
          githubUrl,
          productUrl,
          nonDuplicatedTagList,
          mainText,
          currentUser.uid,
          differenceIncreaseTagList
        );
      } else {
        productId = await postProduct(
          title,
          abstract,
          iconUrl,
          githubUrl,
          productUrl,
          nonDuplicatedTagList,
          mainText,
          currentUser.uid
        );
      }

      if (productId) {
        history.push("/");
      } else {
        // eslint-disable-next-line no-alert
        alert("投稿処理に失敗しました");
      }
    }
  };

  useEffect(() => {
    if (location.state && (location.state as { productId?: string }).productId) {
      const currentProductId = (location.state as { productId: string }).productId;
      setEditProductId(currentProductId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tmpProductData = fetchProduct(currentProductId).then((productData) => {
        if (productData) {
          setTitle(productData.productTitle);
          setAbstract(productData.productAbstract);
          setIconUrl(productData.productIconUrl);
          setGithubUrl(productData.githubUrl);
          setProductUrl(productData.productUrl);
          setTagList((productData.tagList as string[]).join(" "));
          setPastTagList((productData.tagList as string[]).join(" "));
          setMainText(productData.mainText);
        }
      });
    }
  }, [location.state]);

  return (
    <Stack spacing={{ base: "4", md: "2" }} pt="8">
      <HStack align="center">
        <Stack w={{ base: "40%", sm: "30%", md: "20%" }} justify="center" alignItems="center">
          {/* 画像はstateの変数から読み込む */}
          {iconUrl ? (
            <>
              <Image w="100%" fit="cover" src={iconUrl} />
              {/* inputの代わりのアイコン変更用ボタン */}
              <Button
                variant="outline"
                flexDir="row"
                w="100%"
                h="100%"
                py="2"
                fontSize="sm"
                onClick={onClickIconButton}
              >
                <Text>アイコン選択</Text>
                <Text textColor="red">*</Text>
              </Button>
            </>
          ) : (
            <Button
              w={{ base: "24", sm: "28", md: "32" }}
              h={{ base: "24", sm: "28", md: "32" }}
              variant="outline"
              flexDir="column"
              onClick={onClickIconButton}
            >
              <Icon as={BsImage} boxSize="8" />
              <Stack flexDir="row" alignItems="end" fontSize="sm">
                <Text>アイコン選択</Text>
                <Text textColor="red">*</Text>
              </Stack>
            </Button>
          )}
          {/* 画像アップロード用のhidden属性を付与したinput */}
          {/* アイコン選択ボタンをクリックするとinputもクリックされる */}
          <input hidden ref={iconInputRef} type="file" accept="image/*" onChange={handleIcon} />
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
          <FormControl isRequired isInvalid={validTitle} w="100%" h="60%">
            <FormLabel>作品タイトル</FormLabel>
            <Input fontSize="xl" variant="flushed" value={title} onChange={handleTitle} />
            {validTitle && <FormErrorMessage>作品タイトルを入力してください。</FormErrorMessage>}
          </FormControl>
          <FormControl isRequired isInvalid={validAbstract} w="100%" h="40%">
            <FormLabel fontSize={{ base: "sm", sm: "md" }}>この作品を一言で表すと？</FormLabel>
            <Input variant="flushed" value={abstract} onChange={handleAbstract} />
            {validAbstract && <FormErrorMessage>作品概要を入力してください。</FormErrorMessage>}
          </FormControl>
        </Stack>
      </HStack>
      {/* GitHubリンク入力欄 */}
      <Stack flexDir={{ base: "column", md: "row" }} pl="2">
        <GithubIcon w={{ base: "100%", md: "18%" }} ml={{ base: "0", sm: "2", md: "4", lg: "6" }} />
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
        <ProductIcon w={{ base: "100%", md: "18%" }} ml={{ base: "0", sm: "2", md: "4", lg: "6" }} />
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
          w={{ base: "100%", md: "18%" }}
          ml={{ base: "0", sm: "2", md: "4", lg: "6" }}
          pb={{ base: "0", md: "2" }}
        />
        <FormControl isInvalid={validTagList} w={{ base: "100%", md: "80%" }}>
          <Input variant="flushed" value={tagList} onChange={handleTagList} />
          {validTagList ? (
            <FormErrorMessage>
              タグはスペースで区切って5つまで入力してください（例：Webアプリ JavaScript）
            </FormErrorMessage>
          ) : (
            <FormHelperText>タグはスペースで区切って5つまで入力してください（例：Webアプリ JavaScript）</FormHelperText>
          )}
        </FormControl>
      </Stack>
      <MarkdownForm
        pageType="post"
        text={mainText}
        validText={validMainText}
        handleText={handleMainText}
        handlePost={handlePost}
        setText={setMainText}
      />
    </Stack>
  );
};

export default Post;
