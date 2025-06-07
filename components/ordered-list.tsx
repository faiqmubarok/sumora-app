import Colors from "@/constants/color";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface OrderedListProps {
  data: string[];
  textStyle?: TextStyle;
  bulletStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const OrderedList: React.FC<OrderedListProps> = ({
  data,
  textStyle,
  bulletStyle,
  containerStyle,
}) => {
  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <View style={[styles.listItem, containerStyle]}>
          <Text style={[styles.bullet, bulletStyle]}>•</Text>
          <Text style={[styles.text, textStyle]}>{item}</Text>
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    fontWeight: "bold",
    marginRight: 8,
    marginTop: 2,
    color: Colors.TEXT,
  },
  text: {
    fontSize: 14,
    fontFamily: "DMSans-Regular",
    color: Colors.TEXT,
    lineHeight: 24,
    flex: 1,
  },
});

export default OrderedList;
