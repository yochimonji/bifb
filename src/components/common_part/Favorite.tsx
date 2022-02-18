import React from "react";
import { HStack, Icon, Text, Box } from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";

type FavoriteNumProps = {
  favoriteNum: number;
};

const Favorite = (props: FavoriteNumProps): JSX.Element => (
  <HStack alignItems="center" spacing={0}>
    <Box w="50%" h="50%" alignItems="center">
      <Icon aria-label="center" as={AiOutlineHeart} />
    </Box>
    <Text w="50%" h="100%" textAlign="center" fontSize="md">
      {props.favoriteNum}
    </Text>
  </HStack>
);

export default Favorite;
