import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import OrderedList from "../ordered-list";

const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? 44 : RNStatusBar.currentHeight || 24;

const tags = [
  { id: 1, name: "Water Quality" },
  { id: 2, name: "Monitoring Tips" },
  { id: 3, name: "Smart Living" },
];

export default function DetailArticlePage() {
  const navigation = useNavigation();

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const [barStyle, setBarStyle] = useState<"light-content" | "dark-content">(
    "light-content"
  );

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      setBarStyle((prev) => {
        if (value > 10 && prev !== "dark-content") return "dark-content";
        if (value <= 10 && prev !== "light-content") return "light-content";
        return prev;
      });
    });

    return () => scrollY.removeListener(listener);
  }, [scrollY]);

  // Animated.event with useNativeDriver true because we only interpolate opacity, no layout changes
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  return (
    <>
      <StatusBar
        style={barStyle === "light-content" ? "light" : "dark"}
        translucent
      />
      <Animated.View
        pointerEvents="none"
        style={[{ opacity: headerOpacity }]}
      />

      <View style={styles.container}>
        <Animated.View
          style={[styles.headerBackground, { opacity: headerOpacity }]}
        />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <Entypo
              name="chevron-left"
              size={20}
              color={barStyle === "light-content" ? "white" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons
              name="more-vert"
              size={20}
              color={barStyle === "light-content" ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>

        <Animated.ScrollView
          style={styles.scrollView}
          scrollEventThrottle={16}
          onScroll={onScroll}
          contentContainerStyle={styles.scrollContent}
        >
          <Image
            source={require("@/assets/images/article-image.png")}
            style={styles.articleImage}
          />
          <View style={styles.content}>
            <View style={styles.tagsContainer}>
              <View style={styles.tagsRow}>
                {tags.map((tag, index) => (
                  <View
                    key={tag.id}
                    style={[
                      styles.tag,
                      index !== tags.length - 1 && styles.tagMarginRight,
                    ]}
                  >
                    <Text style={styles.tagText}>{tag.name}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.title}>
                Why Daily Water Monitoring Matters More Than You Think
              </Text>

              <View style={styles.logoDateRow}>
                <View style={styles.logoRow}>
                  <Image
                    style={styles.logoImage}
                    source={require("@/assets/images/logo-2.png")}
                  />
                  <Text style={styles.logoText}>Sumora</Text>
                </View>
                <Text style={styles.dateText}>14 July 2025</Text>
              </View>
            </View>

            <Text style={styles.paragraph}>
              We often take clean water for granted—until something goes wrong.
              From sudden changes in temperature to unexpected contamination,
              water quality can shift faster than we realize. That’s why
              consistent, daily monitoring isn’t just recommended—it’s
              essential.
            </Text>

            <View>
              <Text style={styles.subheading}>
                The Hidden Fluctuations in Water Quality
              </Text>
              <Text style={styles.paragraph}>
                Water is dynamic. Its quality can be affected by environmental
                factors like rainfall, nearby industrial activity, or aging
                pipes. These changes can happen within just a few hours.
              </Text>
              <Text style={styles.paragraph}>Let’s break it down:</Text>
              <OrderedList
                data={[
                  "Rainfall can introduce dirt or bacteria into open water tanks or reservoirs.",
                  "Temperature shifts can influence the growth of algae or bacteria.",
                  "Human activities such as washing chemicals down the drain affect underground water.",
                ]}
              />
              <Text style={[styles.paragraph, styles.paragraphMarginBottom]}>
                Without regular checks, these changes go unnoticed until they
                become real problems.
              </Text>
            </View>

            <View style={styles.noteBox}>
              <Text style={styles.paragraph}>
                Imagine discovering a spike in turbidity due to a pipe leak in
                the morning. If detected early, action can be taken before it
                affects household use or crops (if used in farming).
              </Text>
            </View>

            <View>
              <Text style={styles.subheading}>
                Why 4–5 Hour Intervals Make Sense
              </Text>
              <Text style={styles.paragraph}>
                Research and field practice suggest that checking water quality
                every 4 to 5 hours provides the best balance between
                practicality and prevention. It ensures:
              </Text>
              <OrderedList
                data={[
                  "Early detection of changes",
                  "Timely alerts for water treatment",
                  "Smarter usage decisions based on real-time data",
                ]}
              />
              <Text style={styles.paragraph}>
                With Sumora, your water is monitored in smart cycles—alerting
                you when something’s off and showing you trends you wouldn’t
                spot on your own.
              </Text>
            </View>
          </View>
        </Animated.ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT,
    backgroundColor: "white",
    zIndex: 20,
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    height: 110,
    backgroundColor: "white",
    zIndex: 10,
    elevation: 4,
    shadowColor: "#000",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 50,
    width: "100%",
    paddingHorizontal: 16,
    zIndex: 11,
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: "rgba(121, 121, 121, 0.25)",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    backgroundColor: "blue",
  },
  articleImage: {
    width: "100%",
    height: 389,
    resizeMode: "cover",
  },
  content: {
    marginTop: -13,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  tagsContainer: {
    marginBottom: 16,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  tagMarginRight: {
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#4D4D4D",
    fontFamily: "DMSans-Regular",
  },
  title: {
    fontSize: 20,
    fontFamily: "DMSans-Medium",
    lineHeight: 28,
  },
  logoDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  logoText: {
    fontSize: 14,
    fontFamily: "DMSans-Medium",
  },
  dateText: {
    fontSize: 14,
    color: "#A5A5A5",
    fontFamily: "DMSans-Regular",
  },
  paragraph: {
    fontSize: 14,
    color: "#4D4D4D",
    fontFamily: "DMSans-Regular",
    lineHeight: 24,
    marginBottom: 12,
  },
  paragraphMarginBottom: {
    marginBottom: 16,
  },
  subheading: {
    fontSize: 14,
    fontFamily: "DMSans-SemiBold",
    marginBottom: 4,
  },
  noteBox: {
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.04)",
    borderLeftWidth: 2,
    borderLeftColor: "#000",
    marginBottom: 16,
  },
});
