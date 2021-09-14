import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { SampleBox1, SampleBox2 } from "./components/index";

const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <SampleBox1 text="開発がんばろー" />
    <SampleBox2 text="おー！！" num={88888888} />
  </ChakraProvider>
);

export default App;
