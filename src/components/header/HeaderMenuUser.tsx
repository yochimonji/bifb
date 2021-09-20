import React, { useContext, useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

import { AuthContext } from "../../auth/AuthProvider";
import { fetchUserInfo } from "../../firebase/firestore";

/**
 * ユーザーアイコンの表示とクリックした際の動作を行う関数
 * @returns ヘッダーのユーザーアイコンのコンポーネント
 */
const HeaderMenuUser = (): JSX.Element => {
  const { googleLogin, logout, currentUser } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [userIcon, setUserIcon] = useState("");

  const handleGoogleLogin = () => {
    googleLogin();
  };

  const handleLogout = () => {
    logout();
  };

  // currentUserの変更に合わせてユーザー名とユーザーアイコンを変更する
  // Firestoreからユーザー名とユーザーアイコンを取得する
  useEffect(() => {
    if (currentUser !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tmpUserInfo = fetchUserInfo(currentUser.uid).then((userInfo) => {
        if (userInfo) {
          setUserName(userInfo.name);
          setUserIcon(userInfo.userIcon);
        }
      });
    }
  });

  return (
    <Menu placement="bottom-start">
      {/* ログイン時と非ログイン時で表示するメニューを変更する */}
      {currentUser ? (
        <>
          <MenuButton color="none" p="1">
            <Avatar w="10" h="10" src={userIcon} name={userName} />
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href="User">
              {userName}
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
              onClick={handleGoogleLogin}
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
