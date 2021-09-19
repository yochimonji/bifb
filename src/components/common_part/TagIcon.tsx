import React from "react";
import { HStack, Text, Icon, StackProps } from "@chakra-ui/react";
import { AiOutlineTag } from "react-icons/ai";

const TagIcon = (props: StackProps): JSX.Element => (
  <HStack {...props}>
    <Icon as={AiOutlineTag} h="6" w="6" />
    <Text fontWeight="bold">タグ</Text>
  </HStack>
);

TagIcon.defaultProps = {
  minW: "130px",
};

export default TagIcon;
