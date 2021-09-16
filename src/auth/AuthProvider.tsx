import React, { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import * as H from "history";
import app from "../base";

// Google Providerの作成
const provider = new GoogleAuthProvider();

type ContextType = {
  googleLogin: (history: H.History) => void;
  logout: (history: H.History) => void;
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
   * Googleログイン機能
   * @param history 閲覧履歴
   */
  const googleLogin = async (history: H.History) => {
    try {
      await signInWithPopup(auth, provider);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  /**
   * ログアウト機能
   * @param history 閲覧履歴
   */
  const logout = async (history: H.History) => {
    try {
      await signOut(auth);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  // 認証に関する副作用
  // authはFirebaseAppのAuthインスタンスであり、認証情報が変わるたびに呼び出される
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, [auth]);

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
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
