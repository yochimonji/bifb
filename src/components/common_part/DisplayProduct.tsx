import React from "react";
import { Avatar, Button, HStack, VStack, Box, Image, Text } from "@chakra-ui/react";
import { BrowserRouter, useHistory } from "react-router-dom";
import moment from "moment";
import { Favorite, DisplayProductProps } from "../index";

const DisplayProduct = (props: DisplayProductProps): JSX.Element => {
  const formatDate = (date: string) => {
    const dateISO = new Date(date).toISOString();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const afterFormatDate: string = moment(dateISO).format("YYYY年MM月DD日");
    return afterFormatDate;
  };

  const history = useHistory();

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
        shadow="lg"
      >
        <HStack w="100%" spacing={0} alignItems="flex-start">
          <VStack w="36%" h="230px" spacing={0} pt="3" justify="center">
            <Image w="100%" h="161px" src={props.productIconUrl} boxsize="100px" padding="20px 10px" />
            <HStack h="69px" spacing={0}>
              <Avatar w="8" h="8" src={props.userIconUrl} />
              <Text
                fontSize="xs"
                textAlign="left"
                padding="15px 0px 15px 8px"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {props.userName.length >= 12 ? `${props.userName.slice(0, 12)}...` : props.userName}
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
                <Text w="100%" h="23px" fontSize="xs" textAlign="left" padding="7px 5px 5px 0px" whiteSpace="pre-wrap">
                  {props.postDate === props.editDate
                    ? `投稿日：${formatDate(props.postDate)}`
                    : `更新日：${formatDate(props.editDate)}`}
                </Text>
              </VStack>
              <Box w="20%" h="46px" pt="2px" pr="4px">
                <Favorite favoriteNum={props.favoriteNum} />
              </Box>
            </HStack>
          </VStack>
        </HStack>
      </Button>
    </BrowserRouter>
  );
};
export default DisplayProduct;
