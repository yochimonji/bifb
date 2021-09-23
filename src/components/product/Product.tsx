import React, { useState, useEffect } from "react";
import {
  Stack,
  HStack,
  Image,
  Text,
  Heading,
  Button,
  Avatar,
  Icon,
  Tag,
} from "@chakra-ui/react";
import { Link, LinkProps } from "react-router-dom";
import moment from "moment";

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
  const [userLink, setUserLink] = useState<LinkProps>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmp = fetchProduct("4L1WDWkKNTeqfyup4qUW").then((productData) => {
      if (productData) {
        const formatedPostDate = moment(productData.postDate).format(
          "YYYY年MM月DD日"
        );
        const formatedEditDate = moment(productData.editDate).format(
          "YYYY年MM月DD日"
        );
        setTitle(productData.productTitle);
        setAbstract(productData.productAbstract);
        setIconUrl(productData.productIconUrl);
        setGithubUrl(productData.githubUrl);
        setProductUrl(productData.productUrl);
        setTags(productData.tags);
        setMainText(productData.mainText);
        setPostDate(formatedPostDate);
        setEditDate(formatedEditDate);
        setSumLike(productData.sumLike);
        setUserUid(productData.userUid);
      }
    });
  }, []);

  useEffect(() => {
    // 初回読み込み時にuserUidがないためエラーになるためifが必要
    if (userUid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tmp = fetchUserInfo(userUid).then((userInfo) => {
        if (userInfo) {
          setUserIcon(userInfo.userIcon);
          setUserName(userInfo.name);
        }
      });
    }
  }, [userUid]);

  return (
    <Stack spacing={{ base: "4", md: "2" }} pt={{ base: "4", sm: "8" }}>
      <HStack spacing={{ base: "2", sm: "4", md: "6" }} align="flex-start">
        <Stack w={{ base: "30%", sm: "25%", md: "20%" }}>
          <Image w="100%" fit="cover" src={iconUrl} />
        </Stack>
        {/* 作品タイトルと概要 */}
        <Stack
          pt={{ base: "2", sm: "4", md: "6" }}
          w={{ base: "70%", sm: "75%", md: "80%" }}
          spacing={{ base: "4", sm: "8", md: "12" }}
        >
          <Heading fontSize={{ base: "lg", sm: "xl", md: "2xl" }}>
            {title}
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }}>{abstract}</Text>
        </Stack>
      </HStack>
      {/* ユーザー名・公開日表示 */}
      <Stack
        flexDir={{ base: "column", sm: "row" }}
        justify={{ base: "flex-start", sm: "center" }}
      >
        <HStack
          as={Link}
          w="20%"
          minW="115px"
          justify={{ base: "flex-start", sm: "center" }}
          to={{ pathname: "/user", state: { userUid } }}
        >
          <Avatar name={userName} src={userIcon} size="sm" />
          <Text>{userName}</Text>
        </HStack>
        <Text
          w="80%"
          pl={{ base: "0", sm: "6" }}
          fontSize={{ base: "xs", md: "sm" }}
        >
          投稿日{postDate}
          {postDate !== editDate && ` 編集日${editDate}`}
        </Text>
      </Stack>
      {/* タグ表示 */}
      <Stack flexDir={{ base: "column", md: "row" }} pl="2">
        <TagIcon
          w={{ base: "100%", md: "20%" }}
          justify={{ base: "flex-start", md: "center" }}
          pt={{ base: "0", md: "2" }}
        />
        <HStack flexWrap="wrap">
          {tags.map((tag, i) => (
            <Tag
              key={i.toString()}
              rounded="full"
              p="2"
              pl="4"
              pr="4"
              fontSize={{ base: "xs", sm: "sm", md: "md" }}
            >
              {tag}
            </Tag>
          ))}
        </HStack>
      </Stack>
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
    </Stack>
  );
};

export default Product;
