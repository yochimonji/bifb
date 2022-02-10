import React from "react";
import {
  HStack,
  Link,
  Button,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GithubIcon, ProductIcon } from "..";

type LinkLikeProps = {
  githubUrl: string;
  productUrl: string;
  sumLike: number;
  isLike: boolean;
  handleClickLikeButton: React.MouseEventHandler<HTMLButtonElement>;
};

const LinkLike = (props: LinkLikeProps): JSX.Element => (
  <HStack justify="space-between">
    {/* Githubと作品のリンクを表示 */}
    <HStack spacing="0">
      {props.githubUrl && (
        <Popover trigger="hover">
          <PopoverTrigger>
            <Link href={props.githubUrl} isExternal>
              <GithubIcon />
            </Link>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              <Link href={props.githubUrl} isExternal fontSize="sm">
                {props.githubUrl}
              </Link>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      )}
      {props.productUrl && (
        <Popover trigger="hover">
          <PopoverTrigger>
            <Link href={props.productUrl} isExternal pl="4">
              <ProductIcon />
            </Link>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              <Link href={props.productUrl} isExternal fontSize="sm">
                {props.productUrl}
              </Link>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      )}
    </HStack>
    {/* いいねボタン表示 */}
    {props.isLike ? (
      <Button
        leftIcon={<Icon as={AiFillHeart} w="6" h="6" color="#EEB6B7" />}
        variant="outline"
        rounded="full"
        onClick={props.handleClickLikeButton}
      >
        {props.sumLike}
      </Button>
    ) : (
      <Button
        leftIcon={<Icon as={AiOutlineHeart} w="6" h="6" />}
        variant="outline"
        rounded="full"
        onClick={props.handleClickLikeButton}
      >
        {props.sumLike}
      </Button>
    )}
  </HStack>
);

export default LinkLike;
