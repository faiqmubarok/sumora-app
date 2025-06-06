import { useDeviceStore } from "@/store/device-store";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  findNodeHandle,
  ScrollView,
  Text,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BadgeStatus from "../badge-status";
import OrderedList from "../ordered-list";
import NotConnected from "./not-connected";

const dataIndicator = [
  { label: "pH Level", value: "7.2" },
  { label: "Sulfate", value: "210 mg/L" },
  { label: "Chloramines", value: "0.8 mg/L" },
  { label: "Solid", value: "1100 ppm" },
];

export default function PulsePage() {
  const { isConnected } = useDeviceStore();
  const targetRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [markerPercent, setMarkerPercent] = useState(0.7);
  const [dataHistory, setDataHistory] = useState<number[]>([
    80, 60, 30, 35, 75, 85, 70, 60, 25, 30, 80, 85,
  ]);

  useEffect(() => {
    const node = findNodeHandle(targetRef.current);
    if (node) {
      UIManager.measure(node, (_x, _y, width) => {
        setElementWidth(width);
      });
    }
  }, []);

  const markerLeft = elementWidth * markerPercent;

  const bubbleWidth = 120;
  let offset = bubbleWidth / 2;

  if (markerLeft < bubbleWidth / 2) {
    offset = markerLeft;
  }

  if (markerLeft > elementWidth - bubbleWidth / 2) {
    offset = bubbleWidth - (elementWidth - markerLeft);
  }

  const bubbleLeft = markerLeft - offset;

  const getColor = (value: number) => {
    if (value > 60) return "#3ACE10";
    if (value >= 40) return "#FFFB00";
    return "#E51A1A";
  };

  const getStatus = (value: number) => {
    if (value > 60) return "success";
    if (value >= 40) return "warning";
    return "danger";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newPercent = Math.random();
      setMarkerPercent(newPercent);

      const newValue = Math.round(newPercent * 100);
      setDataHistory((prev) => {
        const updated = [newValue, ...prev];
        if (updated.length > 12) {
          updated.pop();
        }
        return updated;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        {!isConnected ? (
          <NotConnected />
        ) : (
          <ScrollView
            style={{
              paddingHorizontal: 8,
              backgroundColor: "white",
              paddingTop: 8,
              flex: 1,
            }}
          >
            {/* Water History */}
            <View
              style={{
                padding: 16,
                flexDirection: "column",
                gap: 24,
                borderBottomWidth: 1,
                borderBlockColor: "#E2E2E2",
                elevation: 1,
                backgroundColor: "#FFFFFF",
                borderRadius: 24,
                marginBottom: 8,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <View
                  style={{
                    padding: 12,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: "#E2E2E2",
                  }}
                >
                  <MaterialCommunityIcons
                    name="history"
                    size={24}
                    color="#343330"
                  />
                </View>
                <Text
                  style={{
                    fontFamily: "DMSans-Medium",
                    fontSize: 16,
                    color: "black",
                  }}
                >
                  History
                </Text>
              </View>
              <View style={{ gap: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 54,
                    borderLeftWidth: 1,
                    flex: 1,
                    width: "100%",
                    borderLeftColor: "#E2E2E2",
                  }}
                >
                  {/* Grafik */}
                  {[...dataHistory].reverse().map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        borderRightColor: "#E2E2E2",
                        height: "100%",
                        borderRightWidth: 1,
                      }}
                    >
                      <View
                        style={{
                          height: `${100 - item}%`,
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          paddingHorizontal: 2,
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            height: 4,
                            borderRadius: 999,
                            elevation: 3,
                            shadowColor: "#34C70A",
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 0.8,
                            shadowRadius: 6,
                            backgroundColor: getColor(item),
                          }}
                        ></View>
                      </View>
                    </View>
                  ))}
                </View>
                <View
                  style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
                >
                  <AntDesign name="clockcircleo" size={24} color="#C0C0BE" />
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#C0C0BE",
                      fontFamily: "DMSans-Regular",
                    }}
                  >
                    4 h
                  </Text>
                </View>
              </View>
            </View>
            {/* Water Indicator */}
            <View
              style={{
                padding: 16,
                flexDirection: "column",
                gap: 62,
                borderBottomWidth: 1,
                borderBlockColor: "#E2E2E2",
                elevation: 1,
                backgroundColor: "#232222",
                borderRadius: 24,
                marginBottom: 8,
              }}
            >
              {/* Header */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <View
                    style={{
                      padding: 12,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: "#424242",
                    }}
                  >
                    <Ionicons name="water-outline" size={24} color="white" />
                  </View>
                  <Text
                    style={{
                      fontFamily: "DMSans-Medium",
                      fontSize: 16,
                      color: "white",
                    }}
                  >
                    Water Quality Update
                  </Text>
                </View>
                <BadgeStatus variant={getStatus(markerPercent * 100)} />
              </View>
              {/* Content */}
              <View style={{ gap: 48 }}>
                <View ref={targetRef} style={{ position: "relative" }}>
                  <LinearGradient
                    colors={["#E51A1A", "#FFFB00", "#3ACE10"]}
                    locations={[0, 0.5, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      height: 36,
                      borderRadius: 999,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {Array.from({ length: 70 }).map((_, index) => (
                      <View
                        key={index}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 4 + index * 8,
                          bottom: 0,
                          width: 1,
                          backgroundColor: "#E3E3E3",
                        }}
                      />
                    ))}
                  </LinearGradient>

                  {/* Marker */}
                  <View
                    style={{
                      position: "absolute",
                      top: 12,
                      left: markerLeft - 4,
                      width: 8,
                      height: 12,
                      borderRadius: 4,
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#E2E2E2",
                    }}
                  />

                  {/* Bubble teks */}
                  <View
                    style={{
                      position: "absolute",
                      top: -43,
                      left: bubbleLeft,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 999,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                    }}
                  >
                    <Text
                      style={{ fontSize: 12, fontFamily: "DMSans-Regular" }}
                    >
                      Your water status
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "#2B2B2B",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderRadius: 12,
                  }}
                >
                  {Array.from({ length: dataIndicator.length / 2 }).map(
                    (_, index) => {
                      const left = dataIndicator[index * 2];
                      const right = dataIndicator[index * 2 + 1];

                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            paddingVertical: 12,
                            borderBottomWidth:
                              index !== dataIndicator.length / 2 - 1 ? 1 : 0,
                            borderBottomColor: "#424242",
                          }}
                        >
                          {/* Left item */}
                          <View style={{ gap: 4, flex: 1 }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#6E6E6E",
                                fontFamily: "DMSans-Regular",
                              }}
                            >
                              {left.label}
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "white",
                                fontFamily: "DMSans-SemiBold",
                              }}
                            >
                              {left.value}
                            </Text>
                          </View>

                          {/* Separator */}
                          <View
                            style={{
                              width: 1,
                              height: "80%",
                              backgroundColor: "#424242",
                            }}
                          />

                          {/* Right item */}
                          <View
                            style={{ gap: 4, flex: 1, alignItems: "flex-end" }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                color: "#6E6E6E",
                                fontFamily: "DMSans-Regular",
                              }}
                            >
                              {right.label}
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                color: "white",
                                fontFamily: "DMSans-SemiBold",
                              }}
                            >
                              {right.value}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                  )}
                </View>
              </View>
            </View>
            {/* Quotes */}
            <View
              style={{
                padding: 16,
                flexDirection: "column",
                gap: 24,
                marginBottom: 12,
                borderBottomWidth: 1,
                borderBlockColor: "#E2E2E2",
                elevation: 2,
                backgroundColor: "white",
                borderRadius: 24,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <View
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    borderWidth: 1,
                    borderColor: "#E2E2E2",
                    borderRadius: 999,
                  }}
                >
                  <Ionicons name="clipboard-outline" size={24} color="black" />
                </View>
                <Text style={{ fontFamily: "DMSans-Medium", fontSize: 16 }}>
                  How’s Your Water Today?
                </Text>
              </View>
              <View style={{ gap: 16 }}>
                <Text
                  style={{
                    fontFamily: "DMSans-Regular",
                    fontSize: 14,
                    lineHeight: 24,
                    color: "#646464",
                  }}
                >
                  The water quality is currently in excellent condition — clear,
                  safe, and suitable for daily household use such as bathing,
                  washing, and even cooking. Regular monitoring can help ensure
                  this quality is maintained over time.
                </Text>
                <View style={{ gap: 4 }}>
                  <Text
                    style={{
                      fontFamily: "DMSans-SemiBold",
                      fontSize: 14,
                      lineHeight: 24,
                    }}
                  >
                    Tips & Suggestions:
                  </Text>
                  <OrderedList
                    textStyle={{ color: "#646464" }}
                    bulletStyle={{ color: "#646464" }}
                    data={[
                      "Keep the water source clean and free from debris.",
                      "Schedule regular water checks to detect early changes.",
                      "Store water in closed, clean containers to avoid contamination.",
                      "Avoid direct exposure of stored water to sunlight for extended periods.",
                    ]}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}
