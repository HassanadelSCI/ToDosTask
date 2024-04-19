import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import Item from "./Item";
export default function Todos() {
  const [data, setdata] = useState([
    { text: "1234" },
    { text: "lemon" },
    { text: "mango" },
    { text: "456" },
    { text: "Mohamed" },
    { text: "apple" },
    { text: "banana" },
    { text: "orange" },
    { text: "grape" },
    { text: "watermelon" },
  ]);
  return (
    <View style={styles.cont}>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item, index }) => <Item text={item.text} key={index} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  cont: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBlockColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  list: {
    flex: 0.9,
    margin: 5,
    padding: 15,
    backgroundColor: "lightgreen",
    width: "100%",
    maxHeight: 400,
  },
});
