// XXX: state 周りのために追加 消したい！！
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import { HStack, VStack, Box, Select } from "@chakra-ui/react";
import { RootStateOrAny, useSelector } from "react-redux";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import { fetchProducts, fetchUserInfos } from "../../firebase/firestore";
import { DisplayProducts, SearchCondition, DisplayProductProps } from "../index";

const Home = (): JSX.Element => {
  const [sortType, setSortType] = useState("NEW");
  const [productData, setProductData] = useState<DisplayProductProps[]>([]);
  const searchInputText = useSelector((state: RootStateOrAny) => state.paramInputText);
  const searchTagList = useSelector((state: RootStateOrAny) => state.paramSearchTag);
  const searchStatusFromStore = useSelector((state: RootStateOrAny) => state.paramSearchStatus);

  // sortTypeの選択の変更を認識する関数
  const onChangeSortType: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSortType(event.target.value);
  };

  // 作品データの取得
  useEffect(() => {
    // 即時関数を使って非同期でプロダクトデータを読み込む
    // eslint-disable-next-line no-void
    void (async () => {
      const userUidSet: Set<string> = new Set();
      const newProductData: DisplayProductProps[] = [];

      const products = (await fetchProducts(sortType)) as QuerySnapshot<DocumentData>;
      products.forEach((product) => {
        userUidSet.add(product.data().userUid);
      });
      const userInfos = await fetchUserInfos([...userUidSet]);

      if (userInfos) {
        products.forEach((product) => {
          userInfos.forEach((userInfo) => {
            const p = product.data();
            const u = userInfo.data();
            if (p.userUid === u.userUid) {
              if (searchStatusFromStore === "") {
                newProductData.push({
                  productId: product.id,
                  productIconUrl: p.productIconUrl as string,
                  userIconUrl: u.userIcon as string,
                  userName: u.name as string,
                  productTitle: p.productTitle as string,
                  productAbstract: p.productAbstract as string,
                  postDate: p.postDate as string,
                  editDate: p.editDate as string,
                  favoriteNum: p.favoriteNum as number,
                });
              } else if (searchStatusFromStore === "searchTag") {
                if (product.data().tagList.includes(searchTagList)) {
                  newProductData.push({
                    productId: product.id,
                    productIconUrl: p.productIconUrl as string,
                    userIconUrl: u.userIcon as string,
                    userName: u.name as string,
                    productTitle: p.productTitle as string,
                    productAbstract: p.productAbstract as string,
                    postDate: p.postDate as string,
                    editDate: p.editDate as string,
                    favoriteNum: p.favoriteNum as number,
                  });
                }
              } else if (searchStatusFromStore === "inputText") {
                if (product.data().productTitle.includes(searchInputText)) {
                  newProductData.push({
                    productId: product.id,
                    productIconUrl: p.productIconUrl as string,
                    userIconUrl: u.userIcon as string,
                    userName: u.name as string,
                    productTitle: p.productTitle as string,
                    productAbstract: p.productAbstract as string,
                    postDate: p.postDate as string,
                    editDate: p.editDate as string,
                    favoriteNum: p.favoriteNum as number,
                  });
                }
              }
            }
          });
        });
        setProductData(newProductData);
      }
    })();
  }, [sortType, searchTagList, searchInputText, searchStatusFromStore]);

  return (
    <VStack spacing={10} align="stretch" pt="4" pb="12">
      {/* 上段(検索条件・トレンド等の選択) */}
      <HStack w="100%" spacing="0px" alignItems="center" flexWrap="wrap">
        {searchStatusFromStore === "" ? (
          <Box w="80%" padding="37px 20px 35px 0px" minW="90px" />
        ) : (
          <>
            <Box w="10%" padding="37px 20px 35px 0px" minW="90px">
              検索条件:
            </Box>
            {searchStatusFromStore === "inputText" ? (
              <SearchCondition searchCondition={searchInputText} />
            ) : (
              <SearchCondition searchCondition={searchTagList} />
            )}
          </>
        )}
        <Box w="20%" padding="30px 0px">
          <Select name="sortType" onChange={onChangeSortType}>
            <option value="NEW">新着</option>
            <option value="FavoriteLarge">いいね数(多い順)</option>
            <option value="FavoriteSmall">いいね数(少ない順)</option>
            <option value="FeedbackLarge">フィードバック数(多い順)</option>
            <option value="FeedbackSmall">フィードバック数(少ない順)</option>
          </Select>
        </Box>
      </HStack>
      {/* 作品一覧の表示 */}
      <DisplayProducts {...productData} />
    </VStack>
  );
};
export default Home;
