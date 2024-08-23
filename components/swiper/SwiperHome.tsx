import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Dimensions } from "react-native";
import { Image } from "expo-image";
import Swiper from "react-native-swiper";
import imageSlide from "@/assets/slide/Artboard-2.png";
import imageSlide2 from "@/assets/slide/Artboard-3.png";
import imageSlide3 from "@/assets/slide/Artboard-5.png";
import imageSlide4 from "@/assets/slide/BANNER-MMA.png";
import { blurhash } from "@/constants/BlurHash";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    width: "100%",
    height: 200,
    alignItems: "center",
    marginTop:'30%'
  },
  wrapper: {},
  slide: {
    width: "100%",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    height: '100%',
    borderRadius: 12,
  },
});

export default class SwiperHome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          autoplay
          showsPagination={false}
        >
          <Image
            source={imageSlide}
            style={styles.image}
            alt=""
            placeholder={{ blurhash }}
            contentFit="fill"
            transition={1000}
          />
          <Image
            source={imageSlide2}
            style={styles.image}
            alt=""
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <Image
            source={imageSlide3}
            style={styles.image}
            alt=""
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
          <Image
            source={imageSlide4}
            style={styles.image}
            alt=""
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />
        </Swiper>
      </View>
    );
  }
}

AppRegistry.registerComponent("myproject", () => SwiperHome);
