import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { register, login, getcred } from "../firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import MyButton from "../components/MyButton";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(" ");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const seeAsync = async () => {
      try {
        const value = await AsyncStorage.getItem("credentials");
        const a = JSON.parse(value);
        if (a) {
          const credentials = await login(a.email, a.password);
          if (credentials) {
            setUser(value);
            router.navigate(`/home`);
          }
        } else {
          console.log("No credentials found");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    seeAsync();
  }, []);

  const handlePress = async () => {
    if (!email || !password) return setError("Email and password are required");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");
    if (!email.includes("@")) return setError("Invalid email");
    if (!email.includes(".")) return setError("Invalid email");
    if (email.includes(" ")) return setError("Invalid email");
    setError(" ");
    try {
      const credentials = await register(email, password);
      const authCredential = await getcred(email, password); // Await getcred
      if (credentials) {
        await AsyncStorage.setItem(
          "credentials",
          JSON.stringify(authCredential)
        );
        await AsyncStorage.setItem("id", JSON.stringify(credentials.user.uid));
        setUser(JSON.stringify(authCredential));
        router.navigate(`/home`);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
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
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <MyButton onPress={handlePress} style={styles.register}>
          Register
        </MyButton>
        <Text>{error.message}</Text>
        {console.log(error.message)}

        <Pressable onPress={() => router.replace("/account/login")}>
          <Text style={styles.login}>Do you aleady have an account. Login</Text>
        </Pressable>
        <Pressable onPress={() => router.replace("/account/forgetPassword")}>
          <Text style={{ marginTop: 10 }}>Forgot Password</Text>
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
  register: {
    minWidth: 80,

    maxWidth: 300,
    justifyContent: "center",
  },
  login: {
    color: "blue",
    marginTop: 10,
  },
});
export default Register;
