import React from "react";
import { Text, View, ViewStyle } from "react-native";

const BadgeStatus = ({
  variant,
  style,
}: {
  variant: "success" | "warning" | "danger";
  style?: ViewStyle;
}) => {
  return (
    <View
      style={[
        {
          borderRadius: 999,
          paddingHorizontal: 12,
          paddingVertical: 4,
          backgroundColor:
            variant === "success"
              ? "#3ACE10"
              : variant === "warning"
              ? "#FFFB00"
              : "#E51A1A",
        },
        style,
      ]}
    >
      <Text
        style={{
          color: variant !== "warning" ? "white" : "black",
          fontFamily: "DMSans-Regular",
          fontSize: 14,
        }}
      >
        {variant === "success"
          ? "Fresh"
          : variant === "warning"
          ? "Warning"
          : "Urgent"}
      </Text>
    </View>
  );
};

export default BadgeStatus;
