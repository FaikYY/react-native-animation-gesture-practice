import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  PanGestureHandler,
} from "react-native-gesture-handler";

const SIZE = 100.0;

export default function Sphere() {

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
      <PanGestureHandler onGestureEvent={spherePanGestureEvent}>
        <Animated.View style={[styles.sphere, sphereReanimatedStyle]} />
      </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
  sphere: {
    width: SIZE,
    height: SIZE,
    borderRadius: 50,
    backgroundColor: 'red'
  },
});

