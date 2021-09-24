import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Button,
  Text,
  IconButton,
  Wrap,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { AuthContext } from "../auth/AuthProvider";
import { fetchUserInfo, fetchProductsUserPosted } from "../firebase/firestore";
import { DisplayProduct } from "./index";

const User = (): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [userIconUrl, setUserIconUrl] = useState("");
  const [userComment, setUserComment] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [otherUrl, setOtherUrl] = useState("");
  const [searchType, setSearchType] = useState("POSTED");
  const [productDataPosted, setProductDataPosted] =
    useState<QuerySnapshot<DocumentData>>();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser !== null) {
      console.log(currentUser.uid);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tmpUserInfo = fetchUserInfo(currentUser.uid).then(
        (userInfo: DocumentData | undefined) => {
          if (userInfo) {
            setUserName(userInfo.name);
            setUserIconUrl(userInfo.userIcon);
            setUserComment(userInfo.comment);
            setGithubUrl(userInfo.githubUrl);
            setTwitterUrl(userInfo.twitterUrl);
            setOtherUrl(userInfo.otherUrl);
          }
        }
      );
    }
  }, [currentUser]);

  const GithubButtonClick = () => {
    if (githubUrl) {
      window.location.href = githubUrl;
    }
  };

  const TwitterButtonClick = () => {
    if (twitterUrl) {
      window.location.href = twitterUrl;
    }
  };

  const OtherButtonClick = () => {
    if (otherUrl) {
      window.location.href = otherUrl;
    }
  };

  // sortTypeの選択の変更を認識する関数
  const onChangesearchType: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setSearchType(event.target.value);
  };

  // 投稿済み選択時の作品データの取得
  useEffect(() => {
    if (currentUser) {
      if (searchType === "POSTED") {
        const tmp = fetchProductsUserPosted(currentUser.uid).then(
          (data: QuerySnapshot<DocumentData>) => {
            setProductDataPosted(data);
          }
        );
      }
    }
  }, [searchType, currentUser]);

  return (
    <VStack spacing={10} alignItems="flex-start">
      {/* ユーザー情報の部分 */}
      <HStack w="100%" spacing="0">
        <VStack
          w="10%"
          minW="120px"
          padding="5px 10px 0px 0px"
          alignSelf="flex-start"
        >
          <Avatar src={userIconUrl} size="xl" />
          <Button colorScheme="black" variant="outline">
            編集
          </Button>
        </VStack>
        <VStack
          w="35%"
          spacing="0"
          minW="200px"
          minH="150px"
          alignSelf="flex-start"
        >
          <Text w="100%" minH="50px" fontSize="3xl">
            {userName}
          </Text>
          <Text w="100%" minH="50px" fontSize="md" padding="10px 15px 10px 0px">
            {userComment}
          </Text>
          <Wrap w="100%" minH="50px" alignItems="center">
            <IconButton
              aria-label="Github Icon"
              icon={<AiFillGithub />}
              size="lg"
              variant="ghost"
              onClick={GithubButtonClick}
            />
            <IconButton
              id="TwitterButton"
              aria-label="Twitter Icon"
              icon={<AiOutlineTwitter />}
              size="lg"
              variant="ghost"
              colorScheme="twitter"
              onClick={TwitterButtonClick}
            />
            <IconButton
              id="OtherButton"
              aria-label="Other Icon"
              icon={<AiOutlinePlusCircle />}
              size="lg"
              variant="ghost"
              onClick={OtherButtonClick}
            />
          </Wrap>
        </VStack>
        {/* 追加機能をする際のスペース */}
        <Box w="55%" h="200px" alignSelf="flex-start" />
      </HStack>
      {/* 作品の表示条件の選択 */}
      <HStack w="100%" spacing={10}>
        <Tabs variant="unstyled">
          <TabList pt="2">
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
          <TabPanels w="100%" shadow="md" borderWidth="1px">
            <TabPanel p="0" pt="4">
              {/* 作品一覧の表示 */}
              {/* <SimpleGrid
                w="100%"
                columns={[1, null, 2]}
                spacingX="50px"
                spacingY="50px"
                justifyItems="center"
              >
                {productDataPosted &&
                  productDataPosted.docs.map(
                    (eachObjData: QueryDocumentSnapshot<DocumentData>) => (
                      <DisplayProduct
                        productIconUrl={
                          eachObjData.data().productIconUrl as string
                        }
                        userIconUrl={userIconUrl}
                        userName={userName}
                        productTitle={eachObjData.data().productTitle as string}
                        productAbstract={
                          eachObjData.data().productAbstract as string
                        }
                        postDate={eachObjData.data().postDate as string}
                        editDate={eachObjData.data().editDate as string}
                        sumLike={eachObjData.data().sumLike as number}
                      />
                    )
                  )}
                  
              </SimpleGrid> */}
              POST
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
    </VStack>
  );
};
export default User;
