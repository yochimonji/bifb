import React from "react";
import { VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { DisplayUserProductList, DisplayUserInfo } from "../index";

const User = (): JSX.Element => {
  const location = useLocation();

  return (
    <VStack spacing={10} alignItems="flex-start">
      {/* ユーザー情報の部分 */}
      <DisplayUserInfo />
      {/* 作品の表示条件の選択 */}
      <DisplayUserProductList
        userUid={(location.state as { userUid: string }).userUid}
      />
    </VStack>
  );
};
export default User;
