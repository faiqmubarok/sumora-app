import Input from "@/components/input";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text } from "react-native";
import { EditFormSchema } from "../form/form";

const EditProfileForm = ({
  onSubmit,
  loading,
}: {
  onSubmit: (data: EditFormSchema) => void;
  loading?: boolean;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<EditFormSchema>();

  return (
    <>
      {/* Name */}
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Input
            {...field}
            label="Name"
            value={field.value || ""}
            onChangeText={field.onChange}
            placeholder="Enter your fullname"
            autoCapitalize="none"
            error={errors.name?.message}
          />
        )}
      />

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

      {/* Phone */}
      <Controller
        control={control}
        name="phone"
        render={({ field }) => (
          <Input
            costumeIcon={
              <Text
                style={{
                  paddingRight: 12,
                  borderRightWidth: 1,
                  height: "auto",
                  width: "100%",
                  color: "#A5A5A5",
                  borderColor: "#A5A5A5",
                  fontSize: 14,
                  fontFamily: "DMSans-Regular",
                }}
              >
                +62
              </Text>
            }
            {...field}
            label="Phone"
            value={String(field.value)}
            onChangeText={field.onChange}
            keyboardType="phone-pad"
            placeholder="Enter your number phone"
            autoCapitalize="none"
            error={errors.phone?.message}
          />
        )}
      />
    </>
  );
};

export default EditProfileForm;
