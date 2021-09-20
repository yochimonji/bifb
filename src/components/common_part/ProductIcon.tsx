import React from "react";
import { HStack, Text, StackProps } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";

const ProductIcon = (props: StackProps): JSX.Element => (
  <HStack {...props}>
    <LinkIcon h="6" w="6" />
    <Text fontWeight="bold">作品リンク</Text>
  </HStack>
);

ProductIcon.defaultProps = {
  minW: "130px",
};

export default ProductIcon;
