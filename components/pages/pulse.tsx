import Colors from "@/constants/color";
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
import Card from "../card";
import OrderedList from "../ordered-list";
import NotConnected from "./not-connected";

const dataIndicator = [
  { label: "pH Level", value: "7.2" },
  { label: "Sulfate", value: "210 mg/L" },
  { label: "Chloramines", value: "0.8 mg/L" },
  { label: "Solid", value: "1100 ppm" },
];

const getStatus = (value: number) =>
  value > 60 ? "success" : value >= 40 ? "warning" : "danger";

const getColor = (value: number) =>
  value > 60
    ? Colors.SUCCESS
    : value >= 40
    ? Colors.WARNING
    : Colors.DESTRUCTIVE;

const HistoryChart = ({ data }: { data: number[] }) => (
  <Card
    title="History"
    icon={<MaterialCommunityIcons name="history" size={24} color="#343330" />}
  >
    <View style={{ gap: 12 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 54,
          borderLeftWidth: 1,
          borderLeftColor: Colors.BORDER,
        }}
      >
        {[...data].reverse().map((val, idx) => (
          <View
            key={idx}
            style={{
              flex: 1,
              borderRightWidth: 1,
              borderRightColor: Colors.BORDER,
              height: "100%",
            }}
          >
            <View
              style={{
                height: `${100 - val}%`,
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
                  elevation: 6,
                  backgroundColor: getColor(val),
                  shadowColor: getColor(val),
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 1,
                  shadowRadius: 6,
                }}
              />
            </View>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
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
  </Card>
);

const WaterQualityIndicator = ({
  markerLeft,
  bubbleLeft,
  percent,
  targetRef,
}: {
  markerLeft: number;
  bubbleLeft: number;
  percent: number;
  targetRef: any;
}) => (
  <Card
    title="Water Quality Update"
    icon={<Ionicons name="water-outline" size={24} color="white" />}
    iconBackground="#2B2B2B"
    variant="dark"
    headerRight={<BadgeStatus variant={getStatus(percent * 100)} />}
  >
    <View style={{ gap: 48, marginTop: 40 }}>
      <View ref={targetRef} style={{ position: "relative" }}>
        <LinearGradient
          colors={[Colors.DESTRUCTIVE, "#FFFB00", "#3ACE10"]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: 36,
            borderRadius: 999,
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
        <View
          style={{
            position: "absolute",
            top: 12,
            left: markerLeft - 4,
            width: 8,
            height: 12,
            borderRadius: 4,
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderColor: "#E2E2E2",
          }}
        />
        <View
          style={{
            position: "absolute",
            top: -43,
            left: bubbleLeft,
            backgroundColor: "#FFF",
            borderRadius: 999,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <Text style={{ fontSize: 12, fontFamily: "DMSans-Regular" }}>
            Your water status
          </Text>
        </View>
      </View>

      {/* Indicator values */}
      <View
        style={{
          backgroundColor: "#2B2B2B",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 12,
        }}
      >
        {Array.from({ length: dataIndicator.length / 2 }).map((_, i) => {
          const left = dataIndicator[i * 2];
          const right = dataIndicator[i * 2 + 1];
          return (
            <View
              key={i}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: i !== dataIndicator.length / 2 - 1 ? 1 : 0,
                borderBottomColor: "#424242",
                justifyContent: "space-between",
              }}
            >
              {[left, right].map((item, idx) => (
                <React.Fragment key={idx}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: idx === 0 ? "flex-start" : "flex-end",
                      gap: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#6E6E6E",
                        fontFamily: "DMSans-Regular",
                      }}
                    >
                      {item.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "white",
                        fontFamily: "DMSans-SemiBold",
                      }}
                    >
                      {item.value}
                    </Text>
                  </View>
                  {idx % 2 === 0 && (
                    <View
                      style={{
                        width: 1,
                        height: "80%",
                        backgroundColor: "#424242",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>
          );
        })}
      </View>
    </View>
  </Card>
);

const QuotesCard = () => (
  <Card
    title="How’s Your Water Today?"
    icon={<Ionicons name="clipboard-outline" size={24} color="black" />}
  >
    <View style={{ gap: 16 }}>
      <Text
        style={{
          fontFamily: "DMSans-Regular",
          fontSize: 14,
          lineHeight: 24,
          color: Colors.TEXT,
        }}
      >
        The water quality is currently in excellent condition — clear, safe, and
        suitable for daily household use such as bathing, washing, and even
        cooking.
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
          textStyle={{ color: Colors.TEXT }}
          bulletStyle={{ color: Colors.TEXT }}
          data={[
            "Keep the water source clean and free from debris.",
            "Schedule regular water checks to detect early changes.",
            "Store water in closed, clean containers to avoid contamination.",
            "Avoid direct exposure of stored water to sunlight for extended periods.",
          ]}
        />
      </View>
    </View>
  </Card>
);

export default function PulsePage() {
  const { isConnected } = useDeviceStore();
  const targetRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [markerPercent, setMarkerPercent] = useState(0.7);
  const [dataHistory, setDataHistory] = useState<number[]>([
    80, 60, 30, 35, 75, 85, 70, 60, 25, 30, 80, 85,
  ]);

  useEffect(() => {
    if (!isConnected) return;

    const node = findNodeHandle(targetRef.current);
    if (node) {
      UIManager.measure(node, (_x, _y, width) => {
        setElementWidth(width);
      });
    }

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
  }, [isConnected]);

  const markerLeft = elementWidth * markerPercent;
  const bubbleWidth = 120;
  const offset =
    markerLeft < bubbleWidth / 2
      ? markerLeft
      : markerLeft > elementWidth - bubbleWidth / 2
      ? bubbleWidth - (elementWidth - markerLeft)
      : bubbleWidth / 2;
  const bubbleLeft = markerLeft - offset;

  if (!isConnected) return <NotConnected />;

  return (
    <>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          style={{
            paddingHorizontal: 8,
            backgroundColor: "white",
            paddingTop: 8,
            flex: 1,
          }}
        >
          <HistoryChart data={dataHistory} />
          <WaterQualityIndicator
            markerLeft={markerLeft}
            bubbleLeft={bubbleLeft}
            percent={markerPercent}
            targetRef={targetRef}
          />
          <QuotesCard />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
