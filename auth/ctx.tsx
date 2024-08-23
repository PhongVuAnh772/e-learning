import React, {
  PropsWithChildren,
  useEffect,
  useState,
  useContext,
  createContext,
  useRef,
  useLayoutEffect,
} from "react";
import { useNavigation, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getProfile } from "@/redux/actions/auth.action";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "@/redux/store";
import { DELETE_SESSION_AUTH } from "@/redux/slices/auth.slice";

interface AuthContextType {
  loggedIn: boolean;
  account: any;
  tokens: any;
  setTokens: React.Dispatch<React.SetStateAction<any>>;
  setAccount: React.Dispatch<React.SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const getProfileFromState = () => {
  const state = store.getState();
  const profile = state.auth.account?.info_member;
  return profile;
};

export const getTokenFromState = () => {
  const state = store.getState();
  const profile = state.auth.account?.info_member?.token;
  return profile;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useState<any>([]);
  const [tokens, setTokens] = useState<any>(
    useAsyncStorage("tokens") as any | null
  );

  useEffect(() => {
    const initializeAuth = async () => {
      const tokens = await AsyncStorage.getItem("tokens");
      const agency = await AsyncStorage.getItem("agency");
      try {
        if (agency) {
          if (tokens) {
            await dispatch(getProfile(tokens)).unwrap();
            setLoggedIn(true);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "(tabs)",
                } as any,
              ],
            });
          } else {
            setLoggedIn(false);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "(modals)/login",
                } as any,
              ],
            });
          }
        } else {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "choosing/index",
              } as any,
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoggedIn(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn, account, tokens, setTokens, setAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useLogin = () => {};

export default AuthProvider;
