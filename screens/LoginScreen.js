import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import IpAddress from "../DeviceConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { setToken, userID, setUserID, token } = useContext(AuthContext);
  const handleLogin = async () => {
    const user = {
      email: email,
      password: password,
    };
    await axios.post(`http://${IpAddress}:8000/login`, user).then((res) => {
      const token = res.data;
      AsyncStorage.setItem("token", token);
      setToken(token);
    });
  };
  useEffect(() => {
    if (token) {
      navigation.replace("MainStack", { screen: "Main" });
    }
  }, [token]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 10, alignItems: "center" }}>
        <KeyboardAvoidingView>
          <View
            style={{
              marginTop: 70,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              Log in to your account
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "600", color: "gray" }}>
                Email
              </Text>
              <View>
                <TextInput
                  placeholderTextColor="#bebebe"
                  placeholder="Enter your email"
                  style={{
                    width: 340,
                    marginTop: 15,
                    borderBottomColor: "#bebebe",
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    fontSize: 15,
                  }}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "600",
                  color: "gray",
                  marginTop: 25,
                }}
              >
                Password
              </Text>
              <View>
                <TextInput
                  secureTextEntry={true}
                  placeholderTextColor="#bebebe"
                  placeholder="Enter your password"
                  style={{
                    width: 340,
                    marginTop: 15,
                    borderBottomColor: "#bebebe",
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                    fontSize: 15,
                  }}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>
            <Pressable
              onPress={handleLogin}
              style={{
                width: 200,
                backgroundColor: "#9d23bc",
                padding: 15,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  textAlign: "center",
                  color: "gray",
                  fontSize: 16,
                  margin: 12,
                }}
              >
                Don't have an account? Sign up
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 110, height: 60, resizeMode: "contain" }}
              source={{
                uri: "https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50",
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
