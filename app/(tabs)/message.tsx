import { useAuth } from "@/auth/ctx";
import { useLoadingContent } from "@/components/loading/LoadingContent";
import useRealtime from "@/features/realtime";
import OrderHeader from "@/screens/tabs/message/Header/MessageHeader";
import { StreamVideo, User } from "@stream-io/video-react-native-sdk";
import { Stack } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

const STREAM_KEY = process.env.EXPO_ACCESS_STREAM_KEY;

const Message = () => {
  const { session, user } = useAuth();
  const userStream: User = { id: user?.id.toString() as string };
  const { hideLoadingContent, showLoadingContent } = useLoadingContent();
  const { client } = useRealtime(
    user,
    showLoadingContent,
    STREAM_KEY,
    userStream,
    session,
    hideLoadingContent
  );

  return (
    <>
      {client && (
        <StreamVideo client={client}>
          <View style={{ flex: 1, marginTop: Platform.OS === "ios" ? 50 : 70 }}>
            <Stack.Screen
              options={{
                header: () => <OrderHeader />,
              }}
            />
          </View>
        </StreamVideo>
      )}
    </>
  );
};

export default Message;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "quicksand-bold",
  },
  addContainer: {
    padding: 8,
    gap: 10,
    borderRadius: 32,
    backgroundColor: "#D80100",
  },
});
