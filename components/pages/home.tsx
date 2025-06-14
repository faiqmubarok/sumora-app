import Button from "@/components/button";
import Colors from "@/constants/color";
import { insight } from "@/data/water-insight";
import { useFetchProfile } from "@/features/profile/api/use-fetch-profile";
import { getDecodedAccessToken } from "@/lib/secure-store";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import { router, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Avatar from "../avatar";
import BadgeStatus from "../badge-status";
import { useToast } from "../toast";

enum Label {
  Fresh = "fresh",
  Urgent = "urgent",
}

const news: { time: string; name: string; label: string }[] = [
  {
    time: "09:21",
    name: "Check Well Water Quality",
    label: Label.Fresh,
  },
  {
    time: "05:21",
    name: "High Contaminants Detected",
    label: Label.Urgent,
  },
  {
    time: "09:21",
    name: "Check Well Water Quality",
    label: Label.Fresh,
  },
];

type Overview = {
  name: string;
  image: ImageSourcePropType;
  coordinates?: {
    latitude: string;
    longitude: string;
  };
  label?: { ppm: number; ph: number };
};

const CardNews = ({
  time,
  name,
  label,
}: {
  time: string;
  name: string;
  label: string;
}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        borderRadius: 16,
        padding: 12,
        width: 174,
        height: 162,
        alignSelf: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 4 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <MaterialCommunityIcons
            name="clock-time-three-outline"
            size={20}
            color="#A5A5A5"
          />
          <Text
            style={{
              fontFamily: "DMSans-Medium",
              fontSize: 14,
              color: "#A5A5A5",
            }}
          >
            {time}
          </Text>
        </View>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{ fontFamily: "DMSans-Medium", fontSize: 16 }}
        >
          {name}
        </Text>
      </View>
      <BadgeStatus
        style={{ alignSelf: "flex-start" }}
        variant={label === Label.Fresh ? "success" : "danger"}
      />
    </View>
  );
};

interface CardOverviewProps extends Overview {
  id: number;
  variant?: "overview" | "article";
  date?: string;
}

