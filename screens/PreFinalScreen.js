import { StyleSheet, Text, View, Pressable, Platform } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../AuthContext";
import { getRegProgress } from "../registrationUtils";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const PreFinalScreen = () => {
  const { token, setToken } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      navigation.replace("MainStack", { screen: "Main" });
    }
  }, [token]);

  useEffect(() => {
    getAllScreenData();
  }, []);

  const getAllScreenData = async () => {
    try {
      const screens = ["Register", "Password", "Name", "Image"];
      let uData = {};
      for (const sName of screens) {
        const screenData = await getRegProgress(sName);
        if (screenData) {
          uData = { ...uData, ...screenData };
        }
      }
      setUserData(uData);
    } catch (error) {
      console.error(error);
    }
  };

  const clearAllScreenData = async () => {
    try {
      const screens = ["Register", "Password", "Name", "Image"];
      for (const sName of screens) {
        const key = `registration_progress_${sName}`;
        if (key) {
          await AsyncStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser = async () => {
    try {
      const res = await axios
        .post("http://192.168.0.102:8000/register", userData)
        .then(async (res) => {
          const token = res.data;
          await AsyncStorage.setItem("token", token);
          setToken(token);
        });
      clearAllScreenData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: Platform.OS == "android" ? 20 : 0,
        }}
      >
        <View style={{ marginTop: 80 }}>
          <Text style={{ fontSize: 32, fontWeight: "bold", marginLeft: 20 }}>
            All set to register
          </Text>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              marginLeft: 20,
              marginTop: 10,
            }}
          >
            Setting up your profile for you
          </Text>
        </View>
      </SafeAreaView>
      <Pressable
        onPress={registerUser}
        style={{
          color: "white",
          padding: 15,
          backgroundColor: "#a71ec9",
          marginTop: "auto",
          marginBottom: 30,
          padding: 12,
          marginHorizontal: 10,
          borderRadius: 6,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Finish
        </Text>
      </Pressable>
    </>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({});
