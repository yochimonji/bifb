import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { collection, addDoc } from "firebase/firestore";
import firebaseConfig from "./config";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 新しいドキュメントの作成
// product collectionに作品を登録
export const postProduct = async (
  productTitle: string,
  productAbstract: string,
  productIconUrl: string,
  githubUrl: string,
  productUrl: string,
  tags: string[],
  mainText: string,
  userUid: string
): Promise<boolean> => {
  const docProduct = await addDoc(collection(db, "product"), {
    productTitle,
    productAbstract,
    productIconUrl,
    githubUrl,
    productUrl,
    tags,
    mainText,
    postData: new Date().toLocaleString(),
    editData: new Date().toLocaleString(),
    userUid,
  });
  if (!docProduct.id) {
    return false;
  }
  return true;
};

// // 作品を追加するときのタグが存在していなかったら、tag collectionにタグを追加
// export const postTags = async (tags: string[]): Promise<boolean> => {
//   const docTags = doc(db, "tags", "tags");
//   await setDoc(docTags, { capital: true }, { merge: true })
// };

export const postFeedbacks = async (
  userUid: string,
  feedbackText: string
): Promise<boolean> => {
  const docFeedback = await addDoc(collection(db, "feedback"), {
    userUid,
    feedbackText,
    postData: new Date().toLocaleString(),
    goodSum: 0,
  });
  if (!docFeedback.id) {
    return false;
  }
  return true;
};

// 以下データの取得に関する記述
// export const fetchProducts = () => {};

// const fetchProduct = () => {};

// const fetchUser = () => {};
