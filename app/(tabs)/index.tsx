import { ScrollView, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/screens/tabs/explore/Header/ExploreHeader";
import SwiperHome from "@/components/swiper/SwiperHome";
import TodayStatistics from "@/components/statistics/TodayStatistics";
import TodayAppointment from "@/components/appointment/TodayAppointment";
import { getProfileFromState } from "@/auth/ctx";
import { useAppSelector } from "@/redux/store";
const Page = () => {
  const [category, setCategory] = useState<string>("Tiny homes");
  const account = getProfileFromState();
  console.log("Account", account);
  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <ExploreHeader
        avatar_url={account?.avatar as string}
        name={account?.name as string}
        counting={15}
      />
      <SwiperHome />
      <TodayStatistics />
      <TodayAppointment />
    </ScrollView>
  );
};

export default Page;
