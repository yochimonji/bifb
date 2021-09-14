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
  // eslint-disable-next-line no-console
  console.log("document written with ID", docProduct.id);
  return true;
};

// 作品を追加するときのタグが存在していなかったら、tag collectionにタグを追加
export const postTags = async (tags: string[]): Promise<boolean> => {
  const docProduct = await addDoc(collection(db, "tags"), {});
  if (!docProduct.id) {
    return false;
  }
  // eslint-disable-next-line no-console
  console.log("document written with ID", docProduct.id);
  return true;
};

// 以下データの取得に関する記述
// export const fetchProducts = () => {};

// const fetchProduct = () => {};

// const fetchUser = () => {};
