import React, { useContext, useEffect, useState } from "react";
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
// import { useLocation } from "react-router-dom";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";
// import loadImage from "blueimp-load-image";

// import app from "../base";

// const storage = getStorage(app);

import { fetchUserInfo, postUserInfo } from "../../firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";
import { GithubIcon, TwitterIcon } from "..";

const UserEdit = (): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [userIconUrl, setUserIconUrl] = useState("");
  const [userComment, setUserComment] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [otherUrl, setOtherUrl] = useState("");
  const [giveLike, setGiveLike] = useState<string[]>([]);
  const [giveFeedback, setGiveFeedback] = useState<string[]>([]);

  const { currentUser } = useContext(AuthContext);

  const toast = useToast();

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
    toast({
      title: "保存しました!",
      status: "success",
    });
  };

  return (
    <VStack spacing="4">
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
          alignSelf="flex-start"
        >
          <Avatar src={userIconUrl} size="xl" />
        </VStack>
        <Stack
          w={{ base: "100%", sm: "90%" }}
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

// 初回にユーザー登録時にgoogleアカウントの画像をFirebase Storageに登録する処理を実装しようとしたが、セキュリティ上の問題で実装できなかった
// https://developer.mozilla.org/ja/docs/Web/HTML/CORS_enabled_image
// 関数自体はほぼそのまま使えるため置いておく
// 古いuserIconを削除する処理が未実装
// const [iconUrl, setIconUrl] = useState("");
// const postUserIcon = async () => {
//   if (currentUser != null && currentUser) {
//     const fileName = `user_icon/${uuidv4()}.jpeg`;
//     const loadIcon = await loadImage(currentUser.photoURL as string, {
//       maxHeight: 128,
//       maxWidth: 128,
//       crop: true,
//       canvas: true,
//     });
//     console.log(loadIcon);
//     const canvasIcon = loadIcon.image as HTMLCanvasElement;

//     const fileRef = ref(storage, fileName);
//     canvasIcon.toBlob(
//       // eslint-disable-next-line @typescript-eslint/no-misused-promises
//       async (blobIcon) => {
//         if (blobIcon) {
//           await uploadBytes(fileRef, blobIcon).catch(() => {
//             console.log(`アイコンのアップロードに失敗しました。`);
//           });
//           const downloadUrl = await getDownloadURL(fileRef);
//           setIconUrl(downloadUrl);
//         }
//       },
//       "image/jpeg",
//       0.95
//     );
//   }
// };
