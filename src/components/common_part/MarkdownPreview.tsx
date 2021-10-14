import React from "react";
import { Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChackUIRenderer from "chakra-ui-markdown-renderer";

type MarkdonwPreviewProps = {
  text: string;
  isFeedback: boolean;
};

const MarkdownPreview = (props: MarkdonwPreviewProps): JSX.Element => (
  <>
    {props.isFeedback ? (
      <Text
        as={ReactMarkdown}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        components={ChackUIRenderer()}
        remarkPlugins={[remarkGfm]}
      >
        {props.text}
      </Text>
    ) : (
      <Text
        as={ReactMarkdown}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        components={ChackUIRenderer()}
        remarkPlugins={[remarkGfm]}
        bg="#FCFCFC"
        border="1px"
        borderColor="gray.200"
        rounded="md"
        minH="72"
        p="4"
      >
        {props.text}
      </Text>
    )}
  </>
);

export default MarkdownPreview;
