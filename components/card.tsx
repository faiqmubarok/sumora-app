import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconBackground?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const Card = ({
  title,
  children,
  icon,
  iconBackground = "#FFFFFF",
  containerStyle,
}: CardProps) => {
  return (
    <View
      style={[
        {
          padding: 16,
          flexDirection: "column",
          gap: 24,
          marginBottom: 12,
          borderBottomWidth: 1,
          borderColor: "#E2E2E2",
          elevation: 1,
          backgroundColor: "white",
          borderRadius: 24,
        },
        containerStyle,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: "#E2E2E2",
            borderRadius: 999,
            backgroundColor: iconBackground,
          }}
        >
          {icon}
        </View>
        <Text style={{ fontFamily: "DMSans-Medium", fontSize: 16 }}>
          {title}
        </Text>
      </View>
      {children}
    </View>
  );
};

export default Card;
