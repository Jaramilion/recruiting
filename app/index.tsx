import * as React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import Constants from "expo-constants";
import CarrouselItem from "./components/CarrouselItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedTravelDestinations } from "@/lib/data";
import RetryRequest from "./components/RetryRequest";
import { WIDTH } from "./styles/config";
import Carrousel from "./components/Carrousel";

export default function App() {
  const getDestinations = async () => {
    const response = await getFeaturedTravelDestinations(WIDTH);
    return response;
  };
  const { isPending, isError, data, refetch, isLoading } = useQuery({
    queryKey: ["destinations"],
    queryFn: getDestinations,
  });

  if (isPending)
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  if (isError)
    return (
      <View style={styles.container}>
        <RetryRequest retryFn={refetch} loading={isLoading} />
      </View>
    );

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Carrousel data={data} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: WIDTH,
  },
});
