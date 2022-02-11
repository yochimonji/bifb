/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  where,
  setDoc,
  DocumentData,
  QuerySnapshot,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore();

/**
 * タグの配列に対して、配列内にあるtag collectionに存在していないタグをtag collectionに追加
 * @param tags タグの一覧
 */
export const postTags = (tags: string[], conditions: string): void => {
  async function setData(name: string, sum: number) {
    await setDoc(doc(db, "tags", name), {
      sum,
    });
  }

  async function getData(name: string) {
    const tagData = await getDoc(doc(db, "tags", name));
    const tagname = tagData.id;
    if (tagData.exists()) {
      if (conditions === "EXIST") {
        const temtemA = setData(tagname, Number(tagData.get("sum")));
      } else if (conditions === "NEW") {
        const temtemA = setData(tagname, Number(tagData.get("sum")) + 1);
      }
    } else {
      const tmptmptmp = setData(tagname, 1);
    }
  }

  if (!(tags.length === 1) && tags[0] === "") {
    for (let i = 0; i < tags.length; i += 1) {
      const tmp = getData(tags[i]);
    }
  }
};

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
 * @returns 新規に作成した作品ID
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
): Promise<string> => {
  // 現時点で存在しないタグをタグコレクションに追加
  const tmp = postTags(tags, "NEW");
  // 作品情報の送信
  const productId = uuidv4();
  const newProduct = await setDoc(doc(db, "product", productId), {
    productTitle,
    productAbstract,
    productIconUrl,
    githubUrl,
    productUrl,
    tags,
    mainText,
    postDate: new Date().toLocaleString(),
    editDate: new Date().toLocaleString(),
    sumLike: 0,
    feedbackNum: 0,
    userUid,
    productId,
  });
  return productId;
};

/**
 * フィードバックの情報をFirestoreに登録する
 * @param userUid ユーザーIDを
 * @param feedbackText フィードバックの本文
 * @param productId フィードバックが投稿された作品のID
 * @returns 新規に作成したフィードバックのID
 */
export const postFeedbacks = async (userUid: string, feedbackText: string, productId: string): Promise<string> => {
  // feedbackコレクションに登録
  const newFeedback = await addDoc(collection(db, "feedback"), {
    userUid,
    feedbackText,
    productId,
    postDate: new Date().toLocaleString(),
    sumLike: 0,
  });

  // userInfoコレクションに登録
  const q = query(collection(db, "userInfo"), where("userUid", "==", userUid));
  const userInfo = await getDocs(q);
  await updateDoc(userInfo.docs[0].ref, {
    giveFeedback: arrayUnion(productId),
  });
  return newFeedback.id;
};

/**
 * User情報をFirestoreに登録
 * @param name ユーザー名
 * @param userIcon ユーザーのアイコン
 * @param comment コメント
 * @param githubUrl GithubURL
 * @param twitterUrl TwitterURL
 * @param otherUrl その他のURL
 * @param giveLike いいねをしている作品IDの一覧
 * @param giveFeedback フェードバックをしている作品のIDを一覧
 * @param userUid ユーザーID
 * @returns
 */
