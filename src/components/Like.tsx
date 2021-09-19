import React from "react";
import { HStack, IconButton, Text } from "@chakra-ui/react";
import { TiHeart } from "react-icons/ti";

const Like = (): JSX.Element => (
  <HStack w="100%" spacing={0} bg="blue.100">
    <IconButton
      w="50%"
      alignItems="center"
      aria-label="center"
      size="xs"
      backgroundColor="white"
      icon={<TiHeart />}
    />
    <Text
      w="50%"
      textAlign="left"
      padding="10px 0px 10px 15px"
      fontSize="5px"
      justfy="center"
      minWidth="50%"
    >
      10
    </Text>
  </HStack>
);

export default Like;
