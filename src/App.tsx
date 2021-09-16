import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import { AuthProvider } from "./auth/AuthProvider";
import PrivateRoute from "./auth/PrivateRoute";
import {
  Home,
  Product,
  Search,
  Post,
  User,
  UserEdit,
  Header,
} from "./components";

const App = (): JSX.Element => (
  // 認証プロバイダー
  <AuthProvider>
    {/* Chakra UI プロバイダー */}
    <ChakraProvider theme={theme}>
      <Header />
      {/* ルータープロバイダー */}
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/product">Product</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/Post">Post</Link>
            </li>
            <li>
              <Link to="/User">User</Link>
            </li>
            <li>
              <Link to="/User/Edit">UserEdit</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/product" exact>
            <Product />
          </Route>
          <Route path="/search" exact>
            <Search />
          </Route>
          <PrivateRoute path="/post" component={Post} exact />
          <PrivateRoute path="/user" component={User} exact />
          <PrivateRoute path="/user/edit" component={UserEdit} exact />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  </AuthProvider>
);

export default App;
