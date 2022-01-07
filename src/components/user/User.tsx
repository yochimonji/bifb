import React from "react";
import { VStack } from "@chakra-ui/react";
import { DisplayUserProductList, DisplayUserInfo } from "../index";

const User = (): JSX.Element => (
  <VStack spacing={10} alignItems="flex-start">
    {/* ユーザー情報の部分 */}
    <DisplayUserInfo />
    {/* 作品の表示条件の選択 */}
    <DisplayUserProductList />
  </VStack>
);
export default User;
