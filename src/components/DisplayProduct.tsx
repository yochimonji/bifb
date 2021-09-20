import React from "react";
import {
  Button,
  HStack,
  VStack,
  Box,
  Image,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { Like } from "./index";

const DisplayProduct = (): JSX.Element => (
  <Button
    w="100%"
    minWidth="350px"
    maxWidth="400px"
    h="235px"
    border="1px"
    borderColor="black"
    backgroundColor="white"
  >
    <HStack w="100%" spacing={0} alignItems="flex-start">
      <VStack w="36%" h="230px" spacing={0}>
        <Image
          w="100%"
          h="161px"
          src="https://bit.ly/sage-adebayo"
          boxsize="100px"
          padding="20px 10px"
        />
        <HStack w="100%" h="69px" spacing={0}>
          <Avatar w="30%" src="https://bit.ly/broken-link" size="sm" />
          <Text
            w="70%"
            fontSize="md"
            textAlign="center"
            padding="15px 0px 15px"
          >
            yochimonji
          </Text>
        </HStack>
      </VStack>

      <VStack w="64%" h="230px" spacing="0px">
        <Text
          w="100%"
          h="69px"
          fontSize="2xl"
          padding="15px 10px 10px 0px"
          textAlign="left"
          whiteSpace="pre-wrap"
        >
          ラクスケ
        </Text>
        <Text
          w="100%"
          h="115px"
          fontSize="lg"
          padding="10px 10px 10px 0px"
          textAlign="left"
          whiteSpace="pre-wrap"
        >
          神アプリ！ぜひ使ってねー！
        </Text>
        <HStack w="100%" h="46px" spacing="0px">
          <VStack w="60%" h="46px" spacing="0px">
            <Text
              w="100%"
              h="23px"
              fontSize="xs"
              textAlign="left"
              padding="5px 5px 5px 0px"
              whiteSpace="pre-wrap"
            >
              2021年8月28日作成
            </Text>
            <Text
              w="100%"
              h="23px"
              fontSize="xs"
              textAlign="left"
              padding="5px 5px 5px 0px"
              whiteSpace="pre-wrap"
            >
              2021年9月10日更新
            </Text>
          </VStack>
          <Box w="40%" h="46px">
            <Like />
          </Box>
        </HStack>
      </VStack>
    </HStack>
  </Button>
);

export default DisplayProduct;
