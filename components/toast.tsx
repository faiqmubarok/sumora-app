import Colors from "@/constants/color";
import React, { createContext, useCallback, useContext, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const ToastContext = createContext<{
  show: (options: ToastOptions) => void;
} | null>(null);

type ToastOptions = {
  title: string;
  description?: string;
  variant?: "success" | "error" | "info";
  duration?: number;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const show = useCallback((options: ToastOptions) => {
    setToast(options);
    setTimeout(() => {
      setToast(null);
    }, options.duration || 3000);
  }, []);

  const backgroundColor =
    toast?.variant === "success"
      ? Colors.SUCCESS
      : toast?.variant === "error"
      ? Colors.DESTRUCTIVE
      : "#60a5fa"; // info

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast && (
        <Animated.View
          entering={SlideInUp}
          exiting={SlideOutUp}
          style={StyleSheet.absoluteFill}
          pointerEvents="box-none"
        >
          <SafeAreaView
            style={{
              alignItems: "center",
              position: "absolute",
              top: 32,
              width: Dimensions.get("window").width,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                backgroundColor,
                padding: 16,
                borderRadius: 12,
                maxWidth: 400,
                width: "100%",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 10,
              }}
            >
              <Text
                style={{ fontWeight: "bold", color: "white", fontSize: 16 }}
              >
                {toast.title}
              </Text>
              {!!toast.description && (
                <Text style={{ color: "white", marginTop: 4 }}>
                  {toast.description}
                </Text>
              )}
            </View>
          </SafeAreaView>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
