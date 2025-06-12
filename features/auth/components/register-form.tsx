import Button from "@/components/button";
import Checkbox from "@/components/checkbox";
import Input from "@/components/input";
import Link from "@/components/link";
import Colors from "@/constants/color";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { RegisterFormSchema } from "../form/form";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormSchema) => void;
  loading?: boolean;
}

export default function RegisterForm({ onSubmit, loading }: RegisterFormProps) {
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext<RegisterFormSchema>();

  return (
    <>
      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            {...field}
            label="Email"
            value={field.value}
            onChangeText={field.onChange}
            keyboardType="email-address"
            placeholder="Enter your email"
            autoCapitalize="none"
            error={errors.email?.message}
          />
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            label="Password"
            placeholder="Enter your password"
            isPassword
            {...field}
            value={field.value}
            onChangeText={field.onChange}
            error={errors.password?.message}
          />
        )}
      />

      {/* Confirm Password */}
      <View style={{ gap: 4 }}>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <View style={{ marginBottom: 4 }}>
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                isPassword
                {...field}
                value={field.value}
                onChangeText={field.onChange}
                error={errors.confirmPassword?.message}
              />
            </View>
          )}
        />

        <View style={styles.passwordRow}>
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            labelStyle={{ fontSize: 15 }}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <Link href={"/login"}>Forgot Password?</Link>
        </View>
      </View>

      <Button
        onPress={handleSubmit(onSubmit)}
        isLoading={loading}
        disabled={loading}
      >
        Sign up
      </Button>

      {/* Separator */}
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View>

      {/* Sign in with Google */}
      <Button
        variant="outline"
        withIcon
        iconSource={require("@/assets/icons/google.png")}
      >
        Sign in with Google
      </Button>

      {/* Sign in with Apple */}
      <Button
        variant="secondary"
        style={{ backgroundColor: Colors.BLACK, borderRadius: 8 }}
        textStyle={{ color: "#fff" }}
        withIcon
        iconSource={require("@/assets/icons/apple.png")}
      >
        Sign in with Apple
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  passwordRow: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.BORDER,
  },
  orText: {
    marginHorizontal: 16,
    color: "#A5A5A5",
    fontSize: 14,
    fontFamily: "DMSans-Medium",
  },
});
