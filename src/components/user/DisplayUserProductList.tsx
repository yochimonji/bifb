import React, { useState, useEffect } from "react";
import {
  HStack,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import {
  fetchProductsUserPosted,
  fetchUserInfo,
} from "../../firebase/firestore";
import { DisplayProductProps, DisplayProducts } from "../index";

export const DisplayUserProductList = (): JSX.Element => {
  const [productDataPosted, setProductDataPosted] = useState<
    DisplayProductProps[]
  >([]);

  const location = useLocation();

  // 投稿済み作品の情報の取得
  useEffect(() => {
    // 即時関数を使って非同期でプロダクトデータを読み込む
    // eslint-disable-next-line no-void
    void (async () => {
      const displayedUserUid = (location.state as { userUid: string }).userUid;
      const displayedUserInfo = await fetchUserInfo(displayedUserUid);
      if (displayedUserInfo) {
        const postedList: DisplayProductProps[] = [];
        const postedData = await fetchProductsUserPosted(displayedUserUid);
        postedData.forEach((posted) => {
          const p = posted.data();
          postedList.push({
            productId: posted.id,
            productIconUrl: p.productIconUrl as string,
            userIconUrl: displayedUserInfo.userIcon as string,
            userName: displayedUserInfo.name as string,
            productTitle: p.productTitle as string,
            productAbstract: p.productAbstract as string,
            postDate: p.postDate as string,
            editDate: p.editDate as string,
            sumLike: p.sumLike as number,
          });
        });
        setProductDataPosted(postedList);
      }
    })();
  }, [location.state]);

  return (
    <HStack w="100%" spacing={10}>
      <Tabs variant="unstyled">
        <TabList>
          <Tab
            rounded="full"
            fontSize={{ base: "sm", md: "md" }}
            _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
          >
            投稿済み
          </Tab>
          <Tab
            rounded="full"
            fontSize={{ base: "sm", md: "md" }}
            _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
          >
            フィードバック
          </Tab>
          <Tab
            rounded="full"
            fontSize={{ base: "sm", md: "md" }}
            _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
          >
            いいね
          </Tab>
        </TabList>
        <TabPanels w="100%">
          <TabPanel>
            {/* 作品一覧の表示 */}
            <DisplayProducts {...productDataPosted} />
          </TabPanel>
          <TabPanel p="0" pt="4">
            フィードバック
          </TabPanel>
          <TabPanel p="0" pt="4">
            いいね
          </TabPanel>
        </TabPanels>
      </Tabs>
    </HStack>
  );
};

export default DisplayUserProductList;
