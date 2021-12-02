import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Button,
  Text,
  IconButton,
  Wrap,
} from "@chakra-ui/react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { DocumentData } from "firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";
import { fetchUserInfo } from "../../firebase/firestore";

export const DisplayUserInfo = (): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [userIconUrl, setUserIconUrl] = useState("");
  const [userComment, setUserComment] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [otherUrl, setOtherUrl] = useState("");

  const { currentUser } = useContext(AuthContext);

  // ユーザー情報の取得
  useEffect(() => {
    if (currentUser !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tmpUserInfo = fetchUserInfo(currentUser.uid).then(
        (userInfo: DocumentData | undefined) => {
          if (userInfo) {
            setUserName(userInfo.name);
            setUserIconUrl(userInfo.userIcon);
            setUserComment(userInfo.comment);
            setGithubUrl(userInfo.githubUrl);
            setTwitterUrl(userInfo.twitterUrl);
            setOtherUrl(userInfo.otherUrl);
          }
        }
      );
    }
  }, [currentUser]);

  const GithubButtonClick = () => {
    if (githubUrl) {
      window.location.href = githubUrl;
    }
  };

  const TwitterButtonClick = () => {
    if (twitterUrl) {
      window.location.href = twitterUrl;
    }
  };

  const OtherButtonClick = () => {
    if (otherUrl) {
      window.location.href = otherUrl;
    }
  };

  return (
    <HStack w="100%" spacing="0">
      <VStack
        w="10%"
        minW="120px"
        padding="5px 10px 0px 0px"
        alignSelf="flex-start"
      >
        <Avatar src={userIconUrl} size="xl" />
        <Button colorScheme="black" variant="outline">
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
        <Text w="100%" minH="50px" fontSize="3xl">
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
            onClick={GithubButtonClick}
          />
          <IconButton
            id="TwitterButton"
            aria-label="Twitter Icon"
            icon={<AiOutlineTwitter />}
            size="lg"
            variant="ghost"
            colorScheme="twitter"
            onClick={TwitterButtonClick}
          />
          <IconButton
            id="OtherButton"
            aria-label="Other Icon"
            icon={<AiOutlinePlusCircle />}
            size="lg"
            variant="ghost"
            onClick={OtherButtonClick}
          />
        </Wrap>
      </VStack>
      {/* 追加機能をする際のスペース */}
      <Box w="55%" h="200px" alignSelf="flex-start" />
    </HStack>
  );
};

export default DisplayUserInfo;
