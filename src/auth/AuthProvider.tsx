import React, { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import app from "../base";
import { fetchUserInfo, postUserInfo } from "../firebase/firestore";

// Google Providerの作成
const provider = new GoogleAuthProvider();

type ContextType = {
  googleLogin: () => void;
  logout: () => void;
  currentUser: User | null;
};

// contextの作成
export const AuthContext = React.createContext<ContextType>({
  googleLogin: () => {},
  logout: () => {},
  currentUser: null,
});

type AuthProviderProps = {
  children: JSX.Element;
};

/**
 * 認証プロバイダーを作成。認証に関するロジックを全て管理する。
 * @param props.children 認証以下の全てのコンポーネント（AuthProviderはroot直下）
 * @returns 認証プロバイダと全ての子コンポーネント
 */
export const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth(app);

  /**
   * Googleで認証する関数
   */
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      // alert(error);
    }
  };

  /**
   * ログアウトする関数
   */
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      // alert(error);
    }
  };

  /**
   * Firestoreにユーザーが登録してあるかをチェックして登録してない場合に登録する関数
   * @param user Firestoreから取得したユーザー情報
   */
  const isRegistered = (user: User | null) => {
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const tmpUserInfo = fetchUserInfo(user.uid).then((userInfo) => {
        if (!userInfo) {
          postUserInfo(
            currentUser?.displayName as string,
            currentUser?.photoURL as string,
            "よろしくお願いします。",
            "",
            "",
            "",
            [""],
            [""],
            currentUser?.uid as string
          ).catch(() => {});
        }
      });
    }
  };

  // 認証に関する副作用
  // authはFirebaseAppのAuthインスタンスであり、認証情報が変わるたびに呼び出される
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      isRegistered(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    // 以下のようにAuthContextの情報を読み込む
    // const { googleLogin, logout, currentUser } = useContext(AuthContext);
    <AuthContext.Provider
      value={{
        googleLogin,
        logout,
        currentUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
