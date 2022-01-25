import React, { useState, useEffect } from "react";
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
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";

import { fetchUserInfo } from "../../firebase/firestore";

type DisplayUserProductListProps = {
  displayedUserUid: string;
};

export const DisplayUserInfo = (
  props: DisplayUserProductListProps
): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [userIconUrl, setUserIconUrl] = useState("");
  const [userComment, setUserComment] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  // ユーザー情報の取得
  useEffect(() => {
    // eslint-disable-next-line no-void
    void (async () => {
      const userInfo = await fetchUserInfo(props.displayedUserUid);
      if (!userInfo) return;
      setUserName(userInfo.name);
      setUserIconUrl(userInfo.userIcon);
      setUserComment(userInfo.comment);
      setGithubUrl(userInfo.githubUrl);
      setTwitterUrl(userInfo.twitterUrl);
    })();
  }, [props.displayedUserUid]);

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

export default DisplayUserInfo;
