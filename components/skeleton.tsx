import React, { useEffect, useRef } from "react";
import {
  Animated,
  DimensionValue,
  Easing,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type SkeletonProps = {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 16,
  borderRadius = 999,
  style,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 150],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e6e6", // sedikit lebih terang dari abu default
    overflow: "hidden",
    position: "relative",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: 150,
    backgroundColor: "#d1d1d1", // shimmer soft tapi tetap kontras
    opacity: 0.4, // shimmer lebih natural
  },
});
