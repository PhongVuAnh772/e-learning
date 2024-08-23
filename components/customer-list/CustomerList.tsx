import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchCustomer from "../search-customer/SearchCustomer";
import CustomerListContent from "./content/CustomerListContent";
import { getCustomer } from "@/services/customer.service";
import { useAuthContext } from "@/auth/ctx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTokenFromState } from "@/auth/ctx";
import { FetchingDataLoader } from "../loading/LoadingFetch";
import { useTranslation } from "react-i18next";

const CustomerList = () => {
   
  const [customers, setCustomers] = useState<[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState('');
  const tokens = getTokenFromState() as string;
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = (await getCustomer(tokens, 20)) as any;
      if (response && response?.listData) {
        setCustomers(response.listData);
        setLoading(false);
        console.log(response)
      } else {
        setCustomers([]);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <SearchCustomer />

      {loading ? (
        <FetchingDataLoader />
      ) : (
        <CustomerListContent customer={customers} />
      )}
    </View>
  );
};

export default CustomerList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
