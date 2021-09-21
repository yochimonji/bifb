import React from "react";
import { HStack, Icon, Text, Box } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";

type SumLikeProps = {
  sumLike: number;
};

const Like = (props: SumLikeProps): JSX.Element => (
  <HStack alignItems="center" spacing={0}>
    {console.log("Like関数への侵入確認")}
    <Box w="50%" h="50%" alignItems="center">
      <Icon aria-label="center" color="#EEB6B7" as={AiFillHeart} />
    </Box>
    <Text w="50%" h="100%" textAlign="center" fontSize="md">
      {props.sumLike}
    </Text>
  </HStack>
);

export default Like;
