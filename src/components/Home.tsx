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
  IconButton,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

function Product() {
  return (
    <Box
      height="210px"
      shadow="md"
      boederWidth="1px"
      flex="1"
      borderRadius="md"
    >
      <HStack spacing={0}>
        <Box w="30%" h="210">
          <VStack spacing={0}>
            <Box w="100%" h="150px">
              <Image
                src="https://bit.ly/sage-adebayo"
                boxsize="100px"
                padding="10px"
                alignItems="center"
              />
            </Box>
            <Box w="100%" h="60px">
              <HStack spacing={0}>
                <Box w="30%" h="60px" padding="10px" margin="auto">
                  <Avatar src="https://bit.ly/broken-link" size="sm" />
                </Box>
                <Box
                  w="70%"
                  h="60px"
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
        <Box w="70%" h="210px">
          <Box w="100%" h="70px" textAlign="left" padding="12.5px">
            <Text fontSize="2xl">ラクスケ</Text>
          </Box>
          <Box w="100%" h="70px" textAlign="left">
            <Text fontSize="lg">
              予定に合わせて自動でタスクを登録するアプリ
            </Text>
          </Box>
          <Box w="100%" h="70px">
            <HStack spacing={0}>
              <Box w="80%" h="70px">
                <VStack spacing={0}>
                  <Box w="100%" h="20px" />
                  <Box w="100%" h="25px" textAlign="center">
                    <Text fontSize="sm">2021年08月28日公開</Text>
                  </Box>
                  <Box w="100%" h="25px" textAlign="center">
                    <Text fontSize="sm">2021年09月10日更新</Text>
                  </Box>
                </VStack>
              </Box>
              <Box w="20%" h="70px">
                <VStack spacing={0}>
                  <Box w="100%" h="35px" />
                  <Box w="100%" h="35px">
                    <HStack spacing={0}>
                      <Box w="50%" h="35px" alignItems="center">
                        <IconButton
                          aria-label="Search database"
                          size="xs"
                          icon={<PlusSquareIcon />}
                        />
                      </Box>
                      <Box w="50%" h="35px" textAlign="left" padding={2}>
                        <Text fontSize="5px">10</Text>
                      </Box>
                    </HStack>
                  </Box>
                </VStack>
              </Box>
            </HStack>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
}

const Home = (): JSX.Element => (
  <VStack spacing={10} align="stretch">
    <Box h="100px">
      <HStack spacing="10px">
        <Box
          w="15%"
          h="100px"
          padding="35px"
          textAlign="left"
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
        {Product()}
        {Product()}
        {Product()}
        {Product()}
      </SimpleGrid>
    </Box>
  </VStack>
);
export default Home;
