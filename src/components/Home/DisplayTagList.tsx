import React from "react";
import { Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";

type Props = {
  tagList: string | undefined;
};

const DisplayTags = (props: Props): JSX.Element => (
  <HStack w="70%" textAlign="center" spacing={4} minW="450px">
    <Tag
      key={props.tagList}
      size="lg"
      borderRadius="full"
      variant="solid"
      bg="#DEEFF1"
      textColor="black"
      justfy="left"
    >
      <TagLabel>{props.tagList}</TagLabel>
      <TagCloseButton />
    </Tag>
  </HStack>
);

export default DisplayTags;
