import React, { useContext, useEffect, useRef, useState } from "react";
import {
  VStack,
  Stack,
  Avatar,
  Input,
  Textarea,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { getStorage, ref, deleteObject, getDownloadURL } from "firebase/storage";

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
  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  const [feedbackList, setFeedbackList] = useState<string[]>([]);
  const [validUserName, setValidUserName] = useState(false);
  const [validGithubUrl, setValidGithubUrl] = useState(false);
  const [validTwitterUrl, setValidTwitterUrl] = useState(false);

  const { currentUser, setIsReload } = useContext(AuthContext);
  const userIconRef = useRef<HTMLInputElement>(null);
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
      setFavoriteList(userInfo.favoriteList);
      setFeedbackList(userInfo.feedbackList);
    })();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;

    // 入力値のバリデーション
    let canPost = true;
    if (!userName) {
      canPost = false;
      setValidUserName(true);
    } else {
      setValidUserName(false);
    }
    if (githubUrl && !/^(https:\/\/github.com\/)/.exec(githubUrl)) {
      canPost = false;
      setValidGithubUrl(true);
    } else {
      setValidGithubUrl(false);
    }
    if (twitterUrl && !/^(https:\/\/twitter.com\/)/.exec(twitterUrl)) {
      canPost = false;
      setValidTwitterUrl(true);
    } else {
      setValidTwitterUrl(false);
    }

    if (canPost) {
      await postUserInfo(
        userName,
        userIconUrl,
        userComment,
        githubUrl,
        twitterUrl,
        otherUrl,
        favoriteList,
        feedbackList,
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
  const handleIcon: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
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
      favoriteList,
      feedbackList,
      currentUser.uid
    );
    setIsReload(true);
  };

  return (
    <VStack spacing="4" mb="8">
      <Stack w="100%" spacing="0" mt="8" direction={{ base: "column", md: "row" }}>
        <VStack w="20%" minW="120px" padding="5px 10px 0px 0px" mb="4" alignSelf={{ base: "center", md: "flex-start" }}>
          <Avatar src={userIconUrl} size="xl" />
          <Button colorScheme="black" variant="outline" size="sm" onClick={onClickChangeIcon}>
            画像変更
          </Button>
          {/* 画像アップロード用のhidden属性を付与したinput */}
          {/* 下のButtonをクリックするとinputもクリックされる */}
          <input hidden ref={userIconRef} type="file" accept="image/*" onChange={handleIcon} />
        </VStack>
        <Stack w={{ base: "100%", md: "80%" }} spacing="4" minW="200px" minH="150px" alignSelf="flex-start">
          <FormControl isRequired isInvalid={validUserName} w="100%" minH="50px">
            <FormLabel>ユーザー名</FormLabel>
            <Input fontSize="xl" value={userName} onChange={(e) => setUserName(e.target.value)} />
            {validUserName && <FormErrorMessage>ユーザー名を入力してください。</FormErrorMessage>}
          </FormControl>
          <FormControl>
            <FormLabel>自己紹介</FormLabel>
            <Textarea
              w="100%"
              minH="50px"
              fontSize="md"
              rows={4}
              resize="none"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
          </FormControl>
        </Stack>
      </Stack>
      {/* GitHubリンク入力欄 */}
      <Stack flexDir={{ base: "column", md: "row" }} w="100%">
        <GithubIcon w={{ base: "100%", md: "20%" }} minW="120px" justify={{ base: "flex-start", md: "center" }} />
        <FormControl w={{ base: "100%", md: "80%" }}>
          <Input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
          {validGithubUrl && (
            <FormHelperText color="red" pl="4">
              https://github.com/[ユーザー名]
            </FormHelperText>
          )}
        </FormControl>
      </Stack>
      {/* Twitterリンク入力欄 */}
      <Stack flexDir={{ base: "column", md: "row" }} w="100%">
        <TwitterIcon w={{ base: "100%", md: "20%" }} minW="120px" justify={{ base: "flex-start", md: "center" }} />
        <FormControl w={{ base: "100%", md: "80%" }}>
          <Input type="url" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} />
          {validTwitterUrl && (
            <FormHelperText color="red" pl="4">
              https://twitter.com/[ユーザー名]
            </FormHelperText>
          )}
        </FormControl>
      </Stack>
      <Button bg="#99CED4" textColor="gray.100" fontSize="xl" w="24" h="12" shadow="md" onClick={handleSave}>
        保存
      </Button>
    </VStack>
  );
};

export default UserEdit;
