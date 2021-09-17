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
  deleteDoc,
} from "firebase/firestore";

const db = getFirestore();

/**
 * タグの配列に対して、配列内にあるtag collectionに存在していないタグをtag collectionに追加
 * @param tags タグの一覧
 * @returns True or False
 */
export const postTags = (tags: string[]) => {
  async function setData(name: string, sum: number) {
    await setDoc(doc(db, "tags", name), {
      sum,
    });
    return true;
  }

  async function getData(name: string) {
    const tagData = await getDoc(doc(db, "tags", name));
    if (tagData.exists()) {
      console.log(tagData.id, tagData.get("sum"));
      const tagname = tagData.id;
      const sum = Number(tagData.get("sum")) + 1;
      console.log(typeof sum);
      const tmp = setData(tagname, sum);
    } else {
      console.log(tagData.id, "Such tagas are not exist");
      const tagname = tagData.id;
      const tmp = setData(tagname, 1);
    }
    return true;
  }

  for (let i = 0; i < tags.length; i += 1) {
    const tmp = getData(tags[i]);
  }
  return true;
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
  // 現時点で存在しないタグをタグコレクションに追加
  const tmp = postTags(tags);
  // 作品情報の取得
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
  giveGood: string[],
  giveFeedback: string[],
  userUid: string
): Promise<boolean> => {
  const docUserInfo = await setDoc(doc(db, "userInfo", userUid), {
    name,
    userIcon,
    comment,
    githubUrl,
    twitterUrl,
    otherUrl,
    giveGood,
    giveFeedback,
  });

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
export const fetchFeedback = async (productId: string) => {
  const q = query(
    collection(db, "feedback"),
    where("productId", "==", productId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

/**
 * トレンド・新着・いいね数によって、作品をソートする
 * ただし現状、リスト的な表示はできず、最後のものしか表示されない 要改善
 * トレンドをどう表現するかについても要検討
 *
 * @param conditions Trend｜New｜LikeLarge｜LikeSmall
 * @param sortType  Asce｜Desc
 * @returns
 */
export const fetchProducts = async (conditions: string, sortType: string) => {
  let q;
  if (conditions === "Trend") {
    if (sortType === "Desc") {
      q = query(collection(db, "product"), orderBy("goodSum", "desc"));
    }
    q = query(collection(db, "product"), orderBy("goodSum"));
  } else if (conditions === "New") {
    if (sortType === "Desc") {
      q = query(collection(db, "product"), orderBy("postDate", "desc"));
    }
    q = query(collection(db, "product"), orderBy("postDate"));
  } else if (conditions === "LikeLarge") {
    if (sortType === "Desc") {
      q = query(collection(db, "product"), orderBy("postDate", "desc"));
    }
    q = query(collection(db, "product"), orderBy("goodSum"));
  } else if (conditions === "LikeSmall") {
    if (sortType === "Decs") {
      q = query(collection(db, "product"), orderBy("postDate"));
    }
    q = query(collection(db, "product"), orderBy("goodSum", "desc"));
  }

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
export const fetchProductsUser = async (
  userUid: string,
  searchType: string
) => {
  let q;
  let querySnapshot;
  const eachProductIdFeedback: any[] = [];
  const returnProductInfo: (DocumentData | undefined)[] = [];
  if (searchType === "POSTED") {
    q = query(collection(db, "product"), where("userUid", "==", userUid));
    querySnapshot = await getDocs(q);
    return querySnapshot;
  }
  if (searchType === "FEEDBACK") {
    q = query(collection(db, "feedback"), where("userUid", "==", userUid));
    const querySnapshotTmp = await getDocs(q).then((feedbackDoc) => {
      feedbackDoc.forEach((feedbackEachData) => {
        eachProductIdFeedback.push(feedbackEachData.get("productId"));
      });
    });
    for (let i = 0; i < eachProductIdFeedback.length; i += 1) {
      const tmp = fetchProduct(eachProductIdFeedback[i]).then((data) => {
        returnProductInfo.push(data);
      });
    }
    return returnProductInfo;
  }
  if (searchType === "LIKE") {
    const giveLikeId = await getDoc(doc(db, "userInfo", userUid));
    const givedLikeProductId: unknown = giveLikeId.get("giveGood");

    for (let i = 0; i < givedLikeProductId.length; i += 1) {
      const tmp = fetchProduct(givedLikeProductId[i]).then((data) => {
        returnProductInfo.push(data);
      });
      return returnProductInfo;
    }
  }

  return true;
};

/**
 * 入力された文字を含むタグ名の一覧を取得する
 * @param inputText 入力された文字列
 * @returns 入力された文字列を含むタグ名の配列
 */
export const fetchTags = async (inputText: string) => {
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
 * 作品を削除する
 * @param productId 作品ID
 */
export const deleteProduct = async (productId: string) => {
  await deleteDoc(doc(db, "product", productId));
};
