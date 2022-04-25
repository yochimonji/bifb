import React from "react";
import { HStack, Text, StackProps } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";

const ProductIcon = (props: StackProps): JSX.Element => (
  <HStack {...props}>
    <LinkIcon h="5" w="5" />
    <Text>作品URL</Text>
  </HStack>
);

ProductIcon.defaultProps = {
  minW: "130px",
};

export default ProductIcon;
