import Colors from "@/constants/color";
import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconBackground?: string;
  containerStyle?: StyleProp<ViewStyle>;
  variant?: "light" | "dark";
  headerRight?: React.ReactNode;
}

const Card = ({
  title,
  children,
  icon,
  iconBackground = Colors.WHITE,
  containerStyle,
  variant = "light",
  headerRight,
}: CardProps) => {
  const isDark = variant === "dark";

  return (
    <View
      style={[styles.container, isDark && styles.darkContainer, containerStyle]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {icon && (
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: iconBackground,
                  borderColor: isDark ? "#424242" : Colors.BORDER,
                },
              ]}
            >
              {icon}
            </View>
          )}
          <Text style={[styles.text, { color: isDark ? "white" : "black" }]}>
            {title}
          </Text>
        </View>

        {headerRight}
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
    shadowColor: "#D0D0D0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  darkContainer: {
    backgroundColor: "#232222",
    borderColor: "#424242",
  },
  iconContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 999,
  },
  text: {
    fontFamily: "DMSans-Medium",
    fontSize: 16,
  },
});

export default Card;
