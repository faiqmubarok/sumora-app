import TabBar from "@/components/tab-bar";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          borderTopWidth: 0,
          position: "absolute",
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="pulse" />
      <Tabs.Screen name="report" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
