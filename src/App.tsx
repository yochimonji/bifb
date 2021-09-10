import * as React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";

const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <Box>開発がんばろー</Box>
  </ChakraProvider>
);

export default App;
