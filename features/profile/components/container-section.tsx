import Colors from "@/constants/color";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

const ContainerSection = ({
  children,
  title,
  style,
}: {
  title: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) => (
  <View style={style}>
    <Text
      style={[
        styles.text,
        {
          marginBottom: 12,
          color: Colors.BLACK,
        },
      ]}
    >
      {title}
    </Text>
    <View
      style={{
        borderRadius: 16,
        backgroundColor: "#F3F3F3",
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER,
      }}
    >
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "DMSans-Regular",
    fontSize: 14,
    color: "#111827",
  },
});

export default ContainerSection;
