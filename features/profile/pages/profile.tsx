import Avatar from "@/components/avatar";
import Button from "@/components/button";
import { Skeleton } from "@/components/skeleton";
import { useToast } from "@/components/toast";
import Colors from "@/constants/color";
import { profileNavigation } from "@/data/profile.navigation";
import { getDecodedAccessToken } from "@/lib/secure-store";
import { useDeviceStore } from "@/store/device-store";
import { Profile } from "@/types/profile";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchProfile } from "../api/use-fetch-profile";
import ContainerSection from "../components/container-section";
import Setting from "../components/setting";

type UserFieldKey = keyof Pick<Profile, "name" | "email" | "phone">;

const profile: {
  id: number;
  label: string;
  icon: React.ReactNode;
  key?: UserFieldKey;
}[] = [
  {
    id: 1,
    label: "Name",
    key: "name",
    icon: <AntDesign name="user" size={24} color="black" />,
  },
  {
    id: 2,
    label: "Email",
    key: "email",
    icon: (
      <MaterialCommunityIcons name="email-outline" size={24} color="black" />
    ),
  },
  {
    id: 3,
    label: "Phone",
    key: "phone",
    icon: (
      <AntDesign
        name="phone"
        size={24}
        color="black"
        style={{ transform: [{ scaleX: -1 }] }}
      />
    ),
  },
];

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

const ProfilePage = () => {
  const { show: toastShow } = useToast();
  const router = useRouter();
  const { isConnected } = useDeviceStore();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getDecodedAccessToken();
      if (token) setUserId(token.id);
    };

    fetchUser();
  }, []);

  const { data: user, isLoading } = useFetchProfile({
    id: userId ?? "",
    onError(e) {
      console.log(e);
      toastShow({
        title: "",
        description: "",
        variant: "error",
      });
    },
  });

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
            <Avatar
              uri={user?.photo ?? undefined}
              size={72}
              fallbackText={user?.email.slice(0, 1)}
            />
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
            {profile.map((item, i) => {
              const value = item.key ? user?.[item.key] ?? "-" : "-";

              return (
                <ProfileItem
                  key={item.id}
                  label={item.label}
                  value={value}
                  icon={item.icon}
                  isLast={false}
                  isConnected={false}
                  onConnect={() => {}}
                />
              );
            })}

            {/* Device ID */}
            <ProfileItem
              label="Device ID"
              value={user?.devices?.[0]?.name ?? "-"}
              icon={<MaterialIcons name="device-hub" size={24} color="black" />}
              isLast={true}
              isConnected={isConnected}
              onConnect={() => router.push("/scanner")}
            />
          </ContainerSection>

          <ContainerSection title="App Settings" style={{ marginTop: 24 }}>
            {profileNavigation.map((item, i, arr) => (
              <Setting
                key={item.id}
                item={item}
                isLast={i === arr.length - 1}
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