const CardOverview = ({
  id,
  name,
  image,
  coordinates,
  label = { ppm: 0, ph: 0 },
  variant = "overview",
  date,
}: CardOverviewProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/article/${id}`)}
      style={{ flexDirection: "row", gap: 16 }}
      activeOpacity={0.6}
    >
      <Image
        source={image}
        width={122}
        height={96}
        borderRadius={8}
        alt={name}
        style={{
          overflow: "hidden",
          width: 122,
          height: 96,
          objectFit: "cover",
        }}
      />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={{ gap: 4 }}>
          <Text
            style={{
              fontFamily: "DMSans-Medium",
              fontSize: 16,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {name}
          </Text>
          {variant === "overview" ? (
            <Text style={{ fontFamily: "DMSans-Regular", color: "#A5A5A5" }}>
              {coordinates?.latitude}, {coordinates?.longitude}
            </Text>
          ) : null}
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {variant === "overview" ? (
            Object.entries(label).map(([key, value]) => (
              <View
                key={key}
                style={{
                  alignSelf: "flex-start",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  gap: 4,
                  marginTop: 8,
                  borderRadius: 999,
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: "#E2E2E2",
                }}
              >
                {key === "ppm" ? (
                  <MaterialCommunityIcons
                    name="water"
                    size={16}
                    color="#4D4D4D"
                  />
                ) : (
                  <FontAwesome5 name="microscope" size={16} color="#4D4D4D" />
                )}
                <Text
                  style={{ fontFamily: "DMSans-Regular", color: "#4D4D4D" }}
                >
                  {value} {key}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{ fontFamily: "DMSans-Regular", color: "#A5A5A5" }}>
              {date}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function HomePage() {
  const { show } = useToast();
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    photo?: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getDecodedAccessToken();
      if (token) {
        const defaultName = token.name ?? "Guest";
        setUser({
          id: token.id ?? "",
          name: defaultName,
          email: token.email ?? "",
          photo: token.photo?.url ?? "",
        });
      }
    };

    fetchUser();
  }, []);

  const { data: userData } = useFetchProfile({
    id: user?.id ?? "",
    onError(e) {
      console.log(e);
      show({
        title: "Error",
        description: "Error fetching user",
        variant: "error",
      });
    },
  });

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning!";
    if (hour < 17) return "Good afternoon!";
    if (hour < 21) return "Good evening!";
    return "Good night!";
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="light" translucent />
      <ImageBackground
        source={require("@/assets/images/banner-homepage.png")}
        imageStyle={{ flex: 1 }}
      >
        <ScrollView>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 60,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => router.push("/profile")}
              style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
            >
              <Avatar
                size={44}
                borderRadius={22}
                // fallbackText={user?.email.slice(0, 1)}
                fallbackText={userData?.email.slice(0, 1)}
                uri={userData?.photo?.url}
              />
              <View>
                <Text
                  style={{
                    color: Colors.WHITE,
                    fontFamily: "DMSans-SemiBold",
                    fontSize: 16,
                  }}
                >
                  {getGreeting()}
                </Text>
                <Text
                  style={{ color: Colors.WHITE, fontFamily: "DMSans-Regular" }}
                >
                  {userData?.name}
                </Text>
              </View>
            </TouchableOpacity>
            <BlurView
              // experimentalBlurMethod="dimezisBlurView"
              intensity={15}
              tint="light"
              style={{
                borderRadius: 999,
                overflow: "hidden",
                backgroundColor: "rgba(169,169,169,0.15)",
                width: 44,
                height: 44,
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Button
                variant="secondary"
                style={{ backgroundColor: "transparent" }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color="white"
                />
              </Button>
              {/* Badge Merah */}
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: "#E71212",
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
              />
            </BlurView>
          </View>

          {/* Info */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 16,
              marginTop: 224,
              marginBottom: 13,
            }}
          >
            <View>
              <Text
                style={{
                  fontFamily: "DMSans-Medium",
                  fontSize: 64,
                  height: 64,
                  lineHeight: 72,
                  color: Colors.WHITE,
                  letterSpacing: 0.5,
                  marginBottom: 4,
                }}
              >
                85
              </Text>
              <Text
                style={{
                  fontFamily: "DMSans-Regular",
                  fontSize: 16,
                  color: Colors.WHITE,
                }}
              >
                Safe for daily use
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              <BlurView
                intensity={15}
                tint="light"
                style={{
                  alignSelf: "flex-end",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  gap: 8,
                  backgroundColor: "rgba(169,169,169,0.15)",
                  borderRadius: 999,
                  overflow: "hidden",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons name="water" size={16} color="white" />
                <Text style={{ color: Colors.WHITE }}>150 ppm</Text>
              </BlurView>
              <BlurView
                intensity={15}
                tint="light"
                style={{
                  alignSelf: "flex-end",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  gap: 8,
                  backgroundColor: "rgba(169,169,169,0.15)",
                  borderRadius: 999,
                  overflow: "hidden",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 name="microscope" size={16} color="white" />
                <Text style={{ color: Colors.WHITE }}>8.2 pH</Text>
              </BlurView>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 4 }}
          >
            {news.map((item, index) => (
              <CardNews
                key={index}
                time={item.time}
                name={item.name}
                label={item.label}
              />
            ))}
          </ScrollView>

          <View
            style={{
              backgroundColor: Colors.WHITE,
              marginTop: 4,
              flex: 1,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              padding: 16,
              gap: 28,
            }}
          >
            {/* Water Insight */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontFamily: "DMSans-SemiBold", fontSize: 20 }}>
                Water Insights
              </Text>
              <Pressable>
                <Text
                  style={{ fontFamily: "DMSans-Regular", color: "#0A40E2" }}
                >
                  View All
                </Text>
              </Pressable>
            </View>
            {insight.map((item, index) => (
              <CardOverview
                id={item.id}
                key={index}
                name={item.name}
                image={item.image}
                date={item.date}
                variant="article"
              />
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
