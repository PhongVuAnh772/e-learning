import { useLoadingContent } from "./../../components/loading/LoadingContent";
import { handleLogin } from "@/redux/actions/auth.action";
import i18n from "@/translations";
import loginSticker from "@/assets/stickers/loading.png";
import { ImageSourcePropType } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { AuthState } from "@/types/auth";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useCallback, useState } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { usePathname } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { ExpoRouter } from "expo-router/types/expo-router";
import * as Linking from "expo-linking";
import { Auth, getAuth, UserCredential } from "firebase/auth";

GoogleSignin.configure({
  webClientId: `656671118341-3u6ai43knmsqbrcuvnmvievpjj6jn0ft.apps.googleusercontent.com`,
});

export enum Strategy {
  Google = "oauth_google",
  Github = "oauth_github",
  Facebook = "oauth_facebook",
}

export const useAuthViewModel = (
  show: (
    title?: string | undefined,
    description?: string | undefined,
    image?: ImageSourcePropType | undefined
  ) => void,
  hide: () => void,
  dispatch: ThunkDispatch<
    {
      auth: AuthState;
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>,
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  hideLoadingContent: () => void,
  showLoadingContent: () => void,
  router: ExpoRouter.Router,
  auth: Auth,
  signInWithEmailAndPassword: (
    auth: Auth,
    email: string,
    password: string
  ) => Promise<UserCredential>,
  createUserWithEmailAndPassword: (
    auth: Auth,
    email: string,
    password: string
  ) => Promise<UserCredential>
) => {

  const [confirm, setConfirm] = useState(null);
  const [userGoogle, setUser] = useState(null);
  const [loadingStrategy, setLoadingStrategy] = useState<Strategy | null>(null);
  
  const path = usePathname();

  const 
  handleLoginAction = async (
    username: string,
    password: string,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (!username || !password) {
      setErrorMessage(i18n.t("required-login-error"));
      return;
    }

    show("login-loading-title", "login-loading-description", loginSticker);

    try {
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("user   ", user);
          console.log("created", userCredential);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error: any) {
      hide();
      setErrorMessage(error.error);
    }
  };

  const handleRegisterAction = async (
    username: string,
    password: string,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    if (!username || !password) {
      setErrorMessage(i18n.t("required-login-error"));
      return;
    }
    console.log(username, password);

    // show("login-loading-title", "login-loading-description", loginSticker);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;
    console.log(user);

    } catch (error: any) {
      hide();
      setErrorMessage(error.error);
    }
  };

  async function signInWithPhoneNumber(phoneNumber: any) {
    // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    // setConfirm(confirmation as any);
  }
  

  return {
    handleLoginAction,
    userGoogle,
    confirm,
    setConfirm,
    signInWithPhoneNumber,
    Strategy,
    loadingStrategy,
    handleRegisterAction,
  };
};
