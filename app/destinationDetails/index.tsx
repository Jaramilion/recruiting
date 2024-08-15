import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { GetTravelDestinationById } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import RetryRequest from "../components/RetryRequest";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { animationConfigDetailContainer, WIDTH } from "../styles/config";

export default function DestinationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const destinationId = Number(id);
  const getDestinationById = async (id: number) => {
    const response = await GetTravelDestinationById(WIDTH, id);
    return response;
  };

  const { isLoading, data, refetch, isError, isPending } = useQuery({
    queryKey: ["destinationById", destinationId],
    queryFn: () => getDestinationById(destinationId),
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isLoading ? 0 : 1, animationConfigDetailContainer),
    };
  }, [isLoading]);

  if (isPending)
    return (
      <View style={{ ...styles.container, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  if (isError)
    return (
      <View style={{ ...styles.container, justifyContent: "center" }}>
        <RetryRequest retryFn={refetch} loading={isLoading} />
      </View>
    );
  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <Stack.Screen
        options={{
          headerTitle: data.location,
        }}
      />
      <Image source={{ uri: data?.image }} style={styles.img} />
      <Text style={styles.txt}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  img: {
    width: WIDTH,
    height: WIDTH / 1.5,
    resizeMode: "cover",
  },
  txt: {
    fontSize: 15,
    textAlign: "justify",
    padding: 10,
  },
});
