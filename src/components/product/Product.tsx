import React, { useState, useEffect } from "react";
import { Stack, HStack, Image, Text } from "@chakra-ui/react";

import { TagIcon, GithubIcon, ProductIcon } from "../index";
import { fetchProduct } from "../../firebase/firestore";

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

  useEffect(() => {
    const temp = fetchProduct("4L1WDWkKNTeqfyup4qUW").then((productData) => {
      console.log(productData);
      if (productData) {
        setTitle(productData.productTitle);
        setAbstract(productData.productAbstract);
        setIconUrl(productData.productIconUrl);
        setGithubUrl(productData.githubUrl);
        setProductUrl(productData.productUrl);
        setTags(productData.tags);
        setMainText(productData.mainText);
      }
    });
  }, []);

  return (
    <Stack spacing={{ base: "4", md: "2" }} pt="8">
      <HStack align="center">
        <Stack w={{ base: "40%", sm: "35%", md: "30%" }}>
          <Image w="100%" fit="cover" src={iconUrl} />
        </Stack>
        {/* 作品タイトルと概要 */}
        <Stack w={{ base: "60%", sm: "65%", md: "70%" }} h="auto" pt="4">
          <Text fontSize="xl">{title}</Text>
          <Text>{abstract}</Text>
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
