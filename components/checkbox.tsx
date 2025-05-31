import Colors from "@/constants/color";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Label from "./label";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export default function Checkbox({
  label,
  checked,
  onChange,
  containerStyle,
  labelStyle,
}: CheckboxProps) {
  return (
    <Pressable onPress={onChange} style={[styles.container, containerStyle]}>
      <View style={[styles.box, checked && styles.checkedBox]}>
        {checked && (
          <FontAwesome6 name="check" size={16} color={Colors.PRIMARY} />
        )}
      </View>
      <Label style={[labelStyle]}>{label}</Label>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: Colors.BORDER,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkedBox: {
    borderColor: Colors.BORDER,
  },
});
