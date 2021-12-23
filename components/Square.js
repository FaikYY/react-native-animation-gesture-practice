import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  PanGestureHandler,
} from "react-native-gesture-handler";

const SIZE = 100.0;

export default function Square() {

  // #############
  //  SQUARE
  // #############

  const square_translateX = useSharedValue(0);
  const square_translateY = useSharedValue(0);

  const squarePanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.square_translateX = square_translateX.value;
      context.square_translateY = square_translateY.value;
    },
    onActive: (event, context) => {
      square_translateX.value = event.translationX + context.square_translateX;
      square_translateY.value = event.translationY + context.square_translateY;
    },
    onEnd: (event) => {},
  });

  const squareReanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: square_translateX.value },
        { translateY: square_translateY.value },
      ],
    };
  });

    return (
      <PanGestureHandler onGestureEvent={squarePanGestureEvent}>
        <Animated.View style={[styles.square, squareReanimatedStyle]} />
      </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,256,0.5)",
    borderRadius: 20,
  }
});
