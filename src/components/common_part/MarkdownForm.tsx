import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
} from "@chakra-ui/react";

type MarkdownFormProps = {
  mainText: string;
  handleMainText: () => void;
  handleDropMarkdown: (instance: CodeMirror.Editor, event: DragEvent) => void;
};

const MarkdownForm = (): JSX.Element => (
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
      <TabPanel p="0" pt="4" />
      <TabPanel p="0" pt="4" />
    </TabPanels>
  </Tabs>
);

export default MarkdownForm;
