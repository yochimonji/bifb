import React from "react";
import {
  Button,
  HStack,
  VStack,
  Box,
  Image,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { Like } from "./index";

const DisplayProduct = (): JSX.Element => (
  <Button
    size="md"
    width="450px"
    height="278.1px"
    border="1px"
    borderColor="black"
    backgroundColor="white"
  >
    {/* <HStack spacing="0">
      <Box w="30%" h="150px" bg="blue.100">
        a
      </Box>
      <Box w="70%" h="150px" bg="green.100">
        b
      </Box>
    </HStack> */}
  </Button>
  // <Box shadow="md" boederWidth="1px" flex="1" borderRadius="md">
  //   <HStack spacing={0}>
  //     <VStack w="30%" spacing={0}>
  //       <Image
  //         w="100%"
  //         src="https://bit.ly/sage-adebayo"
  //         boxsize="100px"
  //         padding="10px"
  //         alignItems="center"
  //       />
  //       <HStack w="100%" spacing={0}>
  //         <Avatar w="30%" src="https://bit.ly/broken-link" />
  //         <Text
  //           w="70%"
  //           fontSize="md"
  //           textAlign="center"
  //           padding="15px 0px 15px"
  //         >
  //           yochimonji
  //         </Text>
  //       </HStack>
  //     </VStack>
  //     <Box w="70%">
  //       <Text w="100%" padding="5px 12.5px 12.5px 0px" fontSize="2xl">
  //         ラクスケ
  //       </Text>

  //       <Text w="100%" textAlign="left" fontSize="md" minWidth="50%">
  //         予定に合わせて自動でタスクを登録するアプリ予定に合わせて自動でタスクを登録するアプリ
  //       </Text>

  //       <HStack w="100%" spacing={0}>
  //         <VStack w="80%" spacing={0}>
  //           <Text
  //             w="100%"
  //             textAlign="center"
  //             fontSize="sm"
  //             padding="1px"
  //             alignSelf="flex-end"
  //           >
  //             2021年08月28日公開
  //           </Text>
  //           <Text
  //             w="100%"
  //             textAlign="center"
  //             fontSize="sm"
  //             padding="1px"
  //             alignSelf="flex-end"
  //           >
  //             2021年09月10日更新
  //           </Text>
  //         </VStack>

  //         <VStack w="20%" spacing={0} alignItems="flex-end">
  //           <Like />
  //         </VStack>
  //       </HStack>
  //     </Box>
  //   </HStack>
  // </Box>
);

export default DisplayProduct;
