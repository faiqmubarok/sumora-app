import Colors from "@/constants/color";
import { TanstackProvider } from "@/providers/tanstack-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "DMSans-Light": require("@/assets/fonts/DMSans-Light.ttf"),
    "DMSans-Regular": require("@/assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Medium": require("@/assets/fonts/DMSans-Medium.ttf"),
    "DMSans-SemiBold": require("@/assets/fonts/DMSans-SemiBold.ttf"),
    "DMSans-Bold": require("@/assets/fonts/DMSans-Bold.ttf"),
  });

  const [appReady, setAppReady] = useState(false);
  const startTime = useRef(performance.now());

  useEffect(() => {
    if (fontsLoaded) {
      const elapsed = performance.now() - startTime.current;
      const remaining = Math.max(1000 - elapsed, 0);

      const timeout = setTimeout(() => {
        setAppReady(true);
      }, remaining);

      return () => clearTimeout(timeout);
    }
  }, [fontsLoaded]);

  if (!appReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <TanstackProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="light" />
    </TanstackProvider>
  );
}
