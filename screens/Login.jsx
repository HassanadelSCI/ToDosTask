import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { login, getcred, register } from "../firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyButton from "../components/MyButton";

const Login = () => {
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
  const handleLogin = async () => {
    if (!email || !password) return setError("Email and password are required");
    if (!email.includes("@")) return setError("Invalid email");
    if (!email.includes(".")) return setError("Invalid email");
    if (email.includes(" ")) return setError("Invalid email");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");
    setError(" ");
    try {
      if (!email || !password) {
        setError("Email and password are required");
        return;
      }
      const credentials = await login(email, password);
      const authCredential = await getcred(email, password); // Await getcred
      // Serialize authCredential to JSON before storing in AsyncStorage
      if (credentials) {
        await AsyncStorage.setItem(
          "credentials",
          JSON.stringify(authCredential)
        );
        setUser(JSON.stringify(authCredential));
        router.navigate(`/home`);
      }
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("wrong Email format");
      } else if (error.code === "auth/invalid-credential") {
        setError("wrong Email or password");
      } else {
        //console.log("error", JSON.stringify(error));
        setError(error.message); // Set error message
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
        <MyButton onPress={handleLogin} style={styles.login}>
          {" "}
          Login{" "}
        </MyButton>
        <Text>{error}</Text>

        <Pressable onPress={() => router.replace("/account/register")}>
          <Text style={styles.register}>
            dont't have an account. create one{" "}
          </Text>
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
  login: {
    minWidth: 80,
    maxWidth: 300,
    justifyContent: "center",
  },
  register: {
    color: "blue",
    marginTop: 10,
  },
});

export default Login;
