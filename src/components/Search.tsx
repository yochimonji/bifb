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
import { BrowserRouter, useHistory } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { fetchAllTags } from "../firebase/firestore";

const Search = (): JSX.Element => {
  const history = useHistory();
  const [tagscom, setTagsCom] = useState<string[]>();
  const [tagsList, setTagsList] = useState<string[]>();
  const tagsAll = [""];
  let tagsNow = [""];
  let inputText = "";

  // 最初1回のみ、すべてのタグの取得
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmpFetchTags = fetchAllTags().then((data) => {
      data.docs.forEach((eachData: QueryDocumentSnapshot<DocumentData>) => {
        tagsAll.push(eachData.id);
        tagsNow.push(eachData.id);
      });

      if (tagsAll[0] === "") {
        tagsAll.shift();
        tagsNow.shift();
      }

      setTagsCom(tagsAll);
      setTagsList(tagsAll);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkTags = (input: string) => {
    tagsNow = [""];
    if (tagscom) {
      tagscom.forEach((tag: string) => {
        const searchText = new RegExp(input, "i");
        const test = tag.search(searchText);
        if (test !== -1) {
          tagsNow.push(tag);
        }
      });
      if (tagsNow[0] === "") {
        tagsNow.shift();
      }
    }
    setTagsList(tagsNow);
  };

  // input欄の入力値の検出
  const handleInputText: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    inputText = event.target.value;
    checkTags(event.target.value);
  };

  // 検索ボタンが押されたときの操作
  const handleSearch = () => {
    history.push("/", { paramInputText: inputText });
  };

  // タグボタンが押された時の操作
  const handleClickTagButton = (tag: string) => {
    console.log("Search: ", tag);
    history.push("/", { parmSearchTags: tag });
  };

  // 入力画面でEnterが押されたときに検索とみなす
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ): void => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <BrowserRouter>
      <VStack spacing="40px" align="stretch">
        <InputGroup pt="40px" size="md">
          <Input
            h="60px"
            type="tag"
            placeholder="search"
            spacing="5px"
            size="lg"
            fontSize="1.2em"
            onChange={handleInputText}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement pt="70px" width="4.5rem">
            <IconButton
              icon={<MdSearch />}
              aria-label="Search database"
              size="lg"
              variant="ghost"
              onClick={handleSearch}
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
          {tagsList &&
            tagsList.map((eachTags) => (
              <Button
                key={eachTags}
                id="button"
                minWidth="200px"
                width="240px"
                height="80px"
                colorScheme="blackAlpha"
                variant="outline"
                value={eachTags}
                onClick={() => handleClickTagButton(eachTags)}
              >
                {eachTags}
              </Button>
            ))}
        </SimpleGrid>
      </VStack>
    </BrowserRouter>
  );
};
export default Search;