export const postUserInfo = async (
  name: string,
  userIcon: string,
  comment: string,
  githubUrl: string,
  twitterUrl: string,
  otherUrl: string,
  giveLike: string[],
  giveFeedback: string[],
  userUid: string
): Promise<void> => {
  const tmp = await setDoc(doc(db, "userInfo", userUid), {
    name,
    userIcon,
    comment,
    githubUrl,
    twitterUrl,
    otherUrl,
    giveLike,
    giveFeedback,
    userUid,
  });
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
export const fetchUserInfo = async (userUid: string): Promise<DocumentData | null> => {
  const q = query(collection(db, "userInfo"), where("userUid", "==", userUid));
  const loadUserData = await getDocs(q);
  if (loadUserData.empty) return null;
  return loadUserData.docs[0].data();
};

/**
 * userUidListに存在する全てのユーザー情報をFirebaseから取得してくる関数
 * @param userUidList userUidの配列
 * @returns userUidListと一致する全てのユーザー情報のオブジェクト
 */
export const fetchUserInfos = async (userUidList: string[]): Promise<QuerySnapshot<DocumentData> | null> => {
  if (userUidList.length === 0) return null;
  const q = query(collection(db, "userInfo"), where("userUid", "in", userUidList));
  const loadUserDatas = await getDocs(q);
  return loadUserDatas;
};

/**
 * productIdを使って作品情報をFirestoreから取得してくる関数
 *
 * returnされたオブジェクトの使用例は、fetchUserInfo関数の使用例を参照
 *
 * @param productId 作品ID
 * @returns 作品IDと一致するproduct collection内、ドキュメントのデータのオブジェクト
 */
export const fetchProduct = async (productId: string): Promise<DocumentData | undefined> => {
  const searchProduct = doc(db, "product", productId);
  const loadProductInfo = await getDoc(searchProduct);

  return loadProductInfo.data();
};

/**
 * 作品IDを使って、作品に投稿されたフィードバック情報を返す機能
 * 
 * --取得したオブジェクト配列における各データの取得方法--

 * const [tmp, setTmp] = React.useState("");
 * const dataset: any[] = [];
 * React.useEffect(() => {
 *  const tmpData = fetchFeedback("ay4JTy57wVMdRM2ghaCd").then((data) => {
 *    data.forEach((eachData) => {
 *      dataset.push(eachData.data());
 *        setTmp(dataset[0]);
 *      });
 *    });
 * });
 * 
 * return (
 *  {tmp.feedback}
 * )
 * 
 * @param productId 作品のID
 * @returns オブジェクトの配列
 */
export const fetchFeedback = async (productId: string): Promise<DocumentData | undefined> => {
  const q = query(collection(db, "feedback"), where("productId", "==", productId), orderBy("postDate"));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

/**
 * トレンド・新着・いいね数によって、作品をソートする
 * トレンドをどう表現するかについても要検討
 *
 * @param conditions Trend｜New｜LikeLarge｜LikeSmall | FeedbackLarge | FeedbackSmall
 * @returns
 */
export const fetchProducts = async (conditions: string): Promise<DocumentData | undefined> => {
  let q;
  // MEMO: sortType っていう変数なんで必要？？
  if (conditions === "TREND" || conditions === "") {
    q = query(collection(db, "product"), orderBy("sumLike", "desc"));
  } else if (conditions === "NEW") {
    q = query(collection(db, "product"), orderBy("postDate", "desc"));
  } else if (conditions === "LikeLarge") {
    q = query(collection(db, "product"), orderBy("sumLike", "desc"));
  } else if (conditions === "LikeSmall") {
    q = query(collection(db, "product"), orderBy("sumLike"));
  } else if (conditions === "FeedbackLarge") {
    q = query(collection(db, "product"), orderBy("feedbackNum", "desc"));
  } else if (conditions === "FeedbackSmall") {
    q = query(collection(db, "product"), orderBy("feedbackNum"));
  } else q = query(collection(db, "product"), orderBy("sumLike", "desc"));

  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

/**
 * user画面において、投稿済み｜フィードバック｜いいね｜から選択された作品の表示
 *
 * @param userUid ユーザーID
 * @param searchType POST|FEEDBACK|LIKE
 * @returns POSTの場合   ：作品一覧のquerySnapShot データの取得方法はfetcuFeedbackを参照
 * @returns FEEDBAKの場合：作品一覧の配列
 * @returns LIKEの場合   ：作品一覧の配列
 */
// export const fetchProductsUser = async (
//   userUid: string,
//   searchType: string
// ): Promise<unknown> => {
//   let q;
//   let querySnapshot;
//   const eachProductIdFeedback: string[] = [];
//   const returnProductInfo: (DocumentData | undefined)[] = [];

//   if (searchType === "POSTED") {
//     q = query(collection(db, "product"), where("userUid", "==", userUid));
//     querySnapshot = await getDocs(q);
//     return querySnapshot;
//   }
//   if (searchType === "FEEDBACK") {
//     q = query(collection(db, "feedback"), where("userUid", "==", userUid));
//     const tmp = await getDocs(q).then((feedbackDoc) => {
//       feedbackDoc.forEach((feedbackEachData) => {
//         eachProductIdFeedback.push(feedbackEachData.get("productId"));
//       });
//     });
//     for (let i = 0; i < eachProductIdFeedback.length; i += 1) {
//       const tmp2 = fetchProduct(eachProductIdFeedback[i]).then((data) => {
//         returnProductInfo.push(data);
//       });
//     }
//     return returnProductInfo;
//   }
//   if (searchType === "LIKE") {
//     let givedLikeProductId: DocumentData | undefined;
//     const tmp = await getDoc(doc(db, "userInfo", userUid)).then(
//       (eachUserInfo: DocumentSnapshot<DocumentData>) => {
//         givedLikeProductId = eachUserInfo.data();
//       }
//     );

//     if (givedLikeProductId) {
//       for (let i = 0; i < givedLikeProductId.length; i += 1) {
//         const temp = fetchProduct(givedLikeProductId[i]).then((data) => {
//           returnProductInfo.push(data);
//         });
//         return returnProductInfo;
//       }
//     }
//   }

//   return true;
// };

/**
 * User画面において、投稿済みが選択されている場合に、UserUidをもとに、自分の投稿している作品の一覧を取得する
 *
 * @param userUid : ユーザーID
 * @param tabType :
 * @return ユーザーIDが自分と一致する作品の一覧(QuerySnapshot)
 */
export const fetchProductsUser = async (
  userUid: string,
  tabType: "posted" | "like" | "feedback"
): Promise<QuerySnapshot<DocumentData> | null> => {
  let productQuery;

  if (tabType === "posted") {
    productQuery = query(collection(db, "product"), where("userUid", "==", userUid));
  } else {
    const userInfoSnap = await getDoc(doc(db, "userInfo", userUid));
    const userInfos = userInfoSnap.data();
    if (!userInfos) return null;

    if (tabType === "like")
      productQuery = query(collection(db, "product"), where("productId", "in", userInfos.giveLike));
    else productQuery = query(collection(db, "product"), where("productId", "in", userInfos.giveFeedback));
  }
  const productSnapshot = await getDocs(productQuery);
  return productSnapshot;
};

/**
 * 入力された文字を含むタグ名の一覧を取得する
 * @param inputText 入力された文字列
 * @returns 入力された文字列を含むタグ名の配列
 */
export const fetchTags = async (inputText: string): Promise<unknown> => {
  const returnTagList: unknown[] = [];
  const q = query(collection(db, "tags"));
  const tmp = await getDocs(q).then((tagList) => {
    tagList.forEach((tag) => {
      const tagId = tag.id;
      const searchText = new RegExp(inputText, "i");
      const test = tagId.search(searchText);
      if (test !== -1) {
        returnTagList.push(tag.id);
      }
    });
  });

  return returnTagList;
};

/**
 * すべてのタグのリストを取得
 * @returns 全タグのリスト
 */
export const fetchAllTags = async (): Promise<QuerySnapshot<DocumentData>> => {
  const tagsList = await getDocs(collection(db, "tags"));
  return tagsList;
};
/**
 * 作品にいいねが押された時にいいねカウントを変化させる
 * @param productId 作品ID
 * @param conditions UP|DOWN
 * @param userUid ログイン中のユーザーID
 * @returns 最新のいいね数
 */
export const countLikeProduct = async (productId: string, conditions: string, userUid: string): Promise<unknown> => {
  let newSumLike: unknown;
  const q = query(collection(db, "userInfo"), where("userUid", "==", userUid));
  const userInfo = await getDocs(q);

  if (conditions === "UP") {
    await getDoc(doc(db, "product", productId)).then((data) => {
      newSumLike = Number(data.get("sumLike")) + 1;
    });
    await updateDoc(userInfo.docs[0].ref, {
      giveLike: arrayUnion(productId),
    });
  } else if (conditions === "DOWN") {
    await getDoc(doc(db, "product", productId)).then((data) => {
      newSumLike = Number(data.get("sumLike")) - 1;
    });
    await updateDoc(userInfo.docs[0].ref, {
      giveLike: arrayRemove(productId),
    });
  }

  await updateDoc(doc(db, "product", productId), {
    sumLike: newSumLike,
  });
  return newSumLike;
};

/**
 * フィードバックにいいねが押された時にいいねカウントを変化させる
 * @param productId フィードバックID
 * @param conditions UP|DOWN
 * @returns 最新のいいね数
 */
export const countLikeFeedback = async (feedbackId: string, conditions: string, userUid: string): Promise<unknown> => {
  let newSumLike: unknown;
  const q = query(collection(db, "userInfo"), where("userUid", "==", userUid));
  const userInfo = await getDocs(q);

  if (conditions === "UP") {
    await getDoc(doc(db, "feedback", feedbackId)).then((data) => {
      newSumLike = Number(data.get("sumLike")) + 1;
    });
    await updateDoc(userInfo.docs[0].ref, {
      giveFeedback: arrayUnion(feedbackId),
    });
  } else if (conditions === "DOWN") {
    await getDoc(doc(db, "feedback", feedbackId)).then((data) => {
      newSumLike = Number(data.get("sumLike")) - 1;
    });
    await updateDoc(userInfo.docs[0].ref, {
      giveFeedback: arrayRemove(feedbackId),
    });
  }

  await updateDoc(doc(db, "feedback", feedbackId), {
    sumLike: newSumLike,
  });
  return newSumLike;
};

/**
 * 作品を削除する
 * @param productId 作品ID
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  await deleteDoc(doc(db, "product", productId));
};

/**
 * 作品の編集を行った際の作品情報の更新
 * @param productId 作品ID
 * @param productTitle 作品のタイトル
 * @param productAbstract 作品の概要
 * @param productIconUrl 作品のアイコンのURL
 * @param githubUrl GithubのURL
 * @param productUrl 作品のURL
 * @param tags タグ一覧
 * @param mainText 本文
 * @param userUid ユーザーID
 * @returns 作品ID
 */
export const editProduct = async (
  productId: string,
  productTitle: string,
  productAbstract: string,
  productIconUrl: string,
  githubUrl: string,
  productUrl: string,
  tags: string[],
  mainText: string,
  userUid: string
): Promise<string> => {
  // 現時点で存在しないタグをタグコレクションに追加
  const tmp = postTags(tags, "EXIST");
  // 作品のpostDateの取得
  let time: unknown;
  let sumLike = 0;
  const tmp2 = await getDoc(doc(db, "product", productId)).then((data) => {
    time = data.get("postDate");
    sumLike = data.get("sumLike") as number;
  });
  // 作品情報の取得
  const tmp3 = await setDoc(doc(db, "product", productId), {
    productTitle,
    productAbstract,
    productIconUrl,
    githubUrl,
    productUrl,
    tags,
    mainText,
    postDate: time,
    editDate: new Date().toLocaleString(),
    sumLike,
    userUid,
  });
  return productId;
};

/**
 * フィードバックが投稿されたときに内部的な FeedbackNum のカウントを増やす
 * @param productId 作品ID
 * @returns 最新のフィードバック数
 */
export const countFeedback = async (productId: string): Promise<unknown> => {
  let newFeedbackNumber: unknown;

  await getDoc(doc(db, "product", productId)).then((data) => {
    newFeedbackNumber = Number(data.get("feedbackNum")) + 1;
  });

  return newFeedbackNumber;
};
