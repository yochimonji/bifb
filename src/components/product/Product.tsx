import React, { useState, useEffect } from "react";
import { Stack, HStack, Image, Text, Heading } from "@chakra-ui/react";

import { TagIcon, GithubIcon, ProductIcon } from "../index";
import {
  fetchProduct,
  fetchUserInfo,
  fetchFeedback,
} from "../../firebase/firestore";

const Product = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [mainText, setMainText] = useState("");
  const [postDate, setPostDate] = useState("");
  const [editDate, setEditDate] = useState("");
  const [sumLike, setSumLike] = useState("");
  const [userUid, setUserUid] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmp = fetchProduct("4L1WDWkKNTeqfyup4qUW").then((productData) => {
      if (productData) {
        setTitle(productData.productTitle);
        setAbstract(productData.productAbstract);
        setIconUrl(productData.productIconUrl);
        setGithubUrl(productData.githubUrl);
        setProductUrl(productData.productUrl);
        setTags(productData.tags);
        setMainText(productData.mainText);
        setPostDate(productData.postDate);
        setEditDate(productData.editDate);
        setSumLike(productData.sumLike);
        setUserUid(productData.userUid);
      }
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmp = fetchUserInfo(userUid).then((userInfo) => {
      if (userInfo) {
        setUserIcon(userInfo.userIcon);
        setUserName(userInfo.name);
      }
    });
  }, [userUid]);

  return (
    <Stack spacing={{ base: "4", md: "2" }} pt="8">
      <HStack spacing={{ base: "2", sm: "4", md: "6" }} align="flex-start">
        <Stack w={{ base: "40%", sm: "30%", md: "20%" }}>
          <Image w="100%" fit="cover" src={iconUrl} />
        </Stack>
        {/* 作品タイトルと概要 */}
        <Stack
          pt={{ base: "2", sm: "4", md: "6" }}
          w={{ base: "60%", sm: "70%", md: "80%" }}
          spacing={{ base: "4", sm: "8", md: "12" }}
        >
          <Heading size="lg">{title}</Heading>
          <Text fontSize={{ base: "sm", md: "md" }}>{abstract}</Text>
        </Stack>
      </HStack>
      {/* GitHubリンク入力欄 */}
      <Stack flexDir={{ base: "column", md: "row" }} pl="2">
        <GithubIcon
          w={{ base: "100%", md: "20%" }}
          justify={{ base: "flex-start", md: "center" }}
        />
      </Stack>
      {/* 作品リンク入力欄 */}
      <Stack flexDir={{ base: "column", md: "row" }} pl="2">
        <ProductIcon
          w={{ base: "100%", md: "20%" }}
          justify={{ base: "flex-start", md: "center" }}
        />
      </Stack>
      {/* タグ入力欄 */}
      <Stack flexDir={{ base: "column", md: "row" }} pl="2">
        <TagIcon
          w={{ base: "100%", md: "20%" }}
          justify={{ base: "flex-start", md: "center" }}
          pb={{ base: "0", md: "2" }}
        />
      </Stack>
    </Stack>
  );
};

export default Product;
