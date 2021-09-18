import React from "react";
import { HStack, Text, Icon } from "@chakra-ui/react";
import { AiOutlineTag } from "react-icons/ai";

const TagIcon = ({ minW = "200px" } = {}): JSX.Element => (
  <HStack minW={minW} justify="center">
    <Icon as={AiOutlineTag} h="6" w="6" />
    <Text fontWeight="bold">タグ</Text>
  </HStack>
);

export default TagIcon;
