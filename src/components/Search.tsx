import React, { useEffect, useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  IconButton,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { fetchAllTags } from "../firebase/firestore";

const Search = (): JSX.Element => {
  const [tags, setTags] = useState<QueryDocumentSnapshot<DocumentData>[]>();

  // 最初1回のみ、すべてのタグの取得
  useEffect(() => {
    const tmpFetchTags = fetchAllTags().then((data) => {
      setTags(data.docs);
    });
  }, []);

  const handleTag: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target.value);
  };

  const handleClick = () => {};

  return (
    <VStack spacing="40px" align="stretch">
      <InputGroup pt="40px" size="md">
        <Input
          onChange={handleTag}
          h="60px"
          type="tag"
          placeholder="search"
          spacing="5px"
          size="lg"
          fontSize="1.2em"
        />
        <InputRightElement pt="70px" width="4.5rem">
          <IconButton
            icon={<MdSearch />}
            aria-label="Search database"
            size="lg"
            variant="ghost"
            onClick={handleClick}
          />
        </InputRightElement>
      </InputGroup>
      <SimpleGrid
        columns={[1, 2, 3]}
        justifyItems="center"
        w="100%"
        spacing="40px"
        pb="40px"
      >
        {tags &&
          tags.map((eachTags) => (
            <Button
              minWidth="200px"
              width="240px"
              height="80px"
              colorScheme="blackAlpha"
              variant="outline"
            >
              {eachTags.id}
            </Button>
          ))}
      </SimpleGrid>
    </VStack>
  );
};
export default Search;
