import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native-web";

export default function Item({ text }) {
  return (
    <View style={styles.Item}>
      <Text>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  Item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderBlockColor: "black",
    borderWidth: 1,
    minWidth: 300,
    maxWidth: 200,
  },
});
