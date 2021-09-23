import React from "react";
import { HStack, Link, Button, Icon } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GithubIcon, ProductIcon } from "..";

type LinkLikeProps = {
  githubUrl: string;
  productUrl: string;
  sumLike: number;
};

const LinkLike = (props: LinkLikeProps): JSX.Element => (
  <HStack justify="space-between">
    {/* Githubと作品のリンクを表示 */}
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
    {/* いいねボタン表示 */}
    <Button
      leftIcon={<Icon as={AiOutlineHeart} w="6" h="6" />}
      variant="outline"
      rounded="full"
    >
      {props.sumLike}
    </Button>
  </HStack>
);

export default LinkLike;
