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
import GithubIcon from "../common_part/GithubIcon";
import ProductIcon from "../common_part/ProductIcon";

type LinkFavoriteProps = {
  githubUrl: string;
  productUrl: string;
  favoriteNum: number;
  isFavorite: boolean;
  handleClickFavoriteButton: React.MouseEventHandler<HTMLButtonElement>;
};

const LinkFavorite = (props: LinkFavoriteProps): JSX.Element => (
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
    {props.isFavorite ? (
      <Button
        leftIcon={<Icon as={AiFillHeart} w="6" h="6" color="#EEB6B7" />}
        variant="outline"
        rounded="full"
        onClick={props.handleClickFavoriteButton}
      >
        {props.favoriteNum}
      </Button>
    ) : (
      <Button
        leftIcon={<Icon as={AiOutlineHeart} w="6" h="6" />}
        variant="outline"
        rounded="full"
        onClick={props.handleClickFavoriteButton}
      >
        {props.favoriteNum}
      </Button>
    )}
  </HStack>
);

export default LinkFavorite;
