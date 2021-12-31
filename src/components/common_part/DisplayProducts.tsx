import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { DisplayProduct } from "../index";

type Props = {
  productData: QuerySnapshot<DocumentData> | undefined;
};

const DisplayProducts = (props: Props): JSX.Element => {
  const userIconUrl = "";
  const userName = "testName";

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

export default DisplayProducts;
