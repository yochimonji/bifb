import React from "react";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Textarea,
  Box,
} from "@chakra-ui/react";
import SimpleMDE, { SimpleMDEReactProps } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type MarkdownFormProps = {
  mainText: string;
  handleMainText: SimpleMDEReactProps["onChange"];
};

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
        <SimpleMDE value={props.mainText} onChange={props.handleMainText} />
      </TabPanel>
      <TabPanel p="0" pt="4">
        <Box p="2" pl="4" pr="4" rounded="md" shadow="inner" bg="#FCFCFC">
          {props.mainText}
        </Box>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default MarkdownForm;
