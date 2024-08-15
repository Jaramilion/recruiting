import * as React from "react";
import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import {
  TapGestureHandler,
  State,
  HandlerStateChangeEvent,
} from "react-native-gesture-handler";

import Animated, {
  Easing,
  FadeInRight,
  FadeOutLeft,
  ReduceMotion,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  _spacing,
  animationConfigContainer,
  COLLAPSED_ITEM_WIDTH,
  NOT_COLLAPSED_ITEM_WIDTH,
} from "../styles/config";
import { router } from "expo-router";
export interface Props {
  id: string;
  location: string;
  numberOfDays: number;
  image: string;
  color: string;
  toggleSelectedItem: () => void;
  selectedItem: boolean;
}

function CarrouselItem({
  id,
  location,
  numberOfDays,
  image,
  color,
  toggleSelectedItem,
  selectedItem,
}: Props) {
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(
        selectedItem ? COLLAPSED_ITEM_WIDTH : NOT_COLLAPSED_ITEM_WIDTH,
        animationConfigContainer
      ),
    };
  }, [selectedItem]);

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(selectedItem ? color : "#fff", {
        duration: 1000,
      }),
    };
  }, [selectedItem]);

  const onDoubleTap = React.useCallback(
    ({ nativeEvent }: HandlerStateChangeEvent) => {
      if (nativeEvent.state === State.ACTIVE) {
        router.navigate({
          pathname: "/destinationDetails",
          params: { id },
        });
      }
    },
    [id]
  );

  return (
    <Animated.View
      key={id}
      style={[styles.itemContainer, animatedContainerStyle]}
    >
      <TapGestureHandler onHandlerStateChange={onDoubleTap} numberOfTaps={2}>
        <Pressable onPress={toggleSelectedItem} style={styles.pressableLayout}>
          <Image
            source={{ uri: image }}
            style={[StyleSheet.absoluteFillObject, { resizeMode: "cover" }]}
          />
          <Animated.View style={styles.infoContainer}>
            <Animated.View style={[styles.circle, animatedCircleStyle]} />
            {selectedItem && (
              <Animated.View
                style={{
                  marginLeft: 50 + _spacing,
                  position: "absolute",
                }}
              >
                <Animated.Text
                  style={{ color: color, fontWeight: "bold" }}
                  entering={FadeInRight.delay(50)}
                  exiting={FadeOutLeft.delay(100)}
                >
                  {location}
                </Animated.Text>
                <Animated.Text
                  style={{ color: color, fontWeight: "bold" }}
                  entering={FadeInRight.delay(50)}
                  exiting={FadeOutLeft.delay(100)}
                >
                  {location}
                </Animated.Text>
              </Animated.View>
            )}
          </Animated.View>
        </Pressable>
      </TapGestureHandler>
    </Animated.View>
  );
}

export default React.memo(CarrouselItem);

const { width: itemHeight } = Dimensions.get("window");
const styles = StyleSheet.create({
  itemContainer: {
    height: itemHeight,
    backgroundColor: "#c5c5c5",
    marginHorizontal: 5,
    overflow: "hidden",
    borderRadius: _spacing,
  },
  pressableLayout: {
    flex: 1,
    justifyContent: "flex-end",
    padding: _spacing / 2,
  },
  circle: {
    width: "100%",
    maxWidth: 50,
    maxHeight: 50,
    aspectRatio: 1,
    borderRadius: 100,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
