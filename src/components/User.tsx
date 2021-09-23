import React, { useState, useContext } from "react";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Button,
  Text,
  IconButton,
  Wrap,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { DocumentSnapshot, DocumentData } from "firebase/firestore";
import { setCommentRange } from "typescript";
import { AuthContext } from "../auth/AuthProvider";
import { fetchUserInfo } from "../firebase/firestore";

const User = (): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [userIconUrl, setUserIconUrl] = useState("");
  const [userComment, setUserComment] = useState("");

  const { currentUser } = useContext(AuthContext);

  if (currentUser != null) {
    const tmp = fetchUserInfo(currentUser.uid).then(
      (userInfo: DocumentSnapshot<DocumentData>) => {
        if (userInfo) {
          setUserName(userInfo.data().name);
          setUserIconUrl(userInfo.data().userIcon);
          setUserComment(userInfo.data().comment);
        }
      }
    );
  }

  return (
    <VStack spacing={10} alignItems="flex-start">
      {/* ユーザー情報の部分 */}
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
            />
            <IconButton
              aria-label="Twitter Icon"
              icon={<AiOutlineTwitter />}
              size="lg"
              variant="ghost"
              colorScheme="twitter"
            />
            <IconButton
              aria-label="Other Icon"
              icon={<AiOutlinePlusCircle />}
              size="lg"
              variant="ghost"
            />
          </Wrap>
        </VStack>
        {/* 追加機能をする際のスペース */}
        <Box w="55%" h="200px" alignSelf="flex-start" />
      </HStack>
      {/* 作品の表示条件の選択 */}
      <HStack w="100%" spacing={10}>
        <Tabs variant="unstyled">
          <TabList pt="2">
            <Tab
              rounded="full"
              fontSize={{ base: "sm", md: "md" }}
              _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
            >
              投稿済み
            </Tab>
            <Tab
              rounded="full"
              fontSize={{ base: "sm", md: "md" }}
              _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
            >
              フィードバック
            </Tab>
            <Tab
              rounded="full"
              fontSize={{ base: "sm", md: "md" }}
              _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
            >
              いいね
            </Tab>
          </TabList>
          <TabPanels w="100%" shadow="md" borderWidth="1px">
            {/* 作品の表示 */}
            {/* <SimpleGrid w="100%" columns={1, null, 2} spacing={10}>
                  <DisPlayProduct />
                </SimpleGrid> */}
            <TabPanel p="0" pt="4">
              投稿済み
            </TabPanel>
            <TabPanel p="0" pt="4">
              フィードバック
            </TabPanel>
            <TabPanel p="0" pt="4">
              いいね
            </TabPanel>
          </TabPanels>
        </Tabs>
      </HStack>
    </VStack>
  );
};

export default User;
