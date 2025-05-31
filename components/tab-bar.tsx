import Colors from "@/constants/color";
import { MENUS } from "@/data/navigation.menu";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  findNodeHandle,
  Pressable,
  Text,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const containerWidth = width * 0.7;

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const indicatorTranslate = useRef(new Animated.Value(0)).current;
  const [activeTabWidth, setActiveTabWidth] = useState(0);
  const [initialRenderDone, setInitialRenderDone] = useState(false);

  const tabRefs = useRef<Record<string, View | null>>({});

  const measureTab = useCallback(
    (index: number) => {
      const key = MENUS[index].key;
      const ref = tabRefs.current[key];

      if (ref) {
        const node = findNodeHandle(ref);
        if (node) {
          UIManager.measure(node, (x, y, w, h, pageX) => {
            setActiveTabWidth(w);

            Animated.spring(indicatorTranslate, {
              toValue: pageX - (width - containerWidth) / 2,
              useNativeDriver: true,
            }).start(() => {
              setInitialRenderDone(true);
            });
          });
        }
      }
    },
    [indicatorTranslate]
  );

  useEffect(() => {
    setTimeout(() => {
      measureTab(state.index);
    }, 0);
  }, [state.index, measureTab]);

  return (
    <View
      style={{
        position: "absolute",
        bottom: insets.bottom + 16,
        left: 0,
        right: 0,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: containerWidth,
          flexDirection: "row",
          backgroundColor: "#1F1F1F",
          borderRadius: 999,
          padding: 4,
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        {initialRenderDone && (
          <Animated.View
            style={{
              position: "absolute",
              height: "100%",
              borderRadius: 999,
              backgroundColor: "#fff",
              width: activeTabWidth,
              transform: [{ translateX: indicatorTranslate }],
            }}
          />
        )}

        {MENUS.map((menu, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: state.routes[index].key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(state.routes[index].name);
            }
          };

          return (
            <Pressable
              key={menu.key}
              ref={(ref) => {
                tabRefs.current[menu.key] = ref;
              }}
              onPress={onPress}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 16,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 999,
                zIndex: 1,
                flex: isFocused ? 1 : undefined,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  opacity: isFocused ? 1 : 0.8,
                }}
              >
                {React.cloneElement(menu.icon, {
                  color: isFocused ? Colors.BLACK : "#fff",
                })}
                {isFocused && (
                  <Text
                    style={{
                      color: Colors.BLACK,
                      fontFamily: "DMSans-Medium",
                      textTransform: "capitalize",
                      fontSize: 14,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {menu.label}
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
