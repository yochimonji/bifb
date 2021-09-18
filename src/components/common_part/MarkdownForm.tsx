import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Textarea,
  Stack,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChackUIRenderer from "chakra-ui-markdown-renderer";
import { BsImage } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";

type MarkdownFormProps = {
  needImportGithub: boolean;
  postText: string;
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
  <Stack>
    <Tabs variant="unstyled">
      <HStack justify="space-between">
        <TabList>
          <Tab rounded="full" _selected={{ color: "#FCFCFC", bg: "#99CED4" }}>
            マークダウン
          </Tab>
          <Tab rounded="full" _selected={{ color: "#FCFCFC", bg: "#99CED4" }}>
            プレビュー
          </Tab>
        </TabList>
        {props.needImportGithub && (
          <Button variant="outline">
            <Icon as={AiFillGithub} h="10" w="10" pr="2" />
            GitHubから読み込む
          </Button>
        )}
      </HStack>
      <TabPanels>
        <TabPanel p="0" pt="4">
          <Textarea
            value={props.mainText}
            onChange={props.handleMainText}
            bg="#FCFCFC"
            shadow="inner"
            minH="60"
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
            minH="60"
            p="4"
          >
            {props.mainText}
          </Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
    <HStack justify="space-between">
      {/* 下のButtonをクリックするとinputもクリックされる */}
      <input
        hidden
        // ref={}
        type="file"
        accept="image/*"
        // onChange={}
      />
      {/* 上のinputの代わりの画像変更用ボタン */}
      <Button
        leftIcon={<BsImage />}
        variant="ghost"
        // onClick={}
      >
        追加する
      </Button>
      <Button variant="outline">{props.postText}</Button>
    </HStack>
  </Stack>
);

export default MarkdownForm;
