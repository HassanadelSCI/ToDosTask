import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { reset } from "../firebase/auth";
import MyButton from "../components/MyButton";

const Forget_Password = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(" ");

  const handlePress = async () => {
    try {
      //should check if email exists in the database
      if (email === "") {
        setError("Please enter an email");
        return;
      }
      setError(" ");
      await reset(email);
      console.log("Password reset");
      Alert.alert("Email for resetting password sent");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        console.log("error", JSON.stringify(error));
        setError(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <MyButton onPress={handlePress} style={styles.register}>
          Rest
        </MyButton>
        <Text>{error}</Text>
        <Pressable onPress={() => router.navigate("/account/login")}>
          <Text style={styles.login}>Want to login?</Text>
        </Pressable>
        <Pressable onPress={() => router.navigate("/account/login")}>
          <Text style={styles.login}>Create New Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
    margin: 10,
  },
  box: {
    justifyContent: "center",
    alignItems: "center",
    width: 400,
    height: 300,
    margin: 100,
    borderBlockColor: "black",
    borderWidth: 1,
  },
  input: {
    minWidth: 300,
    maxWidth: 1000,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  rest: {
    minWidth: 80,
    maxWidth: 300,
    justifyContent: "center",
  },
  login: {
    color: "blue",
    marginTop: 10,
  },
});

export default Forget_Password;
