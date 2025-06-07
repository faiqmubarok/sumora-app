import Colors from "@/constants/color";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

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
  iconBackground = Colors.WHITE,
  containerStyle,
}: CardProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: iconBackground,
            },
          ]}
        >
          {icon}
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "column",
    gap: 24,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.WHITE,
    borderRadius: 24,

    // Shadow (iOS)
    shadowColor: "#D0D0D0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, // ← FIXED
    shadowRadius: 16, // ← sesuai "Blur" di Figma

    // Shadow (Android)
    elevation: 4, // bisa kamu sesuaikan kalau mau lebih mirip efek iOS
  },

  iconContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: 999,
  },
  text: { fontFamily: "DMSans-Medium", fontSize: 16 },
});

export default Card;
