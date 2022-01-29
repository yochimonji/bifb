import React from "react";
import { Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";

type Props = {
  tagList: string[];
};

const DisplayTags = (props: Props): JSX.Element => (
  <HStack w="70%" textAlign="center" spacing={4} minW="450px">
    {props.tagList.map((tag) => (
      <Tag
        key={tag}
        size="lg"
        borderRadius="full"
        variant="solid"
        bg="#DEEFF1"
        textColor="black"
        justfy="left"
      >
        <TagLabel>{tag}</TagLabel>
        <TagCloseButton />
      </Tag>
    ))}
  </HStack>
);

export default DisplayTags;
