import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getRegProgress, saveRegProgress } from "../registrationUtils";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    getRegProgress("Register").then((data) => {
      if (data) {
        setEmail(data.email || "");
      }
    });
  }, []);
  const next = () => {
    if (email.trim() !== "") {
      saveRegProgress("Register", { email });
    }
    navigation.navigate("Password");
  };
  return (
    <SafeAreaView style={{}}>
      <View style={{ padding: 30 }}>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          You're almost there
        </Text>
        <View style={{ flexDirection: "column", gap: 16, marginVertical: 40 }}>
          <Text>Enter email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{
              padding: 15,
              borderColor: "#d0d0d0",
              borderWidth: 1,
              borderRadius: 10,
            }}
          />
          <Pressable
            onPress={next}
            style={{
              padding: 15,
              backgroundColor: email?.length > 4 ? "#a71ec9" : "#e0e0e0",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: email?.length > 4 ? "white" : "gray",
              }}
            >
              Next
            </Text>
          </Pressable>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 15, color: "gray", textAlign: "center" }}>
            By signing up, you agree to the terms of services and privecy policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
