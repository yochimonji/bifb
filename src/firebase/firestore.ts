import firebase from "firebase/compat";
import "firebase/compat/firestore";
import firebaseConfig from "./config";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 新しいドキュメントの作成
// Add a new document "test"(ex) in collection "product"
const productData = {
  productId: Number,
  icon: null,
  title: String,
  serId: Number,
  postData: Date,
  editData: Date,
  feedback: Object,
};
const resProduct = await db.collection("product").doc("test").set(productData);

// 上と同様にして、
// feedback collection
// user collection
// tag collection
// の追加についても必要

const getApplications = () => {
  const appId = ""; // アプリIDを呼び出す操作
  const appIcon = ""; // アプリのアイコンを呼び出す操作
  // 以下に他にも呼び出すものを記述
};

const fetchApplication = () => {};

const fetchUser = () => {};
