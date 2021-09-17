import React, { ReactEventHandler, useState } from "react";
import {
  Input,
  Textarea,
  HStack,
  Stack,
  Image,
  Box,
  Icon,
  Button,
} from "@chakra-ui/react";
import { BsImage } from "react-icons/bs";

const Post = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [tags, setTags] = useState("");
  const [mainText, setMainText] = useState("");

  const handleTitle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTitle(event.target.value);
  };

  const handleAbstract: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setAbstract(event.target.value);
  };

  return (
    <Stack>
      <HStack spacing="4" pt="8" align="start">
        <Stack>
          <Image minW="200px" h="200px" border="gray" />
          <Button leftIcon={<BsImage />} variant="ghost">
            変更する
          </Button>
        </Stack>
        <Stack w="100%" h="200px">
          <Input
            w="100%"
            h="40%"
            placeholder="作品タイトル"
            fontSize="xl"
            variant="flushed"
            value={title}
            onChange={handleTitle}
          />
          <Input
            w="100%"
            h="60%"
            placeholder="この作品を一言で表すと？"
            variant="flushed"
            value={abstract}
            onChange={handleAbstract}
          />
        </Stack>
      </HStack>
    </Stack>
  );
};

export default Post;
