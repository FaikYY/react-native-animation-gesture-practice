import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const SIZE = 100.0;

export default function App() {
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

  // #############
  //  SPHERE
  // #############

  const sphere_translateX = useSharedValue(0);
  const sphere_translateY = useSharedValue(0);

  const spherePanGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.sphere_translateX = sphere_translateX.value;
      context.sphere_translateY = sphere_translateY.value;
    },
    onActive: (event, context) => {
      sphere_translateX.value = event.translationX + context.sphere_translateX;
      sphere_translateY.value = event.translationY + context.sphere_translateY;
    },
    onEnd: (event) => {},
  });

  const sphereReanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: sphere_translateX.value },
        { translateY: sphere_translateY.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={squarePanGestureEvent}>
        <Animated.View style={[styles.square, squareReanimatedStyle]} />
      </PanGestureHandler>
      <PanGestureHandler onGestureEvent={spherePanGestureEvent}>
        <Animated.View style={[styles.sphere, sphereReanimatedStyle]} />
      </PanGestureHandler>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,256,0.5)",
    borderRadius: 20,
  },
  sphere: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "red",
    borderRadius: 50,
  },
});
