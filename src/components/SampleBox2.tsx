import * as React from "react";
import { Box } from "@chakra-ui/react";

import { SampleBox2Props } from "./index";

/**
 * SampleBox2を描画する関数
 * @param text 表示するテキスト
 * @param num 表示する数値
 * @returns 青背景のBox
 */
const SampleBox2 = (props: SampleBox2Props): JSX.Element => (
  <Box bg="blue.200">
    {props.text}
    {props.num}
  </Box>
);

export default SampleBox2;
