import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";

const ProductIcon = ({ minW = "200px" } = {}): JSX.Element => (
  <HStack minW={minW} justify="center">
    <LinkIcon h="6" w="6" />
    <Text fontWeight="bold">作品リンク</Text>
  </HStack>
);

export default ProductIcon;
