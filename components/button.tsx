import Colors from "@/constants/color";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withIcon?: boolean;
  iconSource?: ImageSourcePropType;
  iconTag?: React.ReactNode;
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: {
    container: {},
    text: {
      color: Colors.WHITE,
    },
  },
  secondary: {
    container: {
      backgroundColor: Colors.SECONDARY,
    },
    text: {
      color: Colors.PRIMARY,
    },
  },
  outline: {
    container: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "#D4D4D4",
    },
    text: {
      color: Colors.BLACK,
    },
  },
} as const;

const sizeStyles = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
} as const;

export default function Button({
  variant = "primary",
  size = "medium",
  withIcon = false,
  iconSource,
  iconTag,
  children,
  onPress,
  style,
  textStyle,
  isLoading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const content = (
    <View style={styles.content}>
      {isLoading ? (
        <ActivityIndicator size="small" color={variantStyle.text.color} />
      ) : (
        <>
          {withIcon && iconSource && (
            <Image
              source={iconSource}
              style={styles.icon}
              resizeMode="contain"
            />
          )}
          {withIcon && iconTag && iconTag}
          <Text style={[styles.text, variantStyle.text, textStyle]}>
            {children}
          </Text>
        </>
      )}
    </View>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || isLoading}
      style={[
        fullWidth && { width: "100%" },
        (disabled || isLoading) && { opacity: 0.6 },
        style,
      ]}
    >
      {variant === "primary" ? (
        <LinearGradient
          colors={["#3B67EB", Colors.PRIMARY]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.base, sizeStyle]}
        >
          {content}
        </LinearGradient>
      ) : (
        <View style={[styles.base, variantStyle.container, sizeStyle]}>
          {content}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  text: {
    fontFamily: "DMSans-Medium",
    fontSize: 14,
  },
});
