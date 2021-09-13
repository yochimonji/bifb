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

const getProducts = async (tag: string) => {
  const productList = await db.collection("product").doc(tag).get();
  return productList;
};

const fetchProduct = () => {};

const fetchUser = () => {};
