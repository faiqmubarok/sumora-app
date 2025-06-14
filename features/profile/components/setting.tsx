import { useDialog } from "@/components/dialog";
import { CustomSwitch } from "@/components/switch";
import { useToast } from "@/components/toast";
import Colors from "@/constants/color";
import { ProfileNavigation, Type } from "@/data/profile.navigation";
import { deleteDeviceId } from "@/lib/secure-device";
import { deleteAccessToken } from "@/lib/secure-store";
import { useDeviceStore } from "@/store/device-store";
import AntDesign from "@expo/vector-icons/AntDesign";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Setting = ({
  item,
  isLast,
}: {
  item: ProfileNavigation;
  isLast: boolean;
}) => {
  const router = useRouter();
  const { reset } = useDeviceStore();
  const { show } = useDialog();
  const { show: toastShow } = useToast();

  const [isEnabled, setIsEnabled] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<
    "granted" | "denied" | "undetermined"
  >("undetermined");

  useEffect(() => {
    Notifications.getPermissionsAsync().then(({ status }) => {
      setPermissionStatus(status);
      setIsEnabled(status === "granted");
    });
  }, []);

  const handleLogout = () => {
    show({
      title: "Logout",
      description: "Are you sure you want to logout?",
      cancelText: "Cancel",
      confirmText: "Confirm",
      onConfirm: async () => {
        await deleteAccessToken();
        await deleteDeviceId();
        reset();

        toastShow({
          title: "Logout successful",
          description: "You have been logged out",
          variant: "success",
        });
        router.replace("/");
      },
    });
  };

  const handleToggleNotification = async (val: boolean) => {
    if (val) {
      if (permissionStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        setPermissionStatus(status);
        if (status !== "granted") {
          Alert.alert(
            "Izin Diperlukan",
            "Aplikasi membutuhkan izin notifikasi untuk mengaktifkan fitur ini."
          );
          setIsEnabled(false);
          return;
        }
      }
      if (!Constants.isDevice || Constants.appOwnership !== "expo") {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Notifikasi Aktif 🎉",
            body: "Kamu sekarang akan menerima pemberitahuan dari aplikasi ini.",
          },
          trigger: null,
        });
      }
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => isLast && handleLogout()}
      activeOpacity={0.4}
    >
      <View style={styles.containerItem}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={[
              styles.containerIcon,
              {
                backgroundColor: isLast ? "rgba(229, 26, 26, 0.1)" : "#fff",
                elevation: 1,
              },
            ]}
          >
            {item.icon}
          </View>
          <Text
            style={[
              styles.text,
              {
                color: isLast ? Colors.DESTRUCTIVE : "#111827",
              },
            ]}
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
          <AntDesign name="arrowright" size={24} color={Colors.TEXT} />
        ) : null}
      </View>
      {!isLast && <View style={styles.separator} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "DMSans-Regular",
    fontSize: 14,
    color: "#111827",
  },
  containerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  separator: {
    height: 1,
    marginVertical: 4,
    backgroundColor: Colors.BORDER,
  },
  containerIcon: {
    borderRadius: 8,
    padding: 8,
    shadowColor: Colors.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default Setting;
