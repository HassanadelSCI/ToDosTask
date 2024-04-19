import { View, Text, Pressable, StyleSheet, CheckBox } from "react-native";
import React from "react";

export default function Item({ title, completed, id, onToggle, onDelete }) {
  return (
    <View style={styles.Item}>
      <Pressable onPress={() => onToggle(id, !completed)}>
        <CheckBox style={styles.checkBox} value={completed} />
      </Pressable>
      <Text>{title}</Text>
      <Pressable onPress={() => onDelete(id)}>
        <Text style={styles.deleteButton}>X</Text>
      </Pressable>
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
  checkBox: {
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    flex: 1,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
  },
});
