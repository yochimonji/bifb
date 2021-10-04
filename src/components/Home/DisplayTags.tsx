import React from "react";
import { Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";

const DisplayTags = (): JSX.Element => {
  const tagList: string[] = ["React", "TypeScript"];
  return (
    <HStack w="70%" textAlign="center" spacing={4} minW="450px">
      {tagList.map((tag) => (
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
};

export default DisplayTags;
