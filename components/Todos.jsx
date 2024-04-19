import React, { useState, useEffect } from "react";
import { updateTodos } from "../firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/Config";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  FlatList,
} from "react-native";
import MyButton from "./MyButton";
import Item from "./Item";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  async function getTodos() {
    console.log("auth.currentUser");
    if (auth.currentUser) {
      const docRef = doc(db, "users", auth.currentUser.uid);
      console.log("docRef", docRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTodos(docSnap.data().Todos);
      } else {
        console.log("No such document!");
      }
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  const toggleTodo = async (id, completed) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
    await updateTodos(updatedTodos);
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
  const deleteTodo = async (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    await updateTodos(updatedTodos);
  };

  return (
    <View>
      <View style={styles.addtodocont}>
        <TextInput
          placeholder="Enter Todo Name"
          onChangeText={(text) => setTodoName(text)}
          value={todoName}
          style={styles.input}
        />
        <MyButton onPress={addTodo} style={styles.add}>
          add
        </MyButton>
      </View>
      <FlatList
        style={styles.list}
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Item
            style={styles.container}
            title={item.title}
            completed={item.completed}
            id={item.id}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  list: {
    flex: 0.9,
    margin: 5,
    padding: 15,
    backgroundColor: "lightgreen",
    width: "100%",
    maxHeight: 400,
    width: "100%",
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

export default Todos;
