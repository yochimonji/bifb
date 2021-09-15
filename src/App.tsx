import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";

import {} from "./components/index";

const App = (): JSX.Element => <ChakraProvider theme={theme} />;

export default App;
