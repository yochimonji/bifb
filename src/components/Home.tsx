import React from "react";
import {
  HStack,
  VStack,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";

const Home = (): JSX.Element => (
  <VStack spacing={7} align="stretch">
    <Box h="100px">
      <HStack spacing="10px">
        <Box w="10%" h="100px" padding="15px" textAlign="center">
          検索条件:
        </Box>
        <Box w="70%" h="100px" padding="10px" textAlign="center">
          <HStack spacing={4}>
            {["React", "Typescript"].map((size) => (
              <Tag
                size="lg"
                key="lg"
                borderRadius="full"
                variant="solid"
                bg="#DEEFF1"
                textColor="black"
              >
                <TagLabel>{size}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </HStack>
        </Box>
        <Box w="20%" h="100px" padding="10px" textAlign="center">
          <Select placeholder="トレンド">
            <option value="NEW">新着</option>
            <option value="LikeLarge">いいね数大</option>
            <option value="LikeSmall">いいね数小</option>
          </Select>
        </Box>
      </HStack>
    </Box>
    <Box h="600px">
      <SimpleGrid columns={2} spacing={10}>
        <Box bg="#90CE9C" height="300px" />
        <Box bg="#90CE9C" height="300px" />
        <Box bg="#90CE9C" height="300px" />
        <Box bg="#90CE9C" height="300px" />
      </SimpleGrid>
    </Box>
  </VStack>
);
export default Home;
