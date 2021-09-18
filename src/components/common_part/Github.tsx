import React from "react";
import { HStack, Text, Icon } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";

const Github = ({ minW = "200px" } = {}): JSX.Element => (
  <HStack minW={minW} justify="center">
    <Icon as={AiFillGithub} h="8" w="8" />
    <Text fontWeight="bold">GitHubリンク</Text>
  </HStack>
);

export default Github;
