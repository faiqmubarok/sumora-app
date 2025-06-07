import Colors from "@/constants/color";
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
              ? Colors.SUCCESS
              : variant === "warning"
              ? Colors.WARNING
              : Colors.DESTRUCTIVE,
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
