import React from "react";
import { ChakraProvider, Container, theme, Box } from "@chakra-ui/react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./auth/AuthProvider";
import PrivateRoute from "./auth/PrivateRoute";
import { Product, Search, Post, User, UserEdit, Header } from "./components";

import Home from "./components/home/Home";

const App = (): JSX.Element => (
  // 認証プロバイダー
  <AuthProvider>
    {/* Chakra UI プロバイダー */}
    <ChakraProvider theme={theme}>
      {/* ルータープロバイダー */}
      <BrowserRouter>
        <Header />
        <Box>
          <Container maxW="container.lg">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/product" component={Product} exact />
              <Route path="/search" component={Search} exact />
              <PrivateRoute path="/post" component={Post} exact />
              <PrivateRoute path="/user" component={User} exact />
              <PrivateRoute path="/user/edit" component={UserEdit} exact />
            </Switch>
          </Container>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  </AuthProvider>
);

export default App;
