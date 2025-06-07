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
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleProp,
  StyleSheet,
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
}) => (
  <View style={style}>
    <Text
      style={[
        styles.text,
        {
          marginBottom: 12,
          color: Colors.BLACK,
        },
      ]}
    >
      {title}
    </Text>
    <View
      style={{
        borderRadius: 16,
        backgroundColor: "#F3F3F3",
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.BORDER,
      }}
    >
      {children}
    </View>
  </View>
);

const ProfileItem = ({
  label,
  value,
  icon,
  isLast,
  isConnected,
  onConnect,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  isLast: boolean;
  isConnected: boolean;
  onConnect: () => void;
}) => (
  <View>
    <View style={styles.containerItem}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={styles.containerIcon}>{icon}</View>
        <View
          style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}
        >
          <Text
            style={[
              styles.text,
              { fontFamily: "DMSans-SemiBold", fontSize: 12 },
            ]}
          >
            {label}
          </Text>
          <Text style={styles.text}>
            {isLast ? (isConnected ? value : "Not Connected") : value}
          </Text>
        </View>
      </View>
      {isLast && !isConnected && (
        <Button
          onPress={onConnect}
          variant="primary"
          size="small"
          textStyle={{ fontSize: 12 }}
        >
          Connect
        </Button>
      )}
    </View>
    {!isLast && <View style={styles.separator} />}
  </View>
);

const SettingItem = ({
  item,
  isLast,
  isEnabled,
  onToggle,
  onLogout,
}: {
  item: ProfileNavigation;
  isLast: boolean;
  isEnabled: boolean;
  onToggle: (v: boolean) => void;
  onLogout: () => void;
}) => (
  <TouchableOpacity onPress={() => isLast && onLogout()} activeOpacity={0.4}>
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
        <CustomSwitch value={isEnabled} onValueChange={onToggle} />
      ) : item.type === Type.Arrow ? (
        <AntDesign name="arrowright" size={24} color={Colors.TEXT} />
      ) : null}
    </View>
    {!isLast && <View style={styles.separator} />}
  </TouchableOpacity>
);

const ProfilePage = () => {
  const { show } = useDialog();
  const { show: toastShow } = useToast();
  const router = useRouter();
  const { isConnected } = useDeviceStore();
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 16,
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", maxWidth: 480, marginBottom: 64 }}>
          <View style={{ alignItems: "center" }}>
            <Avatar uri={photoProfile} size={72} fallbackText="KC" />
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text
                style={{
                  fontFamily: "DMSans-Bold",
                  fontSize: 20,
                  color: "#0C0B0B",
                }}
              >
                Kim Chaewon
              </Text>
              <Text style={styles.text}>KimChaewon@gmail.com</Text>
              <Button
                variant="outline"
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  borderRadius: 8,
                }}
                textStyle={{ color: "white" }}
              >
                Edit Profile
              </Button>
            </View>
          </View>

          <ContainerSection title="User Profile" style={{ marginTop: 24 }}>
            {profile.map((item, i, arr) => (
              <ProfileItem
                key={item.id}
                {...item}
                isLast={i === arr.length - 1}
                isConnected={isConnected}
                onConnect={() => router.push("/scanner")}
              />
            ))}
          </ContainerSection>

          <ContainerSection title="App Settings" style={{ marginTop: 24 }}>
            {profileNavigation.map((item, i, arr) => (
              <SettingItem
                key={item.id}
                item={item}
                isLast={i === arr.length - 1}
                isEnabled={isEnabled}
                onToggle={handleToggleNotification}
                onLogout={handleLogout}
              />
            ))}
          </ContainerSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    marginVertical: 4,
    backgroundColor: Colors.BORDER,
  },
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
  containerIcon: {
    borderRadius: 8,
    padding: 8,
    shadowColor: Colors.SHADOW,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default ProfilePage;
