import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { useRouter, useNavigation } from "expo-router";
import i18n from "@/translations";
import Greeting from "@/components/greeting/Greeting";
import SearchBar from "@/components/Search/SearchBar";
import PrimaryButton from "@/atoms/PrimaryButton";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLoadingOverlay } from "@/components/loading/LoadingOverlay";
import loginSticker from "@/assets/stickers/loading.png";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "@/redux/actions/auth.action";
import { useAuthContext } from "@/auth/ctx";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { useTranslation } from "react-i18next";
interface Props {
  name: string;
  counting: number;
}

const Login: React.FC<Props> = ({ name, counting }) => {
  const { show, hide } = useLoadingOverlay();
  const router = useRouter();
  const navigation = useNavigation();
  const [username, setUsername] = useState<string>("0816560000");
  const [password, setPassword] = useState<string>("123456");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const { setTokens, setAccount } = useAuthContext();
  const { data, saveData, loadingStorage } = useAsyncStorage("tokens");
   
  const handleContinue = async () => {
    if (!username || !password) {
      setErrorMessage(i18n.t("required-login-error"));
      return;
    }

    show("login-loading-title", "login-loading-description", loginSticker);

    try {
      console.log(username, password);
      await dispatch(handleLogin({ username, password })).unwrap();
      hide();
      navigation.reset({
        index: 0,
        routes: [{ name: "(tabs)" as never }],
      });
    } catch (error: any) {
      hide();
      setErrorMessage(error.error);
    }
  };

  const handleEnterPress = () => {
    // handleContinue();
  };

  return (
    <>
      <Greeting
        title="login"
        description="greeting-login"
        otherDescription="invite-login"
        overlayDescription="overlay-login"
      >
        <SearchBar
          placeholder={i18n.t("your-phone")}
          keyboardType="numeric"
          color="white"
          handleEnterPress={handleEnterPress}
          value={username}
          setValue={setUsername}
          maxLength={10}
          icon={<Feather name="phone" size={18} color="#A5A5A9" />}
          inputStyles={styles.input}
        />
        <SearchBar
          placeholder={i18n.t("password")}
          keyboardType="numeric"
          color="white"
          handleEnterPress={handleEnterPress}
          value={password}
          setValue={setPassword}
          maxLength={10}
          icon={<Ionicons name="key-outline" size={18} color="#A5A5A9" />}
          inputStyles={styles.input}
          secureTextEntry
        />
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </Greeting>
      <PrimaryButton
        style={{
          position: "absolute",
          bottom: 20,
          left: 10,
          width: "95%",
          height: 54,
          borderRadius: 1000,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#D80100",
        }}
        mode="contained"
        onPress={handleContinue}
      >
        {i18n.t("continue")}
      </PrimaryButton>
    </>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    width: 24,
    height: 24,
  },
  signupText: {
    fontSize: 16,
    fontFamily: "quicksand-bold",
  },
  input: {
    borderColor: "#BDC1C6",
    borderWidth: 1,
  },
  error: {
    color: "red",
  },
});

export default React.memo(Login);
