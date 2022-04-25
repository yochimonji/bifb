import React, { useState, useEffect } from "react";
import { HStack, TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import { fetchProductsUser, fetchUserInfos } from "../../firebase-com/firestore";
import DisplayProductProps from "../common_part/DisplayProductProps";
import DisplayProducts from "../common_part/DisplayProducts";

/**
 * 作品データを取得・フォーマットする関数
 * @param userUid 表示したいユーザーのuid
 * @param tabType 投稿済み・いいね・フィードバック
 * @returns
 */
const fetchNewProductData = async (
  userUid: string,
  tabType: "posted" | "favorite" | "feedback"
): Promise<DisplayProductProps[] | null> => {
  const userUidSet: Set<string> = new Set();
  const newProducts: DisplayProductProps[] = [];

  const products = await fetchProductsUser(userUid, tabType);
  if (!products) return null;

  products.forEach((product) => {
    userUidSet.add(product.data().userUid);
  });
  const userInfos = await fetchUserInfos([...userUidSet]);
  if (!userInfos) return null;

  products.forEach((product) => {
    userInfos.forEach((userInfo) => {
      const p = product.data();
      const u = userInfo.data();
      if (p.userUid === u.userUid) {
        newProducts.push({
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
    });
  });
  return newProducts;
};

type DisplayUserProductListProps = {
  displayedUserUid: string;
};

const DisplayUserProductList = (props: DisplayUserProductListProps): JSX.Element => {
  const [productsPosted, setProductsPosted] = useState<DisplayProductProps[]>([]);
  const [productsFavorite, setProductsFavorite] = useState<DisplayProductProps[]>([]);
  const [productsFeedback, setProductsFeedback] = useState<DisplayProductProps[]>([]);
  const [isClickFavorite, setIsClickFavorite] = useState(false);
  const [isClickFeedback, setIsClickFeedback] = useState(false);

  // 投稿済み作品の情報の取得
  useEffect(() => {
    // 即時関数を使って非同期でプロダクトデータを読み込む
    // eslint-disable-next-line no-void
    void (async () => {
      const newProductsPosted = await fetchNewProductData(props.displayedUserUid, "posted");
      if (newProductsPosted) setProductsPosted(newProductsPosted);
    })();
  }, [props.displayedUserUid]);

  // 初めにクリックした時だけ作品データを読み込む
  // 無駄な通信を抑える
  const onClickFavorite = async () => {
    if (isClickFavorite) return;
    setIsClickFavorite(true);
    const newProductsFavorite = await fetchNewProductData(props.displayedUserUid, "favorite");
    if (newProductsFavorite) setProductsFavorite(newProductsFavorite);
  };

  const onClickFeedback = async () => {
    if (isClickFeedback) return;
    setIsClickFeedback(true);
    const newProductsFeedback = await fetchNewProductData(props.displayedUserUid, "feedback");
    if (newProductsFeedback) setProductsFeedback(newProductsFeedback);
  };

  return (
    <HStack w="100%" spacing={10}>
      <Tabs variant="unstyled">
        <TabList>
          <Tab rounded="full" fontSize={{ base: "sm", md: "md" }} _selected={{ color: "#FCFCFC", bg: "#99CED4" }}>
            投稿済み
          </Tab>
          <Tab
            rounded="full"
            fontSize={{ base: "sm", md: "md" }}
            _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
            onClick={onClickFavorite}
          >
            いいね
          </Tab>
          <Tab
            rounded="full"
            fontSize={{ base: "sm", md: "md" }}
            _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
            onClick={onClickFeedback}
          >
            フィードバック
          </Tab>
        </TabList>
        <TabPanels w="100%">
          <TabPanel>
            {/* 作品一覧の表示 */}
            <DisplayProducts {...productsPosted} />
          </TabPanel>
          <TabPanel p="0" pt="4">
            <DisplayProducts {...productsFavorite} />
          </TabPanel>
          <TabPanel p="0" pt="4">
            <DisplayProducts {...productsFeedback} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </HStack>
  );
};

export default DisplayUserProductList;
