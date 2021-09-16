import React, { useContext } from "react";
import { Button, Icon, HStack, Avatar } from "@chakra-ui/react";
import { MdSearch, MdNotifications, MdNoteAdd } from "react-icons/md";
import { useHistory, Link as ReactLink } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { AuthContext } from "../auth/AuthProvider";

const HeaderMenu = (): JSX.Element => {
  const { googleLogin, logout, currentUser } = useContext(AuthContext);
  const history = useHistory();

  const handleGoogleLogin = () => {
    googleLogin(history);
  };

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
      <Button colorScheme="none" p="1">
        <Avatar
          w="10"
          h="10"
          src={currentUser?.photoURL as string | undefined}
          name={currentUser?.displayName as string | undefined}
        />
      </Button>
    </HStack>
  );
};

export default HeaderMenu;
