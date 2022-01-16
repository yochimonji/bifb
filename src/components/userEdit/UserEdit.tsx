import React, { useContext, useEffect, useState } from "react";
import {
  VStack,
  HStack,
  Avatar,
  Button,
  Text,
  IconButton,
  Wrap,
  Link,
} from "@chakra-ui/react";
// import { useLocation } from "react-router-dom";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";
// import loadImage from "blueimp-load-image";

// import app from "../base";

// const storage = getStorage(app);

import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";

import { fetchUserInfo } from "../../firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";

const UserEdit = (): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [userIconUrl, setUserIconUrl] = useState("");
  const [userComment, setUserComment] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  const { currentUser } = useContext(AuthContext);

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
    })();
  }, [currentUser]);

  return (
    <HStack w="100%" spacing="0" mt="8">
      <VStack
        w="10%"
        minW="120px"
        padding="5px 10px 0px 0px"
        alignSelf="flex-start"
      >
        <Avatar src={userIconUrl} size="xl" />
        <Button colorScheme="black" variant="outline" size="sm">
          編集
        </Button>
      </VStack>
      <VStack
        w="35%"
        spacing="0"
        minW="200px"
        minH="150px"
        alignSelf="flex-start"
      >
        <Text w="100%" minH="50px" fontSize="2xl">
          {userName}
        </Text>
        <Text w="100%" minH="50px" fontSize="md" padding="10px 15px 10px 0px">
          {userComment}
        </Text>
        <Wrap w="100%" minH="50px" alignItems="center">
          <IconButton
            aria-label="Github Icon"
            icon={<AiFillGithub />}
            size="lg"
            variant="ghost"
            as={Link}
            href={githubUrl}
          />
          <IconButton
            id="TwitterButton"
            aria-label="Twitter Icon"
            icon={<AiOutlineTwitter />}
            size="lg"
            variant="ghost"
            colorScheme="twitter"
            as={Link}
            href={twitterUrl}
          />
        </Wrap>
      </VStack>
    </HStack>
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
