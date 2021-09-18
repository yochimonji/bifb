import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChackUIRenderer from "chakra-ui-markdown-renderer";

type MarkdownFormProps = {
  mainText: string;
  handleMainText: React.ChangeEventHandler<HTMLTextAreaElement>;
};

/**
 * マークダウンの入力フォームのコンポーネントの関数
 * @param props.mainText 作品の説明の本文
 * @param props.handleMainText 説明の変更に合わせて実行する関数
 * @returns Markdownのコンポーネント
 */
const MarkdownForm = (props: MarkdownFormProps): JSX.Element => (
  <Tabs variant="unstyled">
    <TabList>
      <Tab rounded="full" _selected={{ color: "#FCFCFC", bg: "#99CED4" }}>
        マークダウン
      </Tab>
      <Tab rounded="full" _selected={{ color: "#FCFCFC", bg: "#99CED4" }}>
        プレビュー
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel p="0" pt="4">
        <Textarea
          value={props.mainText}
          onChange={props.handleMainText}
          bg="#FCFCFC"
          shadow="inner"
          h="80"
          p="4"
        />
      </TabPanel>
      <TabPanel p="0" pt="4">
        <Text
          as={ReactMarkdown}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          components={ChackUIRenderer()}
          remarkPlugins={[remarkGfm]}
          bg="#FCFCFC"
          border="1px"
          borderColor="gray.200"
          rounded="md"
          p="4"
        >
          {props.mainText}
        </Text>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default MarkdownForm;
