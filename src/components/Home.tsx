import React, { useState } from "react";
import {
  HStack,
  VStack,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import { DisplayProduct } from "./index";

// 作品情報の表示
// 実際には、作品情報を変数として、テンプレート枠にその情報を埋め込んでいく

const Home = (): JSX.Element => {
  // Selectがどの状態にあるのかの把握
  const [sortType, setSortType] = useState("");

  // sortTypeの選択の変更を認識する関数
  const onChangeSortType: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSortType(event.target.value);
  };

  return (
    <VStack spacing={10} align="stretch">
      {/* 上段(検索条件・トレンド等の選択) */}
      <HStack w="100%" spacing="0px" alignItems="center" flexWrap="wrap">
        <Box w="10%" padding="37px 20px 35px 0px" minW="90px">
          検索条件:
        </Box>
        <HStack w="70%" textAlign="center" spacing={4} minW="450px">
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
        <Box w="20%" padding="30px 0px">
          <Select name="sortType" onChange={onChangeSortType}>
            <option value="TREND">トレンド</option>
            <option value="NEW">新着</option>
            <option value="LikeLarge">いいね数(多い順)</option>
            <option value="LikeSmall">いいね数(少ない順)</option>
          </Select>
        </Box>
      </HStack>

      {/* 作品一覧の表示 */}
      <SimpleGrid
        w="100%"
        columns={[1, null, 2]}
        spacingX="50px"
        spacingY="50px"
        justifyItems="center"
      >
        <DisplayProduct />
        <DisplayProduct />
        <DisplayProduct />
        <DisplayProduct />
      </SimpleGrid>
    </VStack>
  );
};
export default Home;
