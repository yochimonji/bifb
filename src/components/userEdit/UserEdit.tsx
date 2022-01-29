import React, { useContext, useEffect, useRef, useState } from "react";
import {
  VStack,
  Stack,
  Avatar,
  Input,
  Textarea,
  Text,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";

import { useHistory } from "react-router-dom";
import { fetchUserInfo, postUserInfo } from "../../firebase/firestore";
import app from "../../base";
import { AuthContext } from "../../auth/AuthProvider";
import { GithubIcon, TwitterIcon, postImage } from "..";

const storage = getStorage(app);

const UserEdit = (): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [userIconUrl, setUserIconUrl] = useState("");
  const [userComment, setUserComment] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [otherUrl, setOtherUrl] = useState("");
  const [giveLike, setGiveLike] = useState<string[]>([]);
  const [giveFeedback, setGiveFeedback] = useState<string[]>([]);

  const { currentUser, setIsReload } = useContext(AuthContext);
  const userIconRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const history = useHistory();

  // ユーザー情報の取得
  useEffect(() => {
    // eslint-disable-next-line no-void
    void (async () => {
      if (!currentUser) return;
      const userInfo = await fetchUserInfo(currentUser.uid);
      if (!userInfo) return;
      setUserName(userInfo.name);
      setUserIconUrl(userInfo.userIcon);
      setUserComment(userInfo.comment);
      setGithubUrl(userInfo.githubUrl);
      setTwitterUrl(userInfo.twitterUrl);
      setOtherUrl(userInfo.otherUrl);
      setGiveLike(userInfo.giveLike);
      setGiveFeedback(userInfo.giveFeedback);
    })();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;

    if (!userName) {
      toast({
        title: "ユーザー名を入力してください。",
        status: "error",
      });
    } else {
      await postUserInfo(
        userName,
        userIconUrl,
        userComment,
        githubUrl,
        twitterUrl,
        otherUrl,
        giveLike,
        giveFeedback,
        currentUser.uid
      );
      setIsReload(true);
      history.push("/user", { userUid: currentUser.uid });
    }
  };

  /**
   * 画像変更ボタンクリックでRefのhidden属性の画像用inputタグをクリックする関数
   */
  const onClickChangeIcon: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (userIconRef.current != null) {
      userIconRef.current.click();
    }
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
      return;
    }

    if (!currentUser) return;

    // ファイルを選択し直した時に既存のファイルをStorageから削除
    // Firebase Storageに保存してあるファイルのURLは googleusercontent.com で始まる
    if (!/googleusercontent.com/.exec(userIconUrl) && userIconUrl !== "") {
      const oldIconRef = ref(storage, userIconUrl);
      await deleteObject(oldIconRef);
    }

    // FileをStorageに保存し、アイコン名とURLをstateにセット
    const icon = event.target.files[0];
    const newIconName = await postImage(icon, "user_icon", true);
    const newIconRef = ref(storage, newIconName);
    const downloadUrl = await getDownloadURL(newIconRef);
    setUserIconUrl(downloadUrl);

    await postUserInfo(
      userName,
      downloadUrl,
      userComment,
      githubUrl,
      twitterUrl,
      otherUrl,
      giveLike,
      giveFeedback,
      currentUser.uid
    );
    setIsReload(true);
  };

  return (
    <VStack spacing="4" mb="8">
      <Stack
        w="100%"
        spacing="0"
        mt="8"
        direction={{ base: "column", md: "row" }}
      >
        <VStack
          w="10%"
          minW="120px"
          padding="5px 10px 0px 0px"
          mb="4"
          alignSelf={{ base: "center", md: "flex-start" }}
        >
          <Avatar src={userIconUrl} size="xl" />
          <Button
            colorScheme="black"
            variant="outline"
            size="sm"
            onClick={onClickChangeIcon}
          >
            画像変更
          </Button>
          {/* 画像アップロード用のhidden属性を付与したinput */}
          {/* 下のButtonをクリックするとinputもクリックされる */}
          <input
            hidden
            ref={userIconRef}
            type="file"
            accept="image/*"
            onChange={handleIcon}
          />
        </VStack>
        <Stack
          w={{ base: "100%", md: "90%" }}
          spacing="4"
          minW="200px"
          minH="150px"
          alignSelf="flex-start"
        >
          <Box>
            <Text mb="2" pl="4">
              ユーザー名
            </Text>
            <Input
              w="100%"
              minH="50px"
              fontSize="xl"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Box>
          <Box>
            <Text mb="2" pl="4">
              自己紹介
            </Text>
            <Textarea
              w="100%"
              minH="50px"
              fontSize="md"
              rows={4}
              resize="none"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
          </Box>
        </Stack>
      </Stack>
      {/* GitHubリンク入力欄 */}
      <Stack flexDir={{ base: "column", md: "row" }} w="100%">
        <GithubIcon
          w={{ base: "100%", md: "10%" }}
          minW="120px"
          justify={{ base: "flex-start", md: "center" }}
        />
        <Input
          type="url"
          w={{ base: "100%", md: "90%" }}
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />
      </Stack>
      {/* Twitterリンク入力欄 */}
      <Stack flexDir={{ base: "column", md: "row" }} w="100%">
        <TwitterIcon
          w={{ base: "100%", md: "10%" }}
          minW="120px"
          justify={{ base: "flex-start", md: "center" }}
        />
        <Input
          type="url"
          w={{ base: "100%", md: "90%" }}
          value={twitterUrl}
          onChange={(e) => setTwitterUrl(e.target.value)}
        />
      </Stack>
      <Button
        bg="#99CED4"
        textColor="gray.100"
        fontSize="xl"
        w="24"
        h="12"
        shadow="md"
        onClick={handleSave}
      >
        保存
      </Button>
    </VStack>
  );
};

export default UserEdit;
