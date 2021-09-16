import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Avatar,
  Link,
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
      <MenuButton colorScheme="none" p="1">
        <Avatar
          w="10"
          h="10"
          src={currentUser?.photoURL as string | undefined}
          name={currentUser?.displayName as string | undefined}
        />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Link href="/User">
            {currentUser?.displayName}
            <span> さん</span>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/User">フィードバックした投稿</Link>
        </MenuItem>
        <MenuItem>
          <Link href="/User">いいねした投稿</Link>
        </MenuItem>
        <MenuDivider />
        <MenuItem>
          <Link href="/User/Edit">設定</Link>
        </MenuItem>
        <MenuItem>
          <Button
            variant="unstyled"
            fontWeight="medium"
            _hover={{ textDecorationLine: "underline" }}
            onClick={handleLogout}
          >
            ログアウト
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HeaderMenuUser;
