import { v4 as uuidv4 } from "uuid";
import loadImage from "blueimp-load-image";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import app from "FirebaseInitialize";

const storage = getStorage(app);

/**
 * 画像をjpegに変換してFirebase Storageに保存する関数
 * @param file 保存する画像
 * @param dir 保存したいディレクトリ名
 * @param isCrop 画像のクロップの有無
 * @returns 保存した画像のファイル名（ダウンロードURLではない）
 */
const PostImage = async (file: File, dir: string, isCrop: boolean): Promise<string> => {
  // 新しいファイル名を生成
  const fileName = `${dir}/${uuidv4()}.jpeg`;

  // File -> canvas -> dataUrl に変換する
  // アイコンの圧縮・クロップ処理をおこなう
  let loadFile: loadImage.LoadImageResult;
  if (isCrop) {
    loadFile = await loadImage(file, {
      maxHeight: 512,
      maxWidth: 512,
      crop: true,
      canvas: true,
    });
  } else {
    loadFile = await loadImage(file, {
      maxWidth: 1920,
      canvas: true,
    });
  }

  // loadImageをblobに変換
  // canvas.toBlobはコールバック関数の中でのみblobを扱うため非同期になる
  // toBlobの完了を待つ処理がthenやawaitで実装できなかったためbufferを使用する
  const canvasFile = loadFile.image as HTMLCanvasElement;
  const dataUrl = canvasFile.toDataURL("image/jpeg");
  const bin = atob(dataUrl.split(",")[1]);
  const buffer = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) {
    buffer[i] = bin.charCodeAt(i);
  }
  const blob = new Blob([buffer.buffer], { type: "image/jpeg" });

  // Storageに保存
  const newFileRef = ref(storage, fileName);
  await uploadBytes(newFileRef, blob);

  return fileName;
};

export default PostImage;
