import photoProfile from "@/assets/images/avatar.png";
import Colors from "@/constants/color";
import {
  ProfileNavigation,
  profileNavigation,
  Type,
} from "@/data/profile.navigation";
import { useDeviceStore } from "@/store/device-store";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../avatar";
import Button from "../button";
import { useDialog } from "../dialog";
import { CustomSwitch } from "../switch";
import { useToast } from "../toast";

const profile = [
  {
    id: 1,
    label: "Name",
    value: "Kim Chaewon",
    icon: <AntDesign name="user" size={24} color="black" />,
  },
  {
    id: 2,
    label: "Email",
    value: "Kimchaewon@gmail.com",
    icon: (
      <MaterialCommunityIcons name="email-outline" size={24} color="black" />
    ),
  },
  {
    id: 3,
    label: "Phone",
    value: "+62085159395663",
    icon: (
      <AntDesign
        name="phone"
        size={24}
        color="black"
        style={{ transform: [{ scaleX: -1 }] }}
      />
    ),
  },
  {
    id: 4,
    label: "Device ID",
    value: "SMR-323478",
    icon: <MaterialIcons name="device-hub" size={24} color="black" />,
  },
];

const ContainerSection = ({
  children,
  title,
  style,
}: {
  title: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) => {
  return (
    <View style={style}>
      <Text
        style={{
          fontFamily: "DMSans-Regular",
          fontSize: 14,
          marginBottom: 12,
          color: "black",
        }}
      >
        {title}
      </Text>
      <View
        style={{
          borderRadius: 16,
          backgroundColor: "#F3F3F3",
          padding: 12,
          borderWidth: 1,
          borderColor: "#DBDBDB",
        }}
      >
        {children}
      </View>
    </View>
  );
};

const ProfilePage = () => {
  const { show } = useDialog();
  const { show: toastShow } = useToast();
  const router = useRouter();
  const { isConnected } = useDeviceStore();
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggleNotification = async (newValue: boolean) => {
    if (newValue) {
      // Cek status izin notifikasi
      let currentStatus = (await Notifications.getPermissionsAsync()).status;

      if (currentStatus !== "granted") {
        const { status: requestStatus } =
          await Notifications.requestPermissionsAsync();
        currentStatus = requestStatus;
      }

      if (currentStatus !== "granted") {
        Alert.alert(
          "Izin Diperlukan",
          "Aplikasi membutuhkan izin notifikasi untuk mengaktifkan fitur ini."
        );
        setIsEnabled(false);
        return;
      }

      // Kalau bukan di Expo Go, schedule local notification sebagai konfirmasi
      if (!Constants.isDevice || Constants.appOwnership !== "expo") {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Notifikasi Aktif 🎉",
            body: "Kamu sekarang akan menerima pemberitahuan dari aplikasi ini.",
          },
          trigger: null,
        });
      } else {
        // Kalau di Expo Go, skip schedule notif dan cuma log
        console.log("Running in Expo Go, skip scheduling notification");
      }

      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  };

  const handleLogout = () => {
    show({
      title: "Logout",
      description: "Are you sure you want to logout?",
      cancelText: "Cancel",
      confirmText: "Confirm",
      onConfirm: () => {
        toastShow({
          title: "Logout successful",
          description: "You have been logged out",
          variant: "success",
        });
        router.replace("/");
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 16,
          alignItems: "center",
        }}
      >
        {/* Kontainer utama */}
        <View style={{ width: "100%", maxWidth: 480, marginBottom: 64 }}>
          {/* Avatar + Nama + Email + Button */}
          <View style={{ alignItems: "center" }}>
            <Avatar uri={photoProfile} size={72} fallbackText="KC" />
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text
                style={{
                  fontFamily: "DMSans-Bold",
                  fontSize: 20,
                  textAlign: "center",
                  color: "#0C0B0B",
                }}
              >
                Kim Chaewon
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans-Regular",
                  fontSize: 14,
                  textAlign: "center",
                  color: "#0C0B0B",
                }}
              >
                KimChaewon@gmail.com
              </Text>
              <Button
                variant="outline"
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  borderRadius: 8,
                }}
                textStyle={{
                  color: "white",
                }}
              >
                Edit Profile
              </Button>
            </View>
          </View>

          {/* Section: User Profile */}
          <ContainerSection title="User Profile" style={{ marginTop: 24 }}>
            {profile.map((item, index, array) => {
              const isLastItem = index === array.length - 1;
              return (
                <View key={item.id}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingVertical: 12,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <View
                        style={{
                          borderRadius: 8,
                          padding: 8,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.1,
                          shadowRadius: 10,
                        }}
                      >
                        {item.icon}
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "DMSans-SemiBold",
                            fontSize: 12,
                            color: "#111827",
                          }}
                        >
                          {item.label}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "DMSans-Regular",
                            fontSize: 14,
                            color: "#111827",
                          }}
                        >
                          {isLastItem
                            ? isConnected
                              ? item.value
                              : "Not Connected"
                            : item.value}
                        </Text>
                      </View>
                    </View>
                    {isLastItem ? (
                      isConnected ? (
                        item.value
                      ) : (
                        <Button
                          onPress={() => router.push("/scanner")}
                          variant="primary"
                          size="small"
                          textStyle={{
                            fontSize: 12,
                          }}
                        >
                          Connect
                        </Button>
                      )
                    ) : null}
                  </View>
                  {!isLastItem && (
                    <View
                      style={{
                        height: 1,
                        marginVertical: 4,
                        backgroundColor: "#DBDBDB",
                      }}
                    />
                  )}
                </View>
              );
            })}
          </ContainerSection>

          {/* Section: App Settings */}
          <ContainerSection title="App Settings" style={{ marginTop: 24 }}>
            {profileNavigation.map(
              (item: ProfileNavigation, index: number, array) => {
                const isLastItem = index === array.length - 1;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (isLastItem) handleLogout();
                    }}
                    key={item.id}
                    activeOpacity={0.4}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingVertical: 12,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: isLastItem
                              ? "rgba(229, 26, 26, 0.1)"
                              : "#fff",
                            borderRadius: 8,
                            padding: 8,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 10,
                          }}
                        >
                          {item.icon}
                        </View>
                        <Text
                          style={{
                            fontFamily: "DMSans-Regular",
                            fontSize: 14,
                            color: isLastItem ? Colors.DESTRUCTIVE : "#111827",
                          }}
                        >
                          {item.name}
                        </Text>
                      </View>
                      {item.type === Type.Toggle ? (
                        <CustomSwitch
                          value={isEnabled}
                          onValueChange={handleToggleNotification}
                        />
                      ) : item.type === Type.Arrow ? (
                        <AntDesign
                          name="arrowright"
                          size={24}
                          color="#B5B3B3"
                        />
                      ) : null}
                    </View>
                    {!isLastItem && (
                      <View
                        style={{
                          height: 1,
                          marginVertical: 4,
                          backgroundColor: "#DBDBDB",
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              }
            )}
          </ContainerSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
