import Colors from "@/constants/color";
import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

interface LabelProps {
  children: React.ReactNode;
  required?: boolean;
  style?: StyleProp<TextStyle>;
}

export default function Label({
  children,
  required = false,
  style,
}: LabelProps) {
  return (
    <Text style={[styles.label, style]}>
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: "DMSans-Regular",
    fontSize: 14,
    color: Colors.BLACK,
  },
  required: {
    color: Colors.DESTRUCTIVE,
  },
});
