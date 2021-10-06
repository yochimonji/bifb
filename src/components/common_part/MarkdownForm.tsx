import React, { useRef } from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stack,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { BsImage } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";

import { MarkdownInput, MarkdownPreview } from "../index";

type MarkdownFormProps = {
  pageType: "post" | "product";
  text: string;
  validText: boolean;
  handleText: React.ChangeEventHandler<HTMLTextAreaElement>;
  handlePost: React.MouseEventHandler<HTMLButtonElement>;
  // setText: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * マークダウンの入力フォームのコンポーネントの関数
 * @param props.pygeType post：作品投稿ページ、product：作品詳細ページのレビュー投稿用
 * @param props.mainText 作品の説明の本文
 * @param props.handleMainText 説明の変更に合わせて実行する関数
 * @param props.handlePost 投稿ボタンを押した際の処理をする関数
 * @returns Markdownのコンポーネント
 */
const MarkdownForm = (props: MarkdownFormProps): JSX.Element => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const onClickAddButton = () => {
    if (imageInputRef.current != null) {
      imageInputRef.current.click();
      console.log("click! click!!");
    }
  };

  return (
    <Stack pb="8">
      <Tabs variant="unstyled">
        <Stack
          flexDir={{ base: "column-reverse", sm: "row" }}
          justify="space-between"
        >
          <TabList pt="2">
            <Tab
              rounded="full"
              fontSize={{ base: "sm", md: "md" }}
              _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
            >
              マークダウン
            </Tab>
            <Tab
              rounded="full"
              fontSize={{ base: "sm", md: "md" }}
              _selected={{ color: "#FCFCFC", bg: "#99CED4" }}
            >
              プレビュー
            </Tab>
          </TabList>
          {props.pageType === "post" && (
            <Button variant="outline" w="max-content">
              <Icon
                as={AiFillGithub}
                h="10"
                w="10"
                pr="2"
                fontSize={{ base: "sm", md: "md" }}
              />
              GitHubから読み込む
            </Button>
          )}
        </Stack>
        <TabPanels>
          <TabPanel p="0" pt="4">
            <MarkdownInput
              text={props.text}
              validText={props.validText}
              handleText={props.handleText}
            />
          </TabPanel>
          <TabPanel p="0" pt="4">
            <MarkdownPreview text={props.text} isFeedback={false} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <HStack justify="space-between">
        {/* 下のinputの代わりの画像変更用ボタン */}
        <Button
          leftIcon={<BsImage />}
          variant="ghost"
          onClick={onClickAddButton}
        >
          {/* 上のButtonをクリックするとinputもクリックされる */}
          <input
            hidden
            ref={imageInputRef}
            type="file"
            accept="image/*"
            // onChange={}
          />
          画像を追加
        </Button>
        <Button variant="outline" onClick={props.handlePost}>
          {props.pageType === "post" && "作品を投稿する"}
          {props.pageType === "product" && "フィードバックを投稿する"}
        </Button>
      </HStack>
    </Stack>
  );
};

export default MarkdownForm;
