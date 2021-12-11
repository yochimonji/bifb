/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SimpleGrid } from "@chakra-ui/react";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import React from "react";
import DisplayProduct from "../common_part/DisplayProduct";

type Props = {
  productData: QuerySnapshot<DocumentData> | undefined;
  tagList: string[];
};
export const FilterProductByTag = (props: Props): JSX.Element => {
  console.log("tag", props.tagList);

  return (
    <SimpleGrid
      w="100%"
      columns={[1, null, 2]}
      spacingX="50px"
      spacingY="50px"
      justifyItems="center"
    >
      {props.productData &&
        props.productData.docs.map(
          (eachObjData: QueryDocumentSnapshot<DocumentData>) => (
            <DisplayProduct
              key={eachObjData.id}
              productId={eachObjData.id}
              productIconUrl={eachObjData.data().productIconUrl as string}
              // userIconUrl={userIconUrl}
              // userName={userName}
              productTitle={eachObjData.data().productTitle as string}
              productAbstract={eachObjData.data().productAbstract as string}
              postDate={eachObjData.data().postDate as string}
              // editDate={eachObjData.data().editDate as string}
              sumLike={eachObjData.data().sumLike as number}
            />
          )
        )}
    </SimpleGrid>
  );
};

export default FilterProductByTag;
