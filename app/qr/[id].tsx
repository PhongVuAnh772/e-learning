import React from "react";
import { View, Text, StyleSheet, Dimensions,TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenHeader from "@/atoms/HeaderComponent";
import { blurhash } from "@/constants/BlurHash";
import i18n from "@/translations";
import PrimaryButton from "@/atoms/PrimaryButton";
import qrIcon from "@/assets/icons/qr-share.png";
import qrBorder from '@/assets/stickers/qr-border.png';
import qrExample from '@/assets/icons/qr-example.png';
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const GenerateQRCode = () => {
  const { top } = useSafeAreaInsets();
 
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 16}}><ScreenHeader
        canGoBack
        title={i18n.t("qr-header")}
        style={[styles.header, { paddingTop: top + 10 }]}
        
      /></View>
      <View style={styles.content}>
        <View style={styles.qrContainer}>
          <Image
            source={qrBorder}
            style={styles.qrBorder}
            alt=""
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}
          />
          <Image
            source={qrExample}
            style={styles.qrExample}
            alt=""
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}
            
          />
        </View>
        <View style={styles.sharingContainer}>
          <View style={styles.sharingIcon}>
            <Image
              source={qrIcon}
              style={styles.icon}
              alt=""
              placeholder={blurhash}
              contentFit="fill"
              transition={1000}
            />
          </View>
          <Text style={styles.headerSharing}>{i18n.t("qr-emphasize")}</Text>
          <Text style={styles.descriptionSharing}>
            {i18n.t("qr-emphasize-description")}
          </Text>
          <PrimaryButton
            style={styles.button}
            mode={"contained"}
            onPress={() => {}}
          >
            <Text style={styles.textButton}>{i18n.t("qr-sharing-button")}</Text>
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(241, 243, 244)",
  },
  roundButton: {
    width: 48,
    height: 48,
    borderRadius: 1000,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    paddingTop: '15%',
  },
  qrContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  sharingContainer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    height: "40%",
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
  },
  sharingIcon: {
    padding: 15,
    backgroundColor: "#D80100",
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
  },
  headerSharing: {
    fontSize: 20,
    fontFamily: "quicksand-bold",
  },
  descriptionSharing: {
    fontSize: 14,
    fontFamily: "quicksand-light",
    textAlign: "center",
  },
  button: {
    width: "100%",
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  textButton: {
    color: "black",
    fontFamily: "quicksand-bold",
    fontSize: 16,
  },
  qrBorder: {
    width: '100%',
    height: '100%',
    position: "absolute",
  },
  qrExample: {
    width: '90%',
    height: '90%',
    position: "absolute",
    borderRadius: 10
  },
});

export default GenerateQRCode;
