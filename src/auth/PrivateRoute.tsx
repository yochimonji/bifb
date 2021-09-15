import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

/**
 * 認証済みを判断し、認証状態の場合そのまま、非認証状態の場合ホームに移動
 * @param props ルーターで移動するパス
 * @returns 移動するパスを含んだRouteコンポーネント
 */
const PrivateRoute = (path: string): JSX.Element => {
  const { currentUser } = useContext(AuthContext);
  const newPath = currentUser ? path : "/";
  return <Route path={newPath} exact />;
};

export default PrivateRoute;
