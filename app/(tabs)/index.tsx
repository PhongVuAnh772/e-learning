import { ScrollView, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/screens/tabs/explore/Header/ExploreHeader";
import SwiperHome from "@/components/swiper/SwiperHome";
import TodayStatistics from "@/components/statistics/TodayStatistics";
import TodayAppointment from "@/components/appointment/TodayAppointment";
import { useAppSelector } from "@/redux/store";
const Page = () => {
  const [category, setCategory] = useState<string>("Tiny homes");
  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <ExploreHeader avatar_url={""} name={""} counting={15} />
      <SwiperHome />
      <TodayStatistics />
      <TodayAppointment />
    </ScrollView>
  );
};

export default Page;
