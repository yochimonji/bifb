import React from "react";
import {
  Button,
  HStack,
  VStack,
  Box,
  Image,
  Avatar,
  Text,
} from "@chakra-ui/react";

import moment from "moment";
import { Like } from "./index";

type DisplayProductProps = {
  productIconUrl: string;
  userIconUrl: string;
  userName: string;
  productTitle: string;
  productAbstract: string;
  postDate: string;
  editDate: string;
  sumLike: number;
};

const DisplayProduct = (props: DisplayProductProps): JSX.Element => {
  const formatDate = (date: string) => {
    const afterFormatDate = moment(date).format("YYYY年MM月DD日");
    return afterFormatDate;
  };

  return (
    <Button
      w="100%"
      minWidth="350px"
      maxWidth="400px"
      h="235px"
      border="1px"
      borderColor="black"
      backgroundColor="white"
    >
      <HStack w="100%" spacing={0} alignItems="flex-start">
        <VStack w="36%" h="230px" spacing={0}>
          <Image
            w="100%"
            h="161px"
            src={props.productIconUrl}
            boxsize="100px"
            padding="20px 10px"
          />
          <HStack w="100%" h="69px" spacing={0}>
            <Avatar w="30%" src={props.userIconUrl} size="sm" />
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

        <VStack w="64%" h="230px" spacing="0px">
          <Text
            w="100%"
            h="69px"
            fontSize="2xl"
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
            padding="10px 10px 10px 0px"
            textAlign="left"
            whiteSpace="pre-wrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {props.productAbstract}
          </Text>
          <HStack w="100%" h="46px" spacing="0px">
            <VStack w="60%" h="46px" spacing="0px">
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
            <Box w="40%" h="46px">
              <Like sumLike={props.sumLike} />
            </Box>
          </HStack>
        </VStack>
      </HStack>
    </Button>
  );
};
export default DisplayProduct;
