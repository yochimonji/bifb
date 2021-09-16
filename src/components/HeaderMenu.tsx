import React, { useContext } from "react";
import { Button, Icon, HStack, Link } from "@chakra-ui/react";
import { MdSearch, MdNotifications, MdNoteAdd } from "react-icons/md";

import { AuthContext } from "../auth/AuthProvider";
import { HeaderMenuUser } from ".";

const HeaderMenu = (): JSX.Element => {
  const { currentUser } = useContext(AuthContext);

  return (
    <HStack>
      <Link href="/search" p="0">
        <Icon as={MdSearch} w="8" h="8" color="gray.100" />
      </Link>
      {currentUser && (
        <>
          <Button colorScheme="none" p="0">
            <Icon as={MdNotifications} w="8" h="8" color="gray.100" />
          </Button>
          <Link href="/post" p="0">
            <Icon as={MdNoteAdd} w="8" h="8" color="gray.100" />
          </Link>
        </>
      )}
      <HeaderMenuUser />
    </HStack>
  );
};

export default HeaderMenu;
