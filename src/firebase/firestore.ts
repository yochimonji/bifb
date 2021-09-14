import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
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
export const postTags = async (tags: string[]) => {
  const postTag = doc(db, "tags", "tags");

  // eslint-disable-next-line no-restricted-syntax
  for (const value of tags) {
    // eslint-disable-next-line no-await-in-loop
    await updateDoc(postTag, {
      tag: arrayUnion(value),
    });
  }
};

// フィードバックの情報をFirestoreに送るための関数
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

// User情報をFirestoreに送るための関数
export const postUserInfo = async (
  name: string,
  userIcon: string,
  comment: string,
  githubUrl: string,
  twitterUrl: string,
  otherUrl: string,
  giveGood: string[],
  giveFeedback: string[]
): Promise<boolean> => {
  const docUserInfo = await addDoc(collection(db, "userInfo"), {
    name,
    userIcon,
    comment,
    githubUrl,
    twitterUrl,
    otherUrl,
    giveGood,
    giveFeedback,
  });
  if (!docUserInfo.id) {
    return false;
  }
  return true;
};

function async(arg0: void) {
  throw new Error("Function not implemented.");
}
//

// 以下データの取得に関する記述
// export const fetchUser = async (userUid: string) => {
//   const userInfo = doc(db, "userInfo", userUid);
//   const userInfoSnap = await getDoc(userInfo);
//   console.log(userInfoSnap.data());
//   return userInfoSnap.data();
// };
