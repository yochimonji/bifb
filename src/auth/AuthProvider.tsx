import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import * as H from "history";

// type contextValue = {
//   login: () => void;
//   signup: () => void;
//   user: string;
// }

// contextの作成
export const AuthContext = React.createContext({});

type AuthProviderProps = {
  children: JSX.Element;
};

export const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth();

  // ユーザーをログインさせる関数
  const login = async (email: string, password: string, history: H.History) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  // 新しいユーザーを作成しログインさせる関数
  const signup = async (
    email: string,
    password: string,
    history: H.History
  ) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, [auth]);

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    <AuthContext.Provider
      value={{
        login,
        signup,
        currentUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
