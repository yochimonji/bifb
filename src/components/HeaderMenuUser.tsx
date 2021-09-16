import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Link,
  Icon,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import { AuthContext } from "../auth/AuthProvider";

const HeaderMenuUser = (): JSX.Element => {
  const { googleLogin, logout, currentUser } = useContext(AuthContext);
  const history = useHistory();

  const handleGoogleLogin = () => {
    googleLogin(history);
  };

  const handleLogout = () => {
    logout(history);
  };

  return (
    <Menu placement="bottom-start">
      {currentUser ? (
        <>
          <MenuButton color="none" p="1">
            <Avatar
              w="10"
              h="10"
              src={currentUser?.photoURL as string | undefined}
              name={currentUser?.displayName as string | undefined}
            />
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href="User">
              {currentUser?.displayName}
              <span> さん</span>
            </MenuItem>
            <MenuItem as="a" href="/User">
              フィードバックした投稿
            </MenuItem>
            <MenuItem as="a" href="/User">
              いいねした投稿
            </MenuItem>
            <MenuDivider />
            <MenuItem as="a" href="/User/Edit">
              設定
            </MenuItem>
            <MenuItem
              variant="unstyled"
              fontWeight="medium"
              onClick={handleLogout}
            >
              ログアウト
            </MenuItem>
          </MenuList>
        </>
      ) : (
        <>
          <MenuButton color="none" p="1">
            <Avatar w="10" h="10" />
          </MenuButton>
          <MenuList p="4">
            <MenuItem
              icon={<Icon as={FcGoogle} w="8" h="8" />}
              rounded="full"
              shadow="md"
              variant="unstyled"
              fontWeight="bold"
              onClick={() => googleLogin(history)}
            >
              Login with Google
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default HeaderMenuUser;
