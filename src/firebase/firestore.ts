import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  query,
  orderBy,
  where,
  setDoc,
} from "firebase/firestore";
import firebaseConfig from "./config";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/**
 * product collectionに作品を登録
 * @param productTitle 作品タイトル
 * @param productAbstract 作品概要
 * @param productIconUrl 作品アイコンのURL
 * @param githubUrl GithubURL
 * @param productUrl 作品のURL
 * @param tags タグ
 * @param mainText 作品説明、本文
 * @param userUid ユーザーID
 * @returns True or False
 */
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
    postDate: new Date().toLocaleString(),
    editDate: new Date().toLocaleString(),
    goodSum: 0,
    userUid,
  });
  if (!docProduct.id) {
    return false;
  }
  return true;
};

/**
 * タグの配列に対して、配列内にあるtag collectionに存在していないタグをtag collectionにタグを追加
 * @param tags タグの一覧
 * @returns True or False
 */
export const postTags = async (tags: string[]): Promise<boolean> => {
  const postTag = doc(db, "tags", "tags");

  // eslint-disable-next-line no-restricted-syntax
  for (const value of tags) {
    // eslint-disable-next-line no-await-in-loop
    await updateDoc(postTag, {
      tag: arrayUnion(value),
    });
  }

  return true;
};

/**
 * フィードバックの情報をFirestoreに登録する
 * @param userUid ユーザーIDを
 * @param feedbackText フィードバックの本文
 * @param productId フィードバックが投稿された作品のID
 * @returns
 */
export const postFeedbacks = async (
  userUid: string,
  feedbackText: string,
  productId: string
): Promise<boolean> => {
  const docFeedback = await addDoc(collection(db, "feedback"), {
    userUid,
    feedbackText,
    productId,
    postDate: new Date().toLocaleString(),
    goodSum: 0,
  });
  if (!docFeedback.id) {
    return false;
  }
  return true;
};

/**
 * User情報をFirestoreに登録
 * @param name ユーザー名
 * @param userIcon ユーザーのアイコン
 * @param comment コメント
 * @param githubUrl GithubURL
 * @param twitterUrl TwitterURL
 * @param otherUrl その他のURL
 * @param giveGood いいねをしている作品IDの一覧
 * @param giveFeedback フェードバックをしている作品のIDを一覧
 * @returns
 */
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

/**
 * userUidを使ってユーザの情報をFirestoreから取得してくる関数
 *
 * ----取得したオブジェクトの使用例----
 * 以下のようにして使うと、dataにObject型としてデータが取得でき、
 * この例ではdataオブジェクト内のnameが出力されている
 * const [tmp, setTmp] = React.useState("");
 * React.useEffect(() => {
 *    const tmpData = fetchUserInfo("6syVUuKgFlDQqKAkqg2A").then((data) => {
 *        setTmp(data);
 *    });
 * });
 * return(
 * {tmp.name}
 * )
 *
 * @param userUid ユーザーID
 * @returns ユーザーIDと一致するuserInfo collection内、ドキュメントのデータのオブジェクト
 */
export const fetchUserInfo = async (userUid: string) => {
  const searchUserUid = doc(db, "userInfo", userUid);
  const loadUserData = await getDoc(searchUserUid);

  return loadUserData.data();
};

/**
 * productIdを使って作品情報をFirestoreから取得してくる関数
 *
 * returnされたオブジェクトの使用例は、fetchUserInfo関数の使用例を参照
 *
 * @param productId 作品ID
 * @returns 作品IDと一致するproduct collection内、ドキュメントのデータのオブジェクト
 */
export const fetchProduct = async (productId: string) => {
  const searchProduct = doc(db, "product", productId);
  const loadProductInfo = await getDoc(searchProduct);

  return loadProductInfo.data();
};

/**
 * 作品IDを使って、作品に投稿されたフィードバック情報を返す機能
 * ただし現状、フィードバック情報の一覧的なものの最後のものの情報しか表示されない
 * 各情報を保存する方法について要検討
 *
 * @param productId 作品ID
 * @returns
 */
export const fetchFeedback = async (productId: string) => {
  const q = query(
    collection(db, "feedback"),
    where("productId", "==", productId)
  );
  const querySnapshot = await getDocs(q);

  let dataset = {};
  querySnapshot.forEach((data) => {
    console.log(data.id, " => ", data.data());
    dataset = data.data();
  });

  return dataset;
};

/**
 * トレンド・新着・いいね数によって、作品をソートする
 * ただし現状、リスト的な表示はできず、最後のものしか表示されない 要改善
 * トレンドをどう表現するかについても要検討
 *
 * @param conditions トレンド｜新着｜いいね数大｜いいね数小
 * @param sortType  昇順｜降順
 * @returns
 */
export const fetchProducts = async (conditions: string, sortType: string) => {
  let q;
  if (conditions === "トレンド") {
    if (sortType === "降順") {
      q = query(collection(db, "product"), orderBy("goodSum", "desc"));
    }
    q = query(collection(db, "product"), orderBy("goodSum"));
  } else if (conditions === "新着") {
    if (sortType === "降順") {
      q = query(collection(db, "product"), orderBy("postDate", "desc"));
    }
    q = query(collection(db, "product"), orderBy("postDate"));
  } else if (conditions === "いいね数大") {
    if (sortType === "降順") {
      q = query(collection(db, "product"), orderBy("postDate", "desc"));
    }
    q = query(collection(db, "product"), orderBy("goodSum"));
  } else if (conditions === "いいね数小") {
    if (sortType === "降順") {
      q = query(collection(db, "product"), orderBy("postDate"));
    }
    q = query(collection(db, "product"), orderBy("goodSum", "desc"));
  }

  const querySnapshot = await getDocs(q);

  let dataset = {};
  querySnapshot.forEach((data) => {
    console.log(data.id, " => ", data.data());
    dataset = data.data();
    console.log(dataset);
  });

  return dataset;
};

/**
 * user画面において、投稿済み｜フィードバック｜いいね｜から選択された作品の表示
 * 動作未確認
 * 「いいね」が選択された場合の挙動について要検討
 *
 * @param userUid ユーザーID
 * @param searchType 投稿済み｜フィードバック｜いいね
 * @returns
 */
export const fetchProductsUser = async (
  userUid: string,
  searchType: string
) => {
  let q;
  if (searchType === "投稿済み") {
    q = query(collection(db, "product"), where("userUid", "==", userUid));
  } else if (searchType === "フィードバック") {
    q = query(collection(db, "feedback"), where("userUid", "==", userUid));
  } else if (searchType === "いいね") {
    // サーチの方法について要検討
    return 0;
  }

  const querySnapshot = await getDocs(q);

  let dataset = {};
  querySnapshot.forEach((data) => {
    console.log(data.id, " => ", data.data());
    dataset = data.data();
    console.log(dataset);
  });

  return dataset;
};

/**
 * 検索画面で文字が入力されるにつれてタグが絞り込まれる機能
 * @param inputText 画面に入力された文字
 * @returns 画面に入力された文字を含むタグ
 */
export const fetchTags = async (inputText: string) => {
  const tagsList = doc(db, "tags", "tags");
  const loadProductInfo = await getDoc(tagsList);

  const obj = loadProductInfo.data();

  // for (const key in obj) {
  //   console.log(obj(key));
  // }
};
