import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import * as H from "history";

// Google Providerの作成
const provider = new GoogleAuthProvider();

// contextの作成
export const AuthContext = React.createContext({});

type AuthProviderProps = {
  children: JSX.Element;
};

export const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth();

  const googleLogin = async (history: H.History) => {
    try {
      await signInWithPopup(auth, provider);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const logout = async (history: H.History) => {
    try {
      await signOut(auth);
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
        googleLogin,
        logout,
        currentUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
