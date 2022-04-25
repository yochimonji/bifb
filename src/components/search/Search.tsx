import React, { useEffect, useState } from "react";
import { Input, InputGroup, InputRightElement, VStack, IconButton, SimpleGrid, Button } from "@chakra-ui/react";
import { BrowserRouter, useHistory } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

import { fetchAllTagList } from "firebase-com/firestore";
import { useAppDispatch } from "hooks/hooks";

const Search = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [inputTagList, inputSetTagList] = useState<string[]>();
  const [tagList, setTagList] = useState<string[]>();
  const allTagList = [""];
  let newTagList = [""];
  const [newInputText, setNewInputText] = useState<string>("");

  // ページ読み込み時、1回のみすべてのタグを取得
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tmpFetchTagList = fetchAllTagList().then((data) => {
      data.docs.forEach((eachData: QueryDocumentSnapshot<DocumentData>) => {
        allTagList.push(eachData.id);
        newTagList.push(eachData.id);
      });

      if (allTagList[0] === "") {
        allTagList.shift();
        newTagList.shift();
      }

      inputSetTagList(allTagList);
      setTagList(allTagList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkTagList = (input: string) => {
    newTagList = [""];
    if (inputTagList) {
      inputTagList.forEach((tag: string) => {
        const searchText = new RegExp(input, "i");
        const test = tag.search(searchText);
        if (test !== -1) {
          newTagList.push(tag);
        }
      });
      if (newTagList[0] === "") {
        newTagList.shift();
      }
    }
    setTagList(newTagList);
  };

  // input欄の入力値の検出
  const handleInputText: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputText = event.target.value;
    setNewInputText(inputText);
    checkTagList(event.target.value);
  };

  // 検索ボタンが押されたときの操作
  const handleSearch = () => {
    dispatch({ type: "CHANGE_INPUT_TEXT", paramSearchStatus: "", inputText: newInputText, selectedTagList: "" });
    history.push("/");
  };

  // タグボタンが押された時の操作
  const handleClickTagButton = (tag: string) => {
    dispatch({ type: "CHANGE_TAG_LIST", paramSearchStatus: "", inputText: "", selectedTagList: tag });
    history.push("/");
  };

  // 入力画面でEnterが押されたときに検索とみなす
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event): void => {
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
        <SimpleGrid columns={[1, 2, 3]} justifyItems="center" w="100%" spacing="40px" pb="40px">
          {tagList &&
            tagList.map((tag) => (
              <Button
                key={tag}
                id="button"
                minWidth="200px"
                width="240px"
                height="80px"
                colorScheme="blackAlpha"
                variant="outline"
                value={tag}
                onClick={() => handleClickTagButton(tag)}
              >
                {tag}
              </Button>
            ))}
        </SimpleGrid>
      </VStack>
    </BrowserRouter>
  );
};
export default Search;
