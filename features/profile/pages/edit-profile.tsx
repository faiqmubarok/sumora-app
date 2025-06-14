import Avatar from "@/components/avatar";
import Button from "@/components/button";
import { Skeleton } from "@/components/skeleton";
import { useToast } from "@/components/toast";
import Colors from "@/constants/color";
import { getDecodedAccessToken } from "@/lib/secure-store";
import Feather from "@expo/vector-icons/Feather";
import { isAxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchProfile } from "../api/use-fetch-profile";
import { usePatchProfile } from "../api/use-patch-profile";
import EditProfileForm from "../components/edit-form";
import { EditFormSchema } from "../form/form";

const EditProfilePage = () => {
  const { show: toastShow } = useToast();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const { mutate: updateProfile, isPending: loadingEditProfile } =
    usePatchProfile({
      onSuccess: () => {
        toastShow({
          title: "Berhasil",
          description: "Profil kamu berhasil diperbarui.",
          variant: "success",
        });
        router.replace("/(tabs)/profile");
        form.reset();
      },
      onError: (error: unknown) => {
        const description = isAxiosError(error)
          ? error.response?.data?.error || "Something went wrong"
          : "An unknown error occurred";

        toastShow({
          title: "Error",
          description,
          variant: "error",
        });
      },
    });

  const { data: user, isLoading } = useFetchProfile({
    id: userId ?? "",
    onError(e) {
      console.log(e);
      toastShow({
        title: "Error",
        description: "Error fetching profile",
        variant: "error",
      });
    },
  });

  const form = useForm<EditFormSchema>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      photo: "",
    },
  });

  const onSubmit = (data: EditFormSchema) => {
    if (!user) return;

    const cleanData: Partial<EditFormSchema> = {};

    if (data.name !== user.name) {
      cleanData.name = data.name;
    }

    if (data.email !== user.email) {
      cleanData.email = data.email;
    }

    if (data.phone !== user.phone) {
      cleanData.phone = data.phone;
    }

    const currentPhoto =
      typeof data.photo === "string" ? data.photo : data.photo?.uri;
    if (currentPhoto !== user.photo?.url) {
      cleanData.photo = data.photo;
    }

    // Jika tidak ada yang berubah, hentikan
    if (Object.keys(cleanData).length === 0) {
      toastShow({
        title: "Tidak ada perubahan",
        description: "Kamu belum mengubah apapun di profil.",
        variant: "info",
      });
      return;
    }

    updateProfile({ id: userId ?? "", data: cleanData as EditFormSchema });
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        photo: user.photo?.url ?? "",
      });
    }
    if (user?.photo?.url) {
      setSelectedImage({
        uri: user.photo.url,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    }
  }, [user, form]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getDecodedAccessToken();
      if (token) setUserId(token.id);
    };

    fetchUser();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const picked = result.assets[0];
      setSelectedImage({
        uri: picked.uri,
        name: picked.fileName ?? "photo.jpg",
        type: picked.type ?? "image/jpeg",
      });

      // kalau kamu pakai react-hook-form:
      form.setValue("photo", {
        uri: picked.uri,
        name: picked.fileName ?? "photo.jpg",
        type: picked.type ?? "image/jpeg",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 28,
          paddingBottom: 8,
          paddingHorizontal: 8,
          alignItems: "center",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "100%" }}>
          <View style={{ alignItems: "center" }}>
            {selectedImage ? (
              <View style={{ position: "relative" }}>
                <Avatar uri={selectedImage.uri} size={72} />
                <Button
                  variant="secondary"
                  size="small"
                  onPress={() => {
                    setSelectedImage(null);
                    form.setValue("photo", "");
                  }}
                  style={{
                    position: "absolute",
                    bottom: -6,
                    right: 0,
                    backgroundColor: Colors.BLACK,
                    borderRadius: 999,
                  }}
                  textStyle={{ color: Colors.WHITE }}
                >
                  <Feather name="x" size={12} color={Colors.WHITE} />
                </Button>
              </View>
            ) : (
              <TouchableOpacity onPress={pickImage}>
                <View
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 36,
                    borderWidth: 1,
                    borderColor: Colors.BORDER,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Feather
                    name="x"
                    size={12}
                    style={{ transform: [{ rotate: "45deg" }] }}
                    color={Colors.BLACK}
                  />
                </View>
              </TouchableOpacity>
            )}

            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                width: "100%",
              }}
            >
              {isLoading ? (
                <Skeleton width={"40%"} style={{ marginBottom: 12 }} />
              ) : (
                <Text
                  style={{
                    fontFamily: "DMSans-Bold",
                    fontSize: 20,
                    color: "#0C0B0B",
                  }}
                >
                  {user?.name ?? "Guest"}
                </Text>
              )}
              {isLoading ? (
                <Skeleton width={"50%"} height={12} />
              ) : (
                <Text style={styles.text}>{user?.email}</Text>
              )}
            </View>
          </View>

          <View
            style={{
              marginTop: 24,
              width: "100%",
              borderWidth: 1,
              borderColor: Colors.BORDER,
              backgroundColor: Colors.WHITE,
              borderRadius: 24,
              padding: 16,
              gap: 20,
              shadowColor: "#D0D0D0",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: Colors.BORDER,
                  borderRadius: 999,
                }}
              >
                <Feather name="user" size={24} color="#343330" />
              </View>
              <Text style={{ fontFamily: "DMSans-Medium", fontSize: 16 }}>
                Update Profile
              </Text>
            </View>
            <FormProvider {...form}>
              <EditProfileForm
                onSubmit={onSubmit}
                loading={loadingEditProfile}
              />
            </FormProvider>
          </View>
        </View>
        <View style={{ width: "100%", gap: 8 }}>
          <Button
            onPress={form.handleSubmit(onSubmit)}
            isLoading={loadingEditProfile}
            disabled={loadingEditProfile}
          >
            Update
          </Button>
          <Button onPress={() => router.back()} variant="outline">
            Cancel
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "DMSans-Regular",
    fontSize: 14,
    color: "#111827",
  },
});

export default EditProfilePage;
