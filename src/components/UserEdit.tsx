import React from "react";
import { Heading } from "@chakra-ui/react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import loadImage from "blueimp-load-image";

import app from "../base";

const storage = getStorage(app);

const UserEdit = (): JSX.Element => <Heading size="4xl">UserEdit</Heading>;

export default UserEdit;

// 初回にユーザー登録時にgoogleアカウントの画像をFirebase Storageに登録する処理を実装しようとしたが、セキュリティ上の問題で実装できなかった
// https://developer.mozilla.org/ja/docs/Web/HTML/CORS_enabled_image
// 関数自体はほぼそのまま使えるため置いておく
// 古いuserIconを削除する処理が未実装
// const [iconUrl, setIconUrl] = useState("");
// const postUserIcon = async () => {
//   if (currentUser != null && currentUser) {
//     const fileName = `user_icon/${uuidv4()}.jpeg`;
//     const loadIcon = await loadImage(currentUser.photoURL as string, {
//       maxHeight: 128,
//       maxWidth: 128,
//       crop: true,
//       canvas: true,
//     });
//     console.log(loadIcon);
//     const canvasIcon = loadIcon.image as HTMLCanvasElement;

//     const fileRef = ref(storage, fileName);
//     canvasIcon.toBlob(
//       // eslint-disable-next-line @typescript-eslint/no-misused-promises
//       async (blobIcon) => {
//         if (blobIcon) {
//           await uploadBytes(fileRef, blobIcon).catch(() => {
//             console.log(`アイコンのアップロードに失敗しました。`);
//           });
//           const downloadUrl = await getDownloadURL(fileRef);
//           setIconUrl(downloadUrl);
//         }
//       },
//       "image/jpeg",
//       0.95
//     );
//   }
// };
