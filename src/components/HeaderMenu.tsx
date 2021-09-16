import React, { useContext } from "react";
import { Button, Icon, HStack } from "@chakra-ui/react";
import { MdSearch, MdNotifications, MdNoteAdd } from "react-icons/md";

import { AuthContext } from "../auth/AuthProvider";
import { HeaderMenuUser } from ".";

const HeaderMenu = (): JSX.Element => {
  const { currentUser } = useContext(AuthContext);

  return (
    <HStack>
      <Button as="a" colorScheme="none" href="/search" p="0">
        <Icon as={MdSearch} w="8" h="8" color="gray.100" />
      </Button>
      {currentUser && (
        <>
          <Button colorScheme="none" p="0">
            <Icon as={MdNotifications} w="8" h="8" color="gray.100" />
          </Button>
          <Button colorScheme="none" p="0">
            <Icon as={MdNoteAdd} w="8" h="8" color="gray.100" />
          </Button>
        </>
      )}
      <HeaderMenuUser />
    </HStack>
  );
};

export default HeaderMenu;
