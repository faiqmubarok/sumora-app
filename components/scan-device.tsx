import Colors from "@/constants/color";
import { useConnectDevice } from "@/features/device/api/use-connect-device";
import { saveDeviceId } from "@/lib/secure-device";
import { useDeviceStore } from "@/store/device-store";
import AntDesign from "@expo/vector-icons/AntDesign";
import { isAxiosError } from "axios";
import { CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Button from "./button";
import { useToast } from "./toast";

const { height } = Dimensions.get("screen");

const ScanDevice = () => {
  const { show } = useToast();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const { setConnected, setDeviceId } = useDeviceStore();

  const scanAnim = useRef(new Animated.Value(0)).current;
  const hasScannedRef = useRef(false); // untuk cegah multiple scan

  useEffect(() => {
    const loopAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    loopAnim.start();
    return () => loopAnim.stop();
  }, [scanAnim]);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  const { mutate } = useConnectDevice({
    onSuccess: async ({ data }) => {
      const deviceId = data.id;

      await saveDeviceId(deviceId);

      setConnected(true);
      setDeviceId(deviceId);
      show({
        title: "Success!",
        description: "Device connected",
        variant: "success",
      });
      router.back();
    },
    onError: (error: unknown) => {
      const description = isAxiosError(error)
        ? error.response?.data?.error || "Something went wrong"
        : "An unknown error occurred";

      show({
        title: "Error",
        description,
        variant: "error",
      });

      router.back();
    },
  });

  const handleScan = ({ data }: { data: string }) => {
    if (hasScannedRef.current) return;
    hasScannedRef.current = true;

    mutate(data);

    setTimeout(() => {
      hasScannedRef.current = false;
    }, 5000);
  };

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Aplikasi membutuhkan izin untuk mengakses kamera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionBtn}
        >
          <Text style={styles.permissionText}>Izinkan Kamera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ gap: 4 }}>
          <Text style={{ fontFamily: "DMSans-Medium", fontSize: 18 }}>
            Scanner
          </Text>
          <Text style={styles.subtext}>Scan your Sumora device</Text>
        </View>
        <Button
          variant="secondary"
          onPress={() => router.back()}
          size="small"
          style={{ backgroundColor: Colors.BLACK, borderRadius: 999 }}
        >
          <AntDesign name="close" size={24} color="white" />
        </Button>
      </View>

      {/* Camera View */}
      <View style={{ width: "100%", height: (3 / 4) * height }}>
        <CameraView
          style={styles.camera}
          facing={"back"}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={handleScan}
        />
        <View style={styles.scanBox}>
          <Svg width={300} height={300}>
            {/* Sudut-sudut box */}
            <Path
              d={`M0,68 V28 Q0,0 28,0 H68`}
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <Path
              d={`M232,0 H272 Q300,0 300,28 V68`}
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <Path
              d={`M300,232 V272 Q300,300 272,300 H232`}
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <Path
              d={`M68,300 H28 Q0,300 0,272 V232`}
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </Svg>
          <Animated.View
            style={[styles.scanLine, { transform: [{ translateY }] }]}
          >
            <LinearGradient
              colors={["transparent", "lime", "transparent"]}
              style={{ width: "100%", height: "100%" }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: "center",
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 48,
  },
  subtext: {
    fontFamily: "DMSans-Medium",
    fontSize: 14,
    color: "#A5A5A5",
  },
  closeBtn: {
    backgroundColor: "black",
    borderRadius: 999,
    padding: 10,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
  },
  permissionBtn: {
    alignSelf: "center",
    padding: 12,
    backgroundColor: "#E51A1A",
    borderRadius: 8,
  },
  permissionText: {
    color: "white",
    fontWeight: "bold",
  },
  camera: {
    flex: 1,
    borderRadius: 32,
  },
  scanBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 300,
    height: 300,
    transform: [{ translateX: -150 }, { translateY: -150 }],
    overflow: "hidden",
  },
  scanLine: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 4,
  },
});

export default ScanDevice;
