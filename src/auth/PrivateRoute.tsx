import React, { useContext } from "react";
import { Route, RouteProps } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

import { Home } from "../components";

/**
 * 認証済みを判断し、認証状態の場合そのまま、非認証状態の場合ホームに移動
 * @param props ルーターで移動するパス
 * @returns 移動するパスを含んだRouteコンポーネント
 */
const PrivateRoute: React.VFC<RouteProps> = (props) => {
  const { currentUser } = useContext(AuthContext);
  const Component = currentUser ? props.component : Home;
  return <Route component={Component} exact={props.exact} />;
};

export default PrivateRoute;
