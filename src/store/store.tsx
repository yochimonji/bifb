import { createStore } from "redux";

const initialState = {
  paramSearchStatus: "", // "" | inputText | searchTag
  paramInputText: "inputだよー",
  paramSearchTag: "tagだよー",
};

const reducer = (
  state = initialState,
  action: { type: string; paramSearchStatus: string; inputText: string; selectedTagList: string }
) => {
  switch (action.type) {
    case "CHANGE_INPUT_TEXT":
      return {
        paramSearchStatus: "INPUT_TEXT",
        paramInputText: action.inputText,
        paramSearchTag: "",
      };
    case "CHANGE_TAGLIST":
      return {
        paramSearchStatus: "TAGLIST",
        paramInputText: "",
        paramSearchTag: action.selectedTagList,
      };
    case "CHANGE_TO_NULL":
      return {
        paramSearchStatus: "",
        paramInputText: "",
        paramSearchTag: "",
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
