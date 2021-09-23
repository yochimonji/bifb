import React, { useState, useEffect, useContext } from "react";
import {
  Stack,
  HStack,
  Image,
  Text,
  Heading,
  Avatar,
  Tag,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";

import { TagIcon, LinkLike } from "../index";
import {
  fetchProduct,
  fetchUserInfo,
  fetchFeedback,
  countLikeProduct,
} from "../../firebase/firestore";
import { AuthContext } from "../../auth/AuthProvider";

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
  const [sumLike, setSumLike] = useState(0);
  const [userUid, setUserUid] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [userName, setUserName] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [productId, setProductId] = useState("4L1WDWkKNTeqfyup4qUW");

  const { currentUser } = useContext(AuthContext);

  /**
   * いいねボタンをクリックした際の動作を行う関数
   */
  const handleClickLikeButton: React.MouseEventHandler<HTMLButtonElement> =
    () => {
      setIsLike((prev) => {
        let condition = "UP";
        if (prev) {
          condition = "DOWN";
        } else {
          condition = "UP";
        }
        if (currentUser) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const tmp = countLikeProduct(
            productId,
            condition,
            currentUser?.uid
          ).then((newSumLike) => {
            if (typeof newSumLike === "number") {
              setSumLike(newSumLike);
            }
          });
        }
        return !prev;
      });
    };

  // productId読み込み後の各stateの初期化
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmp = fetchProduct(productId).then((productData) => {
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
  }, [productId]);

  // userUid読み込み後のユーザー情報に関するstateの初期化
  useEffect(() => {
    // 初回読み込み時にuserUidがなくエラーになるためifが必要
    if (userUid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tmp = fetchUserInfo(userUid).then((userInfo) => {
        if (userInfo) {
          setUserIcon(userInfo.userIcon);
          setUserName(userInfo.name);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          if ([...userInfo.giveLike].includes(productId)) {
            setIsLike(true);
          }
        }
      });
    }
  }, [productId, userUid]);

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
        <TagIcon pt={{ base: "0", md: "2" }} minW="80px" />
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
      {/* リンク、いいね、本文を表示 */}
      <LinkLike
        githubUrl={githubUrl}
        productUrl={productUrl}
        sumLike={sumLike}
        isLike={isLike}
        handleClickLikeButton={handleClickLikeButton}
      />
      <Text bg="white" p="2">
        {mainText}
      </Text>
      <LinkLike
        githubUrl={githubUrl}
        productUrl={productUrl}
        sumLike={sumLike}
        isLike={isLike}
        handleClickLikeButton={handleClickLikeButton}
      />
    </Stack>
  );
};

export default Product;
