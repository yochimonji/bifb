import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { DisplayProduct, DisplayProductProps } from "../index";

const DisplayProducts = (props: DisplayProductProps[]): JSX.Element => (
  <SimpleGrid
    w="100%"
    columns={[1, null, 2]}
    spacingX="50px"
    spacingY="50px"
    justifyItems="center"
  >
    {props &&
      // props.map()や[...props].mapはエラーが発生
      // Object.valuesを使うことでただの配列でもmap()を使えるようになる
      Object.values(props).map((eachObjData) => (
        <DisplayProduct {...eachObjData} key={eachObjData.productId} />
      ))}
  </SimpleGrid>
);
export default DisplayProducts;
