import React from "react";
import { HStack, VStack, Box, Image, Avatar, Text } from "@chakra-ui/react";
import { TiHeart } from "react-icons/ti";
import { Like } from "./index";

const DisplayProduct = (): JSX.Element => (
  <Box shadow="md" boederWidth="1px" flex="1" borderRadius="md">
    <HStack spacing={0}>
      <VStack w="30%" spacing={0}>
        <Image
          w="100%"
          src="https://bit.ly/sage-adebayo"
          boxsize="100px"
          padding="10px"
          alignItems="center"
        />
        <HStack w="100%" spacing={0}>
          <Avatar w="30%" src="https://bit.ly/broken-link" />
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
      <Box w="70%">
        <Text w="100%" textAlign="left" padding="12.5px" fontSize="2xl">
          ラクスケ
        </Text>

        <Text
          w="100%"
          textAlign="left"
          fontSize="3vmin"
          justfy="left"
          minWidth="50%"
        >
          予定に合わせて自動でタスクを登録するアプリ予定に合わせて自動でタスクを登録するアプリ
        </Text>

        <HStack w="100%" spacing={0}>
          <VStack w="80%" spacing={0} bg="blue.50">
            <Box w="100%" />
            <Text
              w="100%"
              textAlign="center"
              fontSize="sm"
              padding="1px"
              justfy="center"
            >
              2021年08月28日公開
            </Text>
            <Text
              w="100%"
              textAlign="center"
              fontSize="sm"
              padding="1px"
              justfy="center"
            >
              2021年09月10日更新
            </Text>
          </VStack>

          <VStack w="20%" spacing={0}>
            <Like />
          </VStack>
        </HStack>
      </Box>
    </HStack>
  </Box>
);

export default DisplayProduct;
