import * as React from "react";
import { Box } from "@chakra-ui/react";

type SampleBox1Props = {
  text: string;
};

// VSCodeでは関数の1つ上の行で " /** " Enter で下のようなJSDocが書ける
/**
 * SampleBox1を描画する関数
 * @param text 表示する文章
 * @returns 赤背景のBox
 */
const SampleBox1 = (props: SampleBox1Props): JSX.Element => (
  <Box bg="red.200">{props.text}</Box>
);

export default SampleBox1;
