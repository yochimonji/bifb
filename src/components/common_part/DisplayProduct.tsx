import React from "react";
import {
  Avatar,
  Button,
  HStack,
  VStack,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { BrowserRouter, useHistory } from "react-router-dom";
import moment from "moment";
import { Like, DisplayProductProps } from "../index";

const DisplayProduct = (props: DisplayProductProps): JSX.Element => {
  const formatDate = (date: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const afterFormatDate: string = moment(date).format("YYYY年MM月DD日");
    return afterFormatDate;
  };

  const history = useHistory();

  /**
   *ボタンが押された時に、その作品の作品IDを引数として送る
   *
   * --値の受け取り方--
   * import { useLocation } from "react-router-dom";
   * const APP = () => {
   *  const location = useLocation();
   *
   *  return (
   *     {(location.state as { productId: string }).productId}
   *  )
   * }
   */
  const handleClick = () => {
    history.push("/product", { productId: props.productId });
  };

  return (
    <BrowserRouter>
      <Button
        w="100%"
        minWidth="350px"
        maxWidth="400px"
        h="235px"
        backgroundColor="white"
        onClick={handleClick}
        variant="ghost"
        shadow="md"
      >
        <HStack w="100%" spacing={0} alignItems="flex-start">
          <VStack w="36%" h="230px" spacing={0} pt="3">
            <Image
              w="100%"
              h="161px"
              src={props.productIconUrl}
              boxsize="100px"
              padding="20px 10px"
            />
            <HStack w="100%" h="69px" spacing={0}>
              <Avatar w="30%" h="60%" src={props.userIconUrl} size="sm" />
              <Text
                w="70%"
                fontSize="md"
                textAlign="left"
                padding="15px 0px 15px"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {props.userName}
              </Text>
            </HStack>
          </VStack>

          <VStack w="64%" h="230px" spacing="0px" pt="5" pl="2">
            <Text
              w="100%"
              h="69px"
              fontSize="xl"
              padding="15px 10px 10px 0px"
              textAlign="left"
              whiteSpace="pre-wrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {props.productTitle}
            </Text>
            <Text
              w="100%"
              h="115px"
              fontSize="md"
              padding="10px 10px 10px 2px"
              textAlign="left"
              whiteSpace="pre-wrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {props.productAbstract}
            </Text>
            <HStack w="100%" h="46px" spacing="0px">
              <VStack w="80%" h="46px" spacing="0px">
                <Text
                  w="100%"
                  h="23px"
                  fontSize="xs"
                  textAlign="left"
                  padding="5px 5px 5px 0px"
                  whiteSpace="pre-wrap"
                >
                  投稿日：{formatDate(props.postDate)}
                </Text>
                <Text
                  w="100%"
                  h="23px"
                  fontSize="xs"
                  textAlign="left"
                  padding="5px 5px 5px 0px"
                  whiteSpace="pre-wrap"
                >
                  更新日：{formatDate(props.editDate)}
                </Text>
              </VStack>
              <Box w="20%" h="46px">
                <Like sumLike={props.sumLike} />
              </Box>
            </HStack>
          </VStack>
        </HStack>
      </Button>
    </BrowserRouter>
  );
};
export default DisplayProduct;
