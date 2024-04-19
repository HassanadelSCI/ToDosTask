import { View, StyleSheet, Text, TextInput } from "react-native";
import React from "react";
import MyButton from "./MyButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import Todos from "./Todos";
import { logout } from "../firebase/auth";
import { updateTodos } from "../firebase/auth";
export default function Home() {
  const [todoName, setTodoName] = useState("");
  const [todos, setTodos] = useState([]);
  const signout = () => {
    logout();
    AsyncStorage.removeItem("credentials");
    router.navigate(`/account/login`);
  };

  const addTodo = async () => {
    if (todoName.trim() !== "") {
      let curId;
      if (todos.length === 0) {
        curId = 0;
      } else {
        curId = todos[todos.length - 1].id + 1;
      }
      const newTodoList = [
        ...todos,
        { title: todoName, completed: false, id: curId },
      ];
      setTodos(newTodoList);
      await updateTodos(newTodoList);
      setTodoName("");
    }
  };

  return (
    <View style={styles.container}>
      <MyButton onPress={signout} style={styles.signout}>
        Sign Out
      </MyButton>
      <View style={styles.body}>
        <Text style={styles.welcome}>Welcome Home</Text>
        <Text style={styles.welcome}>Todo List</Text>
        {/* <View style={styles.addtodocont}>
          <TextInput
            placeholder="Enter Todo Name"
            onChangeText={(text) => setTodoName(text)}
            value={todoName}
            style={styles.input}
          />
          <MyButton onPress={addTodo} style={styles.add}>
            add
          </MyButton>
        </View> */}
        <Todos />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",

    backgroundColor: "lightblue",
  },
  signout: {
    margin: 10,
    backgroundColor: "red",
  },
  body: {
    backgroundColor: "lightyellow",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBlockColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  input: {
    minWidth: 300,
    maxWidth: 1000,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  addtodocont: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  add: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    minWidth: 50,
    backgroundColor: "green",
  },
});
