import Colors from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Label from "./label";

interface InputProps extends TextInputProps {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  costumeIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  iconColor?: string;
  error?: string;
  isPassword?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
}

// Gunakan forwardRef di sini
const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      icon,
      costumeIcon,
      containerStyle,
      inputStyle,
      iconColor = "#999",
      error,
      isPassword = false,
      secureTextEntry,
      onChangeText,
      value,
      ...props
    }: InputProps,
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isSecure = isPassword && !showPassword;

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label && <Label style={{ marginBottom: 12 }}>{label}</Label>}

        <View
          style={[
            styles.inputContainer,
            error && { borderColor: Colors.DESTRUCTIVE },
          ]}
        >
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={iconColor}
              style={styles.iconLeft}
            />
          )}
          {costumeIcon && (
            <View
              style={[
                styles.iconLeft,
                {
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              {costumeIcon}
            </View>
          )}

          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.input,
              icon && { paddingLeft: 8 },
              isPassword && { paddingRight: 36 },
              inputStyle,
            ]}
            placeholderTextColor="#aaa"
            secureTextEntry={isSecure}
            {...props}
          />

          {isPassword && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          )}
        </View>

        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

// ✅ Tambahkan display name untuk debugging & linting
Input.displayName = "Input";

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  input: {
    fontFamily: "DMSans-Regular",
    flex: 1,
    fontSize: 14,
    color: Colors.BLACK,
  },
  iconLeft: {
    marginRight: 8,
  },
  error: {
    fontFamily: "DMSans-Regular",
    color: Colors.DESTRUCTIVE,
    fontSize: 14,
    marginTop: 8,
  },
});

export default Input;
