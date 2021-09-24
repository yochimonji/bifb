import React, { useRef } from "react";
import {
  IconButton,
  HStack,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

type EditDeleteButtonType = {
  handleClickEdit: React.MouseEventHandler<HTMLButtonElement>;
  handleClickDelete: React.MouseEventHandler<HTMLButtonElement>;
};

const EditDeleteButton = (props: EditDeleteButtonType): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <HStack
        justify="flex-end"
        zIndex="1"
        position="fixed"
        top={{ base: "auto", sm: "20" }}
        bottom={{ base: "10", sm: "auto" }}
        right="4"
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
          onClick={onOpen}
          variant="solid"
          rounded="full"
          size="lg"
          shadow="md"
        />
      </HStack>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>作品を削除しますか？</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            作品を削除すると元に戻すことはできません。それでも削除しますか？
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              閉じる
            </Button>
            <Button onClick={props.handleClickDelete} ml="3" colorScheme="teal">
              削除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditDeleteButton;
