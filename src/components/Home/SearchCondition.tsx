import React from "react";
import { Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

type Props = {
  searchCondition: string;
};

const SearchCondition = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <HStack w="70%" textAlign="center" spacing={4} minW="450px">
      <Tag
        key={props.searchCondition}
        size="lg"
        borderRadius="full"
        variant="solid"
        bg="#DEEFF1"
        textColor="black"
        justfy="left"
      >
        <TagLabel>{props.searchCondition}</TagLabel>
        <TagCloseButton
          onClick={() => {
            dispatch({ type: "CHANGE_TO_NULL" });
            history.push("/");
          }}
        />
      </Tag>
    </HStack>
  );
};

export default SearchCondition;
