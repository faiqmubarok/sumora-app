import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type AvatarProps = {
  uri?: string | ImageSourcePropType;
  size?: number;
  fallbackText?: string;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  borderRadius?: number;
};

const Avatar: React.FC<AvatarProps> = ({
  uri,
  size = 48,
  fallbackText = "?",
  style,
  containerStyle,
  textStyle,
  borderRadius = 9999,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const avatarSize = {
    width: size,
    height: size,
    borderRadius,
  };

  const isRemote = typeof uri === "string";

  return (
    <View style={[styles.container, avatarSize, containerStyle]}>
      {uri && !error ? (
        <>
          <Image
            source={isRemote ? { uri } : uri}
            style={[styles.image, avatarSize, style]}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              setError(true);
            }}
            resizeMode="cover"
          />
          {loading && (
            <View style={[styles.loaderContainer, avatarSize]}>
              <ActivityIndicator size="small" color="#999" />
            </View>
          )}
        </>
      ) : (
        <View style={[styles.fallback, avatarSize]}>
          <Text style={[styles.fallbackText, textStyle]}>{fallbackText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    elevation: 4,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  fallback: {
    backgroundColor: "#9ca3af",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "DMSans-Bold",
    fontSize: 18,
  },
});

export default Avatar;
