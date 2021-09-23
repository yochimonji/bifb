import React from "react";
import { HStack, Link } from "@chakra-ui/react";
import { GithubIcon, ProductIcon } from "..";

type LinkLikeProps = {
  githubUrl: string;
  productUrl: string;
};

const LinkLike = (props: LinkLikeProps): JSX.Element => (
  <HStack>
    <Link href={props.githubUrl} isExternal>
      <GithubIcon />
    </Link>
    {props.productUrl && (
      <Link href={props.productUrl} isExternal>
        <ProductIcon />
      </Link>
    )}
  </HStack>
);

export default LinkLike;
