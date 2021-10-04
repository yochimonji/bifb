import React, { useContext } from "react";
import { Icon, HStack, Link } from "@chakra-ui/react";
import { MdSearch, MdNoteAdd } from "react-icons/md";
import { Link as ReactLink } from "react-router-dom";

import { AuthContext } from "../../auth/AuthProvider";
import { HeaderMenuUser } from "..";

/**
 * ヘッダーのメニュー部分を作成する関数
 * @returns ヘッダーのメニューのコンポーネント
 */
const HeaderMenu = (): JSX.Element => {
  // コンテキストからユーザー情報取得
  const { currentUser } = useContext(AuthContext);

  return (
    <HStack>
      <Link as={ReactLink} to="search" p="0">
        <Icon as={MdSearch} w="8" h="8" color="gray.100" />
      </Link>
      {/* ログイン時のみお知らせボタンと作品投稿ボタンを表示 */}
      {currentUser && (
        <>
          {/* <Button colorScheme="none" p="0">
            <Icon as={MdNotifications} w="8" h="8" color="gray.100" />
          </Button> */}
          <Link as={ReactLink} to="/post" p="0">
            <Icon as={MdNoteAdd} w="8" h="8" color="gray.100" />
          </Link>
        </>
      )}
      <HeaderMenuUser />
    </HStack>
  );
};

export default HeaderMenu;
