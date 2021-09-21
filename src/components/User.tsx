import React from "react";
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
} from "@chakra-ui/react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlinePlusCircle,
} from "react-icons/ai";

const User = (): JSX.Element => (
  <VStack spacing={10} alignItems="flex-start">
    {/* ユーザー情報の部分 */}
    <HStack w="100%" spacing="0">
      <VStack
        w="10%"
        minW="120px"
        padding="5px 10px 0px 0px"
        alignSelf="flex-start"
      >
        <Avatar src="https://bit.ly/broken-link" size="xl" />
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
          yochimonji
        </Text>
        <Text w="100%" minH="50px" fontSize="md" padding="10px 15px 10px 0px">
          よろしくお願いします。
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
      </Tabs>
    </HStack>

    {/* 作品の表示 */}
    <Box w="100%" shadow="md" borderWidth="1px">
      作品の表示欄 作品の表示関数はmerge前であるため未実装
      ただし、以下のコメントアウトの部分でおそらく実行可能
    </Box>
    {/* <SimpleGrid
        w="100%"
        columns={[1, null, 2]}
        spacingX="50px"
        spacingY="50px"
        justifyItems="center"
       />     */}
  </VStack>
);

export default User;
