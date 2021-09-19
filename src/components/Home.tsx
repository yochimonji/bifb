import React from "react";
import {
  HStack,
  VStack,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Select,
  SimpleGrid,
  Image,
  Avatar,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { TiHeart } from "react-icons/ti";

// 作品情報の表示
// 実際には、作品情報を変数として、テンプレート枠にその情報を埋め込んでいく
function Product() {
  return (
    <Box
      height="210px"
      shadow="md"
      boederWidth="1px"
      flex="1"
      borderRadius="md"
    >
      <HStack spacing={0}>
        <VStack w="30%" h="210" spacing={0}>
          <Image
            w="100%"
            h="150px"
            src="https://bit.ly/sage-adebayo"
            boxsize="100px"
            padding="10px"
            alignItems="center"
          />
          <HStack w="100%" h="60px" spacing={0}>
            <Avatar w="30%" h="40px" src="https://bit.ly/broken-link" />
            <Text
              w="70%"
              h="60px"
              fontSize="md"
              textAlign="center"
              padding="15px 0px 15px"
            >
              yochimonji
            </Text>
          </HStack>
        </VStack>
        <Box w="70%" h="210px">
          <Text
            w="100%"
            h="70px"
            textAlign="left"
            padding="12.5px"
            fontSize="2xl"
          >
            ラクスケ
          </Text>

          <Text w="100%" h="70px" textAlign="left" fontSize="lg">
            予定に合わせて自動でタスクを登録するアプリ
          </Text>

          <HStack w="100%" h="70px" spacing={0}>
            <VStack w="80%" h="70px" spacing={0}>
              <Box w="100%" h="20px" />
              <Text w="100%" h="25px" textAlign="center" fontSize="sm">
                2021年08月28日公開
              </Text>
              <Text w="100%" h="25px" textAlign="center" fontSize="sm">
                2021年09月10日更新
              </Text>
            </VStack>

            <VStack w="20%" h="70px" spacing={0}>
              <Box w="100%" h="35px" />

              <HStack w="100%" h="35px" spacing={0}>
                <IconButton
                  w="50%"
                  h="35px"
                  alignItems="center"
                  aria-label="center"
                  size="xs"
                  backgroundColor="white"
                  icon={<TiHeart />}
                />

                <Text
                  w="50%"
                  h="35px"
                  textAlign="left"
                  padding={2}
                  fontSize="5px"
                >
                  10
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </HStack>
    </Box>
  );
}

const Home = (): JSX.Element => (
  <VStack spacing={10} align="stretch">
    {/* 上段(検索条件・トレンド等の選択) */}
    <HStack w="100%" h="100px" spacing="10px">
      <Box w="10%" h="100px" padding="37px 30px 35px 0px">
        検索条件:
      </Box>
      <HStack w="70%" textAlign="center" spacing={4}>
        {["React", "Typescript", "JavaScript", "C++", "Webアプリ"].map(
          (tag) => (
            <Tag
              size="lg"
              key="lg"
              borderRadius="full"
              variant="solid"
              bg="#DEEFF1"
              textColor="black"
              justfy="left"
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton />
            </Tag>
          )
        )}
      </HStack>
      <Box w="20%" h="100px" padding="30px 0px 35px 30px">
        <Select>
          <option value="TREND">トレンド</option>
          <option value="NEW">新着</option>
          <option value="LikeLarge">いいね数(多い順)</option>
          <option value="LikeLarge">いいね数(少ない順)</option>
        </Select>
      </Box>
    </HStack>

    {/* 作品一覧の表示 */}
    <SimpleGrid w="100%" h="600px" columns={2} spacing={10}>
      {Product()}
      {Product()}
      {Product()}
      {Product()}
    </SimpleGrid>
  </VStack>
);
export default Home;
