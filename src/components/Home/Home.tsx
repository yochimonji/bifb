import React, { useState, useEffect } from "react";
import { HStack, VStack, Box, Select, SimpleGrid } from "@chakra-ui/react";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { fetchProducts } from "../../firebase/firestore";
import { DisplayProducts, DisplayProduct, DisplayTags } from "../index";

const Home = (): JSX.Element => {
  const [sortType, setSortType] = useState("TREND");
  const [productData, setProductData] = useState<QuerySnapshot | undefined>();

  // sortTypeの選択の変更を認識する関数
  const onChangeSortType: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSortType(event.target.value);
  };

  // 作品データの取得
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmpProductData = fetchProducts(sortType, "Desc").then(
      (data: QuerySnapshot<DocumentData>) => {
        setProductData(data);
      }
    );
  }, [sortType]);

  return (
    <VStack spacing={10} align="stretch">
      <HStack w="100%" spacing="0px" alignItems="center" flexWrap="wrap">
        <Box w="10%" padding="37px 20px 35px 0px" minW="90px">
          検索条件:
        </Box>
        <DisplayTags />
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
      <DisplayProducts prodactData={productData} />
    </VStack>
  );
};
export default Home;
