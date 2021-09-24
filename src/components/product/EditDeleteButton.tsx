import React from "react";
import { IconButton, HStack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

type EditDeleteButtonType = {
  handleClickEdit: React.MouseEventHandler<HTMLButtonElement>;
  handleClickDelete: React.MouseEventHandler<HTMLButtonElement>;
};

const EditDeleteButton = (props: EditDeleteButtonType): JSX.Element => (
  <HStack
    justify="flex-end"
    zIndex="1"
    position="fixed"
    pt="4"
    pr="10"
    pb="20"
    h="100%"
    w="100%"
    maxW="container.lg"
    align={{ base: "flex-end", sm: "flex-start" }}
  >
    <IconButton
      icon={<EditIcon w="6" h="6" />}
      aria-label="Edit Button"
      onClick={props.handleClickEdit}
      variant="solid"
      rounded="full"
      size="lg"
      shadow="md"
    />
    <IconButton
      icon={<DeleteIcon w="6" h="6" />}
      aria-label="Delete Button"
      onClick={props.handleClickDelete}
      variant="solid"
      rounded="full"
      size="lg"
      shadow="md"
    />
  </HStack>
);

export default EditDeleteButton;
