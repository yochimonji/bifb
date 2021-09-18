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
  Image,
  Avatar,
  Text,
} from "@chakra-ui/react";

const Home = (): JSX.Element => (
  <VStack spacing={10} align="stretch">
    <Box h="100px">
      <HStack spacing="10px">
        <Box
          w="15%"
          h="100px"
          padding="35px"
          textAlign="center"
          alignItems="center"
        >
          検索条件:
        </Box>
        <Box
          w="65%"
          h="100px"
          padding="30px"
          textAlign="center"
          alignItems="center"
        >
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
        <Box
          w="20%"
          h="100px"
          padding="30px"
          textAlign="center"
          alignItems="center"
        >
          <Select placeholder="トレンド">
            <option value="NEW">新着</option>
            <option value="LikeLarge">いいね数</option>
          </Select>
        </Box>
      </HStack>
    </Box>
    <Box h="600px">
      <SimpleGrid columns={2} spacing={10}>
        <Box bg="#90CE9C" height="210px">
          <HStack spacing={0}>
            <Box w="30%" h="210" bg="tomato">
              <VStack spacing={0}>
                <Box w="100%" h="150px" bg="gray">
                  <Image
                    src="https://bit.ly/sage-adebayo"
                    boxsize="100px"
                    padding="10px"
                    alignItems="center"
                  />
                </Box>
                <Box w="100%" h="60px" bg="blue.50">
                  <HStack spacing={0}>
                    <Box
                      w="30%"
                      h="60px"
                      bg="tomato"
                      padding="10px"
                      margin="auto"
                    >
                      <Avatar src="https://bit.ly/broken-link" size="sm" />
                    </Box>
                    <Box
                      w="70%"
                      h="60px"
                      bg="blue.200"
                      fontSize="xs"
                      textAlign="center"
                      padding="12.5px"
                    >
                      <Text fontSize="15px">yochimonji</Text>
                    </Box>
                  </HStack>
                </Box>
              </VStack>
            </Box>
            <Box w="70%" h="210px" bg="blue.100" />
          </HStack>
        </Box>
        <Box bg="#90CE9C" height="210px" />
        <Box bg="#90CE9C" height="210px" />
        <Box bg="#90CE9C" height="210px" />
      </SimpleGrid>
    </Box>
  </VStack>
);
export default Home;
