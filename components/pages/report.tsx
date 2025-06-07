import pdfIcon from "@/assets/icons/FilePdf.png";
import Colors from "@/constants/color";
import { useDeviceStore } from "@/store/device-store";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../button";
import Card from "../card";
import OrderedList from "../ordered-list";
import NotConnected from "./not-connected";

const data = {
  labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  datasets: [
    {
      data: [80, 75, 75, 70, 85, 65, 68],
      color: (opacity = 1) => `rgba(10, 64, 226, ${opacity})`, // ← dari hex #0A40E2
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(10, 64, 226, ${opacity})`,
  labelColor: () => Colors.PRIMARY,
  propsForBackgroundLines: {
    stroke: "#E2E2E2",
  },
  propsForLabels: {
    fontSize: 12,
  },
  fillShadowGradientFrom: "#0066FF",
  fillShadowGradientFromOpacity: 0.3,
  fillShadowGradientTo: "#0066FF",
  fillShadowGradientToOpacity: 0,
};

const screenWidth = Dimensions.get("window").width;

const WeeklyReportCard = ({
  isDownloading,
  handleExportFile,
}: {
  isDownloading: boolean;
  handleExportFile: () => void;
}) => (
  <Card
    icon={<Feather name="calendar" size={24} color="black" />}
    title="Weekly Water Quality Report"
  >
    <View style={{ flexDirection: "column", gap: 24 }}>
      <View style={{ flexDirection: "column", gap: 16 }}>
        <Text style={styles.text}>Date Range: May 8 – May 14, 2025</Text>
        <Text style={styles.text}>Source Location: Malang, Indonesia</Text>
      </View>
      <View
        style={{
          paddingTop: 24,
          borderTopWidth: 1,
          borderTopColor: "#F1F1F1",
        }}
      >
        <Button
          variant="outline"
          isLoading={isDownloading}
          disabled={isDownloading}
          style={{ borderColor: Colors.BORDER }}
          iconSource={pdfIcon}
          withIcon
          onPress={handleExportFile}
        >
          {isDownloading ? "Downloading..." : "Export Report as PDF"}
        </Button>
      </View>
    </View>
  </Card>
);

const ConditionSummaryCard = () => (
  <Card
    icon={<FontAwesome name="sticky-note-o" size={24} color="black" />}
    title="Condition Summary"
  >
    <View style={{ flexDirection: "column", gap: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}
        >
          <Text style={styles.label}>Average Quality</Text>
          <View style={styles.row}>
            <Text style={styles.value}>8.2</Text>
            <Text style={[styles.value, { color: "#D6D6D6" }]}>/10</Text>
          </View>
        </View>
        <View style={[styles.row, { gap: 20 }]}>
          <View style={{ gap: 8 }}>
            <Text style={styles.label}>Last 24h Change</Text>
            <View style={styles.row}>
              <Text style={styles.value}>1h 32m</Text>
              <Ionicons name="trending-up" size={24} color={Colors.SUCCESS} />
            </View>
          </View>
          <View style={{ gap: 8 }}>
            <Text style={styles.label}>Critical Alert</Text>
            <Text style={styles.value}>3</Text>
          </View>
        </View>
      </View>

      <View style={{ width: "100%", overflow: "hidden" }}>
        <LineChart
          data={data}
          width={screenWidth + 56}
          height={180}
          chartConfig={chartConfig}
          withShadow
          withDots
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLabels
          withHorizontalLabels={false}
          bezier
          style={{ borderRadius: 8, marginLeft: -57 }}
        />
      </View>
    </View>
  </Card>
);

const PredictionCard = () => (
  <Card
    icon={<Feather name="compass" size={24} color="black" />}
    title="Prediction"
  >
    <View style={{ flexDirection: "column", gap: 16 }}>
      <Text style={styles.text}>
        For the next three days, water quality will vary. On Thursday,
        conditions remain fresh and safe for daily use. Friday may bring
        moderate turbidity due to light rain—use filtration for safety. By
        Saturday, heavy rainfall is expected to lower water quality, making it
        unsafe for direct use. Be sure to filter or boil water before consuming.
      </Text>
      <View style={{ flexDirection: "column", gap: 4 }}>
        <Text style={styles.subheading}>Tips Based on Forecast</Text>
        <View style={{ gap: 2 }}>
          <Text style={styles.listLabel}>Before rain:</Text>
          <OrderedList
            textStyle={styles.text}
            bulletStyle={styles.text}
            data={[
              "Clean storage tanks and filter systems.",
              "Store extra water from today if the quality is optimal.",
            ]}
          />
        </View>
        <View style={{ gap: 2 }}>
          <Text style={styles.listLabel}>When risk is detected:</Text>
          <OrderedList
            textStyle={styles.text}
            bulletStyle={styles.text}
            data={[
              "Use only filtered or boiled water for drinking.",
              "Avoid washing food with untreated water.",
              "Check physical indicators like color, smell, or sediments.",
            ]}
          />
        </View>
      </View>
    </View>
  </Card>
);

const FinalPredictionCard = () => (
  <Card
    icon={
      <Octicons
        name="tools"
        size={24}
        color="black"
        style={{ textAlign: "center", width: 24, height: 24 }}
      />
    }
    title="Final Prediction"
  >
    <OrderedList
      textStyle={styles.text}
      bulletStyle={styles.text}
      data={[
        "Regular cleaning of water tanks or filters.",
        "Secure water containers in shaded, sealed areas.",
        "Install a basic home filtration system for added safety.",
        "Use early alerts from the app to act quickly on changes.",
      ]}
    />
  </Card>
);

const ReportPage = () => {
  const { isConnected } = useDeviceStore();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleExportFile = async () => {
    setIsDownloading(true);
    const asset = Asset.fromModule(require("@/assets/files/report.pdf"));
    await asset.downloadAsync();

    const localUri = asset.localUri || asset.uri;
    const fileUri = FileSystem.documentDirectory + "report.pdf";

    try {
      // Copy file ke direktori dokumen app
      await FileSystem.copyAsync({
        from: localUri,
        to: fileUri,
      });

      // Share atau buka file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        alert("Sharing not available");
      }
    } catch (err) {
      console.error("Failed to share PDF", err);
      alert("Failed to share the PDF file.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isConnected) return <NotConnected />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <StatusBar style="dark" translucent />
      <ScrollView
        style={{
          paddingHorizontal: 8,
          paddingTop: 8,
          backgroundColor: Colors.WHITE,
        }}
      >
        <WeeklyReportCard
          isDownloading={isDownloading}
          handleExportFile={handleExportFile}
        />
        <ConditionSummaryCard />
        <PredictionCard />
        <FinalPredictionCard />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "DMSans-Regular",
    color: Colors.TEXT,
    fontSize: 14,
    lineHeight: 24,
  },
  label: {
    fontSize: 12,
    fontFamily: "DMSans-Regular",
    color: Colors.TEXT,
  },
  value: {
    fontFamily: "DMSans-Regular",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  subheading: {
    fontFamily: "DMSans-SemiBold",
    fontSize: 14,
    color: Colors.BLACK,
    lineHeight: 24,
  },
  listLabel: {
    fontFamily: "DMSans-Regular",
    color: Colors.BLACK,
    fontSize: 14,
    lineHeight: 24,
  },
});

export default ReportPage;
