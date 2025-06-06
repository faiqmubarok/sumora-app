import illustration from "@/assets/images/illustration-1.png";
import Colors from "@/constants/color";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Button from "../button";

const NotConnected = () => {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={illustration}
          style={{ width: 212, height: 212, marginBottom: 24, marginRight: 24 }}
          contentFit="contain"
        />
        <View style={{ maxWidth: 253 }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "DMSans-Medium",
              fontSize: 18,
              marginBottom: 8,
            }}
          >
            Device Not Connected
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "DMSans-Medium",
              fontSize: 14,
              color: Colors.TEXT,
            }}
          >
            Please connect your water sensor to start checking water quality.
          </Text>
        </View>
        <Button
          onPress={() => router.push("/scanner")}
          size="large"
          style={{ marginTop: 48, alignSelf: "center" }}
        >
          Let&apos;s Connect
        </Button>
      </View>
    </View>
  );
};

export default NotConnected;
