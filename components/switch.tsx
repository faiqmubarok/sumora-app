import Colors from "@/constants/color";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Switch,
  Text,
  View,
  ViewStyle,
} from "react-native";

type SwitchSize = "sm" | "md" | "lg";
type SwitchVariant = "primary" | "secondary" | "success" | "danger";

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  size?: SwitchSize;
  variant?: SwitchVariant;
  disabled?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

const sizeScale = {
  sm: 1,
  md: 1.2,
  lg: 1.5,
};

const trackColors = {
  primary: { true: Colors.PRIMARY, false: "#D1D5DB" },
  secondary: { true: "#6B7280", false: "#D1D5DB" },
  success: { true: "#10B981", false: "#D1D5DB" },
  danger: { true: "#EF4444", false: "#D1D5DB" },
};

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  size = "md",
  variant = "primary",
  disabled = false,
  label,
  style,
}) => {
  const scale = sizeScale[size];
  const colors = trackColors[variant];

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={{ transform: [{ scale }] }}>
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          trackColor={{
            false: colors.false,
            true: colors.true,
          }}
          thumbColor={value ? "#ffffff" : "#f4f3f4"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: "#111827",
  },
});
