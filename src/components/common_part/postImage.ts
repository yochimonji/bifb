import { v4 as uuidv4 } from "uuid";
import loadImage from "blueimp-load-image";
import {
  getStorage,
  ref,
  uploadBytes,
  StorageReference,
} from "firebase/storage";

import app from "../../base";

const storage = getStorage(app);

const postImage = async (file: File, dir: string): Promise<string> => {
  // 新しいファイル名を生成
  const fileName = `${dir}/${uuidv4()}.jpeg`;

  // File -> canvas -> dataUrl に変換する
  // アイコンの圧縮・クロップ処理をおこなう
  const loadFile = await loadImage(file, {
    maxHeight: 512,
    maxWidth: 512,
    crop: true,
    canvas: true,
  });

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

export default postImage;
