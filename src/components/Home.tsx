import React from "react";
import {
  Text,
  HStack,
  VStack,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Select,
} from "@chakra-ui/react";

const Home = (): JSX.Element => (
  <VStack spacing={4} align="stretch">
    <Box h="55px" bg="yellow.100">
      <HStack spacing="10px">
        <Box w="10%" h="55px" padding="10px" textAlign="center" bg="red.100">
          検索条件
        </Box>
        <Box w="70%" h="55px" padding="10px" textAlign="center" bg="red.100">
          <HStack spacing={4}>
            {["React", "Typescript"].map((size) => (
              <Tag
                size="lg"
                key="lg"
                borderRadius="full"
                variant="solid"
                colorScheme="green"
              >
                <TagLabel>{size}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </HStack>
        </Box>
        <Box w="20%" h="55px" padding="10px" textAlign="center" s bg="red.100">
          <Select placeholder="トレンド">
            <option value="NEW">新着</option>
            <option value="LikeLarge">いいね数大</option>
            <option value="LikeSmall">いいね数小</option>
          </Select>
        </Box>
      </HStack>
    </Box>
    <Box h="5000px" bg="tomato">
      test2
    </Box>
  </VStack>
);
export default Home;
