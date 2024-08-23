import { useFonts } from "expo-font";
import { Stack, useRouter, Slot } from "expo-router";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "@/redux/store";
import { persistor } from "@/redux/store";
import { Text, Platform, UIManager, StyleSheet } from "react-native";
import ButtonAdd from "@/components/Button/ButtonAdd";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as SplashScreen from "expo-splash-screen";
import AuthProvider from "@/auth/ctx";
import { Switch } from "react-native-switch";
import { AntDesign, Feather } from "@expo/vector-icons";
import { LoadingOverlayProvider } from "@/components/loading/LoadingOverlay";
import { LoadingContentProvider } from "@/components/loading/LoadingContent";
import { SessionProvider } from "@/common/SessionExpired";
import { RootSiblingParent } from "react-native-root-siblings";
import { ToastProvider } from "@/common/ToastProvider";
import { useTranslation } from "react-i18next";
import i18n, { loadLocale } from "@/translations/index";
SplashScreen.preventAutoHideAsync();

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function RootLayout() {
  const router = useRouter();
  const [loaded, error] = useFonts({
    "quicksand-bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "quicksand-light": require("../assets/fonts/Quicksand-Light.ttf"),
    "quicksand-medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "quicksand-regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "quicksand-semiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "manrope-bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "manrope-medium": require("../assets/fonts/Manrope-Medium.ttf"),
  });

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    await loadLocale()
  }

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      router.navigate('(modals)/loading')
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <RootSiblingParent>
            <AuthProvider>
              <LoadingOverlayProvider>
                <LoadingContentProvider>
                  <ToastProvider>
                    <SessionProvider>
                      {Platform.OS === 'ios' && <StatusBar barStyle='light-content'/>}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
                      <RootLayoutNav />
                    </SessionProvider>
                  </ToastProvider>
                </LoadingContentProvider>
              </LoadingOverlayProvider>
            </AuthProvider>
          </RootSiblingParent>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  return (
    <Stack initialRouteName="(modals)/loading">
      <Stack.Screen
        name="(modals)/loading"
        options={{
          title: i18n.t("login-title"),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/login"
        options={{
          animation: "slide_from_bottom",
          title: i18n.t("login-title"),
          headerShown: false,
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/information"
        options={{
          presentation: "modal",
          title: i18n.t("changing-information"),
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },

          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/notification"
        options={{
          presentation: "modal",
          title: i18n.t("notifications"),
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.button}
            >
              <Entypo name="chevron-small-left" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "rgb(241, 243, 244)",
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.buttonNotification}
            >
              <Ionicons name="checkmark-done" size={28} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/signup"
        options={{
          animation: "fade",
          title: i18n.t("sign-up"),
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/appointment"
        options={{
          animation: "slide_from_bottom",
          title: i18n.t("notifications"),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="downline/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="messages/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="campaign/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="calendars/index"
        options={{
          animation: "slide_from_bottom",
          title: i18n.t("booking"),
          headerTransparent: true,
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.button}
            >
              <Entypo name="chevron-small-left" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "rgb(241, 243, 244)",
          },
          headerRight: () => (
            <Switch
              value={false}
              onValueChange={(val) => console.log(val)}
              disabled={false}
              activeText={"On"}
              inActiveText={"Off"}
              circleSize={25}
              barHeight={25}
              circleBorderWidth={0}
              backgroundActive={"white"}
              backgroundInactive={"white"}
              circleActiveColor={"#27A376"}
              circleInActiveColor={"#27A376"}
              renderInsideCircle={() => {
                return true ? (
                  <AntDesign name="appstore-o" color="white" />
                ) : (
                  <Feather name="server" color="white" />
                );
              }}
              changeValueImmediately={true}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              outerCircleStyle={{}}
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={2}
              switchWidthMultiplier={2}
              switchBorderRadius={30}
            />
          ),
        }}
      />
      <Stack.Screen
        name="training/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="(modals)/join"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: "#fff",
                borderColor: Colors.grey,
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}
            >
              <Ionicons name="close-outline" size={22} />
            </TouchableOpacity>
          ),
        }}
      /> */}
      {/* <Stack.Screen
        name="room/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="call/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: "#fff",
                borderColor: Colors.grey,
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}
            >
              <Ionicons name="close-outline" size={22} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/searching"
        options={{
          presentation: "modal",
          title: i18n.t("searching"),
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.button}
            >
              <Entypo name="chevron-small-left" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "rgb(241, 243, 244)",
          },
        }}
      />
      <Stack.Screen
        name="qr/[id]"
        options={{
          presentation: "transparentModal",
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="qr-recharge/index"
        options={{
          presentation: "transparentModal",
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-downline/index"
        options={{
          presentation: "transparentModal",
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-customer/index"
        options={{
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(modals)/history-caring"
        options={{
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="changing-customer/index"
        options={{
          animation: "fade_from_bottom",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="caring/[id]"
        options={{
          presentation: "transparentModal",
          title: i18n.t("history-caring"),
          headerTitleStyle: {
            fontFamily: "quicksand-bold",
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.button}
            >
              <Entypo name="chevron-small-left" size={28} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: "rgb(241, 243, 244)",
          },
          headerRight: () => <ButtonAdd navigation={() => {}} />,
        }}
      />
      <Stack.Screen
        name="choosing/index"
        options={{
          presentation: "transparentModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="category/index"
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="recharge/index"
        options={{
          animation: "slide_from_right",
          headerTransparent: true,
          headerShown: false,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
    marginRight: 10,
  },
  buttonNotification: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "white"
  },
});
