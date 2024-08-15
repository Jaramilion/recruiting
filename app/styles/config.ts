import { Dimensions } from "react-native";
import { ReduceMotion, Easing } from "react-native-reanimated";

const _spacing = 12;
const COLLAPSED_ITEM_WIDTH = 220;
const NOT_COLLAPSED_ITEM_WIDTH = 35;
const animationConfigDetailContainer = {
  duration: 300,
};

const animationConfigContainer = {
  duration: 300,
  easing: Easing.inOut(Easing.sin),
  reduceMotion: ReduceMotion.System,
};
const WIDTH = Dimensions.get("window").width;

export {
  _spacing,
  COLLAPSED_ITEM_WIDTH,
  NOT_COLLAPSED_ITEM_WIDTH,
  animationConfigDetailContainer,
  animationConfigContainer,
  WIDTH,
};
