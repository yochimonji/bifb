import React from "react";
import { HStack, Text, Icon, StackProps } from "@chakra-ui/react";
import { AiOutlineTwitter } from "react-icons/ai";

const TwitterIcon = (props: StackProps): JSX.Element => (
  <HStack {...props}>
    <Icon as={AiOutlineTwitter} color="blue.400" h="8" w="8" />
    <Text>Twitter</Text>
  </HStack>
);

TwitterIcon.defaultProps = {
  minW: "130px",
};

export default TwitterIcon;
