import { createStore } from "redux";

const initialState = {
  paramSearchStatus: "", // no-string | inputText | searchTag
  paramInputText: "inputだよー",
  paramSearchTag: "tagだよー",
};

const reducer = (
  state = initialState,
  action: { type: string; paramSearchStatus: string; inputText: string; selectedTagList: string }
) => {
  switch (action.type) {
    case "Change_Input_Text":
      return {
        paramSearchStatus: "inputText",
        paramInputText: action.inputText,
        paramSearchTag: "",
      };
    case "Change_TagList":
      return {
        paramSearchStatus: "searchTag",
        paramInputText: "",
        paramSearchTag: action.selectedTagList,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
