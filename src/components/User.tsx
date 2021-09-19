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
} from "@chakra-ui/react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlinePlusCircle,
} from "react-icons/ai";

const User = (): JSX.Element => (
  <VStack spacing={10}>
    {/* ユーザー情報の部分 */}
    <HStack w="100%" spacing="0">
      <VStack w="15%" minW="100px">
        <Avatar src="https://bit.ly/broken-link" size="xl" padding="2px" />
        <Button colorScheme="black" variant="outline">
          編集
        </Button>
      </VStack>
      <VStack w="85%" spacing="0" minW="150px">
        <Text w="100%" fontSize="3xl">
          yochimonjiyochimonjiyochimonjiyochimonji
        </Text>
        <Text w="100%" fontSize="md" padding="10px 15px 10px 0px">
          よろしくお願いします。よろしくお願いします。よろしくお願いします。よろしくお願いします。よろしくお願いします。よろしくお願いします。よろしくお願いします。よろしくお願いします。
        </Text>
        <Wrap w="100%" alignItems="center">
          <IconButton
            aria-label="Github Icon"
            icon={<AiFillGithub />}
            size="lg"
          />
          <IconButton
            aria-label="Twitter Icon"
            icon={<AiOutlineTwitter />}
            size="lg"
          />
          <IconButton
            aria-label="Other Icon"
            icon={<AiOutlinePlusCircle />}
            size="lg"
          />
        </Wrap>
      </VStack>
      {/* 追加機能をする際のスペース */}
      {/* <Box w="30%" h="150px" bg="green.200" /> */}
    </HStack>
    {/* 作品の表示条件の選択 */}
    <HStack w="100%" spacing={10} align="center">
      <Button colorScheme="blackAlpha" variant="outline">
        投稿済み
      </Button>
      <Button colorScheme="blackAlpha" variant="outline">
        フィード－バック
      </Button>
      <Button colorScheme="blackAlpha" variant="outline">
        いいね
      </Button>
    </HStack>

    {/* 作品の表示 */}
    <Box w="100%" shadow="md" borderWidth="1px">
      作品の表示欄 作品の表示関数はmerge前であるため未実装
      ただし、以下のコメントアウトの部分でおそらく実行可能
    </Box>
    {/* <SimpleGrid w="100%" columns={1, null, 2} spacing={10}>
      <DisPlayProduct />
    </SimpleGrid> */}
  </VStack>
);

export default User;
