import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { SampleBox1, SampleBox2 } from "./components/index";

// 動作確認用のファイルのimport及び実行結果の表示
import { postProduct } from "./firebase/firestore";

const tmp = postProduct("a", "b", "c", "d", "e", ["f", "g"], "h", "i");
const result = tmp.toString();

const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <SampleBox1 text="開発がんばろー" />
    <SampleBox2 text="おー！！" num={88888888} />
    <SampleBox1 text={result} />
  </ChakraProvider>
);

export default App;
