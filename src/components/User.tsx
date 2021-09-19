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
  SimpleGrid,
} from "@chakra-ui/react";
import { BsCircle } from "react-icons/bs";

const User = (): JSX.Element => (
  <VStack>
    {/* ユーザー情報の部分 */}
    <HStack w="100%" h="150px" bg="blue.50" spacing="0">
      <VStack w="15%" h="150px" bg="green.50">
        <Avatar src="https://bit.ly/broken-link" size="xl" padding="2px" />
        <Button colorScheme="black" variant="outline">
          編集
        </Button>
      </VStack>
      <VStack w="25%" h="150px" bg="green.100" spacing="0">
        <Text w="100%" h="50px" bg="blue.50" fontSize="3xl">
          yochimonji
        </Text>
        <Text
          w="100%"
          h="50px"
          bg="blue.100"
          fontSize="md"
          padding="10px 15px 10px 0px"
        >
          よろしくお願いします。
        </Text>
        <Wrap w="100%" h="50px" bg="blue.200">
          <IconButton aria-label="Search database" icon={<BsCircle />} />
          <IconButton aria-label="Search database" icon={<BsCircle />} />
          <IconButton aria-label="Search database" icon={<BsCircle />} />
        </Wrap>
      </VStack>
      {/* 追加機能をする際のスペース */}
      <Box w="60%" h="150px" bg="green.200" />
    </HStack>
    {/* 作品の表示条件の選択 */}
    <HStack w="100%" h="50px" spacing={10} align="center">
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
    <Box w="100%" h="300px" bg="blue.200">
      作品の表示欄
    </Box>
    {/* <SimpleGrid w="100%" columns={2} spacing={10}>
      <DisPlayProduct />
    </SimpleGrid> */}
  </VStack>
);

export default User;
