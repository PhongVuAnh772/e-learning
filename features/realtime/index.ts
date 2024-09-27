import {
  Logger,
  StreamVideoClient,
  UserRequest,
} from "@stream-io/video-react-native-sdk";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
const EXPO_ACCESS_STREAM_KEY = process.env.EXPO_ACCESS_STREAM_KEY;

const useRealtime = (
  user: any,
  showLoadingContent: () => void,
  STREAM_KEY: string | undefined,
  userStream: Omit<UserRequest, "role"> & {
    type?: "authenticated";
  },
  session: Session | null | undefined,
  hideLoadingContent: () => void
) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  useEffect(() => {
    const createChanneluser = async () => {
      if (user && clientServer) {
        await clientServer.connectUser(
          {
            id: user.id.toString(),
            name: user.user_metadata.full_name,
            image: user.user_metadata.avatar_url,
          },
          session?.access_token
        );
      }
    };
    createChanneluser();
  }, []);
  const clientServer = StreamVideoClient.getOrCreateInstance({
    apiKey: STREAM_KEY as string,
    token: session?.access_token.toString(),
    user: userStream,
    options: {
      logLevel: "info",
      logger: console.log("ok") as unknown as Logger,
    },
  });
  useEffect(() => {
    showLoadingContent();
    setClient(clientServer);
    hideLoadingContent();
  }, []);
  return {
    client,
  };
};

export default useRealtime;
