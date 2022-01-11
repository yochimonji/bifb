import React, { useState, useEffect } from "react";
import {
  HStack,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";

import { fetchProductsUser, fetchUserInfos } from "../../firebase/firestore";
import { DisplayProductProps, DisplayProducts } from "../index";

type DisplayUserProductListProps = {
  displayedUserUid: string;
};

export const DisplayUserProductList = (
  props: DisplayUserProductListProps
): JSX.Element => {
  const [productDataPosted, setProductDataPosted] = useState<
    DisplayProductProps[]
  >([]);
  const [tabType, setTabType] = useState<"posted" | "like" | "feedback">(
    "posted"
  );

  // 投稿済み作品の情報の取得
  useEffect(() => {
    // 即時関数を使って非同期でプロダクトデータを読み込む
    // eslint-disable-next-line no-void
    void (async () => {
      const userUidSet: Set<string> = new Set();
      const newProductData: DisplayProductProps[] = [];

      const productData = await fetchProductsUser(
        props.displayedUserUid,
        tabType
      );
      productData.forEach((product) => {
        userUidSet.add(product.data().userUid);
      });
      const userInfos = await fetchUserInfos([...userUidSet]);

      if (userInfos) {
        productData.forEach((product) => {
          userInfos.forEach((userInfo) => {
            const p = product.data();
            const u = userInfo.data();
            if (p.userUid === u.userUid) {
              newProductData.push({
                productId: product.id,
                productIconUrl: p.productIconUrl as string,
                userIconUrl: u.userIcon as string,
                userName: u.name as string,
                productTitle: p.productTitle as string,
                productAbstract: p.productAbstract as string,
                postDate: p.postDate as string,
                editDate: p.editDate as string,
                sumLike: p.sumLike as number,
              });
            }
          });
        });
      }
      setProductDataPosted(newProductData);
    })();
  }, [props.displayedUserUid, tabType]);

  return (
    <HStack w="100%" spacing={10}>
      <Tabs variant="unstyled">
        <TabList>
          <Tab
            rounded="full"
            fontSize={{ base: "sm", md: "md" }}
            _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
            onClick={() => setTabType("posted")}
          >
            投稿済み
          </Tab>
          <Tab
            rounded="full"
            fontSize={{ base: "sm", md: "md" }}
            _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
            onClick={() => setTabType("like")}
          >
            いいね
          </Tab>
          <Tab
            rounded="full"
            fontSize={{ base: "sm", md: "md" }}
            _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
            onClick={() => setTabType("feedback")}
          >
            フィードバック
          </Tab>
        </TabList>
        <TabPanels w="100%">
          <TabPanel>
            {/* 作品一覧の表示 */}
            <DisplayProducts {...productDataPosted} />
          </TabPanel>
          <TabPanel p="0" pt="4">
            <DisplayProducts {...productDataPosted} />
          </TabPanel>
          <TabPanel p="0" pt="4">
            <DisplayProducts {...productDataPosted} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </HStack>
  );
};

export default DisplayUserProductList;
