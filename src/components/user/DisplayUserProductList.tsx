import React, { useState, useContext, useEffect } from "react";
import {
  HStack,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";
import { fetchProductsUserPosted } from "../../firebase/firestore";
import { DisplayProduct } from "../index";

export const DisplayUserProductList = (): JSX.Element => {
  const [productDataPosted, setProductDataPosted] =
    useState<QuerySnapshot<DocumentData>>();

  const { currentUser } = useContext(AuthContext);

  // 投稿済み作品の情報の取得
  useEffect(() => {
    if (currentUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tmp = fetchProductsUserPosted(currentUser.uid).then((data) => {
        setProductDataPosted(data);
      });
    }
  }, [currentUser]);

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
          {/* <Tab
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
            </Tab> */}
        </TabList>
        <TabPanels w="100%">
          <TabPanel>
            {/* 作品一覧の表示 */}
            <SimpleGrid
              w="100%"
              columns={[1, null, 2]}
              spacingX="50px"
              spacingY="50px"
              justifyItems="center"
            >
              {productDataPosted &&
                productDataPosted.docs.map(
                  (eachObjData: QueryDocumentSnapshot) => (
                    <DisplayProduct
                      productId={eachObjData.id}
                      productIconUrl={
                        eachObjData.data().productIconUrl as string
                      }
                      // userIconUrl={userIconUrl}
                      // userName={userName}
                      productTitle={eachObjData.data().productTitle as string}
                      productAbstract={
                        eachObjData.data().productAbstract as string
                      }
                      postDate={eachObjData.data().postDate as string}
                      // editDate={eachObjData.data().editDate as string}
                      sumLike={eachObjData.data().sumLike as number}
                    />
                  )
                )}
            </SimpleGrid>
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
