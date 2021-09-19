import React, { useState, useRef, useContext } from "react";
import {
  Input,
  HStack,
  Stack,
  Image,
  Button,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { BsImage } from "react-icons/bs";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import app from "../../base";
import { GithubIcon, ProductIcon, TagIcon, MarkdownForm } from "..";
import { postProduct } from "../../firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";

const storage = getStorage(app);

const Post = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [tags, setTags] = useState("");
  const [mainText, setMainText] = useState("");
  const [error, setError] = useState("");

  const iconInputRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useContext(AuthContext);

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
    if (event.target.files == null || event.target.files[0] == null) {
      setError("ファイルが選択されていません");
      setIconUrl("");
    } else {
      setError("");
      const icon = event.target.files[0];
      const newIconName = `icon/${uuidv4()}${icon.name.slice(
        icon.name.lastIndexOf(".")
      )}`;
      const iconRef = ref(storage, newIconName);

      await uploadBytes(iconRef, icon)
        .then(() => {
          setError("");
        })
        .catch((err) => {
          setError(`ファイルのアップに失敗しました。${err as string}`);
        });

      const downloadUrl = await getDownloadURL(iconRef);
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

  const handlePost: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const tagList = tags.split(" ");
    if (currentUser != null) {
      const productId = await postProduct(
        title,
        abstract,
        iconUrl,
        githubUrl,
        productUrl,
        tagList,
        mainText,
        currentUser.uid
      );
    }
  };

  return (
    <Stack>
      <HStack spacing="4" pt="8" align="start">
        <Stack>
          {/* minWにしないと横が潰れる */}
          {/* 画像はstateの変数から読み込む */}
          <Image minW="200px" h="200px" bg="gray.100" src={iconUrl} />
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
            leftIcon={<BsImage />}
            variant="ghost"
            onClick={onClickIconButton}
          >
            変更する
          </Button>
          {error && (
            <Text fontSize="sm" color="red" m="0">
              {error}
            </Text>
          )}
        </Stack>
        <Stack w="100%" h="200px" pt="4">
          <FormControl id="title" isRequired w="100%" h="60%">
            <FormLabel>作品タイトル</FormLabel>
            <Input
              fontSize="xl"
              variant="flushed"
              value={title}
              onChange={handleTitle}
            />
          </FormControl>
          <FormControl id="abstract" isRequired w="100%" h="40%">
            <FormLabel>この作品を一言で表すと？</FormLabel>
            <Input
              variant="flushed"
              value={abstract}
              onChange={handleAbstract}
            />
          </FormControl>
        </Stack>
      </HStack>
      {/* GitHubリンク入力欄 */}
      <HStack spacing="4">
        <GithubIcon minW="200px" />
        <FormControl id="githubUrl" w="100%">
          <Input
            variant="flushed"
            type="url"
            placeholder="https://example.com"
            value={githubUrl}
            onChange={handleGithubUrl}
          />
        </FormControl>
      </HStack>
      {/* 作品リンク入力欄 */}
      <HStack spacing="4">
        <ProductIcon minW="200px" />
        <FormControl id="productUrl" w="100%">
          <Input
            variant="flushed"
            type="url"
            placeholder="https://example.com"
            value={productUrl}
            onChange={handleProductUrl}
          />
        </FormControl>
      </HStack>
      {/* 作品リンク入力欄 */}
      <HStack spacing="4" pb="4">
        <TagIcon minW="200px" />
        <FormControl id="tags" w="100%">
          <Input
            variant="flushed"
            placeholder="タグをスペースで区切って5つまで入力（例：Webアプリ JavaScript）"
            value={tags}
            onChange={handleTags}
          />
        </FormControl>
      </HStack>
      <MarkdownForm
        pageType="post"
        mainText={mainText}
        handleMainText={handleMainText}
        handlePost={handlePost}
      />
    </Stack>
  );
};

export default Post;
