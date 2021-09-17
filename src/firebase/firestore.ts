import {
  getFirestore,
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

const db = getFirestore();

/**
 * タグの配列に対して、配列内にあるtag collectionに存在していないタグをtag collectionにタグを追加
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

  for (let i = 0; i < tags.length; i += 1) {
    const tagName = tags[i];
    const tmp = setData(tagName, 1);
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
 * @param conditions Trend｜New｜GoodBig｜GoodSmall
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
  } else if (conditions === "GoodBig") {
    if (sortType === "Desc") {
      q = query(collection(db, "product"), orderBy("postDate", "desc"));
    }
    q = query(collection(db, "product"), orderBy("goodSum"));
  } else if (conditions === "GoodSamll") {
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
  return querySnapshot;
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
