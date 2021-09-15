import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRouter = (props: string) => {
  const { currentUser } = useContext(AuthContext);
  const path = currentUser ? props : "/";
  return <Route path={path} exact />;
};

export default PrivateRouter;
