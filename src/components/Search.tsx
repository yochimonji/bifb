import React from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Tag,
  TagLabel,
  Wrap,
  Icon,
  IconButton,
} from "@chakra-ui/react";
// import { icons } from "react-icons/lib";
import { MdSearch } from "react-icons/md";
// 2. Use the `as` prop
// type OptionType = {
//   label: string;
//   value: string;
// };
// const createOption = (label: string): OptionType => ({
//   label,
//   value: label,
// });
const Search = (): JSX.Element => {
  const handleTag: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.value);
  };
  return (
    <VStack spacing={20} align="stretch">
      <InputGroup>
        <Input
          onChange={handleTag}
          h="60px"
          type="tag"
          placeholder="search"
          spacing="5px"
          size="lg"
          fontSize="1.2em"
        />

        <InputRightElement pointerEvents="none">
          <IconButton
            aria-label=""
            icon={<MdSearch />}
            color="gray.300"
            size="lg"
            alignItems="center"
            _focus={{
              bg: "blue.200",
              outline: "none",
            }}
          />
          {/* <Icon as={MdSearch} color="gray.300" size="lg" /> */}
        </InputRightElement>
      </InputGroup>

      {/* 検索絞り込み結果の表示 */}
      <Wrap w="100%" spacing="0px" alignItems="center" flexWrap="wrap">
        <Wrap w="70%" textAlign="center" spacing={4} minW="450px">
          {["React", "Typescript", "JavaScript", "C++", "Webアプリ"].map(
            (tag) => (
              <Tag
                size="lg"
                key="lg"
                borderRadius="5px"
                variant="solid"
                bg="#DEEFF1"
                textColor="black"
                justfy="left"
              >
                <TagLabel>{tag}</TagLabel>
              </Tag>
            )
          )}
        </Wrap>
      </Wrap>

      {/* 検索絞り込み結果の表示 */}
      <Wrap
        w="100%"
        columns={[1, null, 2]}
        spacingX="50px"
        spacingY="50px"
        justifyItems="center"
      >
        {/* <Box w="100%" minW="400px" maxW="450px" h="234.9px" bg="green.100" />
      <Box w="100%" minW="400px" maxW="450px" h="234.9px" bg="green.200" />
      <Box w="100%" minW="400px" maxW="450px" h="234.9px" bg="green.300" />
      <Box w="100%" minW="400px" maxW="450px" h="234.9px" bg="green.400" />
      <Box w="100%" minW="400px" maxW="450px" h="234.9px" bg="green.300" />
      <Box w="100%" minW="400px" maxW="450px" h="234.9px" bg="green.400" /> */}
      </Wrap>
    </VStack>
  );
};
export default Search;
