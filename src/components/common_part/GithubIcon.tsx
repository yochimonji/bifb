import React from "react";
import { HStack, Text, Icon, StackProps } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";

const GithubIcon = (props: StackProps): JSX.Element => (
  <HStack {...props}>
    <Icon as={AiFillGithub} h="8" w="8" />
    <Text fontWeight="bold">GitHub</Text>
  </HStack>
);

GithubIcon.defaultProps = {
  minW: "130px",
};

export default GithubIcon;
