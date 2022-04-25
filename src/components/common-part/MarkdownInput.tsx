import React from "react";
import { FormControl, Textarea, FormHelperText } from "@chakra-ui/react";

type MarkdonwInputProps = {
  text: string;
  validText: boolean;
  handleText: React.ChangeEventHandler<HTMLTextAreaElement>;
};

const MarkdownInput = (props: MarkdonwInputProps): JSX.Element => (
  <FormControl>
    <Textarea
      value={props.text}
      onChange={props.handleText}
      placeholder="マークダウン形式で入力"
      bg="#FCFCFC"
      shadow="inner"
      minH="72"
      p="4"
    />
    {props.validText && (
      <FormHelperText color="red">説明を入力してください。</FormHelperText>
    )}
  </FormControl>
);

export default MarkdownInput;
