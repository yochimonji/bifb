import React, { useState, useEffect } from "react";
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
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { fetchProducts, fetchUserInfo } from "../firebase/firestore";
import { DisplayProduct } from "./index";

const Home = (): JSX.Element => {
  const [sortType, setSortType] = useState("TREND");
  const [productData, setProductData] = useState<QuerySnapshot | undefined>();
  const userName = "一氏良仁";
  const userIconUrl =
    "https://lh3.googleusercontent.com/a-/AOh14GhbShOrlnc53QCIhotYyqXVkDJJE3voTINNU3yV=s96-c";

  // sortTypeの選択の変更を認識する関数
  const onChangeSortType: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSortType(event.target.value);
  };

  // 作品データの取得
  useEffect(() => {
    const tmpProductData = fetchProducts(sortType, "Desc").then(
      (data: QuerySnapshot<DocumentData> | undefined) => {
        setProductData(data);
      }
    );
  }, [sortType]);

  console.log(sortType);

  return (
    <VStack spacing={10} align="stretch">
      {/* 上段(検索条件・トレンド等の選択) */}
      <HStack w="100%" spacing="0px" alignItems="center" flexWrap="wrap">
        <Box w="10%" padding="37px 20px 35px 0px" minW="90px">
          検索条件:
        </Box>
        <HStack w="70%" textAlign="center" spacing={4} minW="450px">
          {[].map((tag) => (
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
          ))}
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
        {productData &&
          productData.docs.map(
            (eachObjData: QueryDocumentSnapshot<DocumentData>) => (
              <DisplayProduct
                productId={eachObjData.id}
                productIconUrl={eachObjData.data().productIconUrl as string}
                userIconUrl={userIconUrl}
                userName={userName}
                productTitle={eachObjData.data().productTitle as string}
                productAbstract={eachObjData.data().productAbstract as string}
                postDate={eachObjData.data().postDate as string}
                editDate={eachObjData.data().editDate as string}
                sumLike={eachObjData.data().sumLike as number}
              />
            )
          )}
      </SimpleGrid>
    </VStack>
  );
};
export default Home;
