import React from "react";
import { HStack, Icon, Text, Box } from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";

const Like = (): JSX.Element => (
  <HStack alignItems="center" spacing={0}>
    <Box w="50%" h="50%" alignItems="center">
      <Icon aria-label="center" color="#EEB6B7" as={AiFillHeart} />
    </Box>
    <Text w="50%" h="100%" textAlign="center" fontSize="md">
      10
    </Text>
  </HStack>
);

export default Like;
