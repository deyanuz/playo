import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { getRegProgress, saveRegProgress } from "../registrationUtils";

const NameScreen = () => {
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    getRegProgress("Name").then((data) => {
      if (data) {
        setFname(data.firstName || "");
        setLname(data.lastName || "");
      }
    });
  }, []);
  const saveName = () => {
    if (firstName.trim() !== "") {
      saveRegProgress("Name", { firstName, lastName });
    }
    navigation.navigate("Image");
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
        <View style={{ marginHorizontal: 10 }}>
          <Ionicons name="arrow-back" size={25} color="black" />
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Complete your profile
          </Text>
          <Text style={{ marginTop: 10, color: "gray" }}>
            What would you like your mates to call you ❤️
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 10,
            marginVertical: 25,
            gap: 20,
            flexDirection: "column",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, color: "gray" }}>First Name *</Text>
            <TextInput
              value={firstName}
              onChangeText={setFname}
              style={{
                padding: 10,
                borderColor: "#d0d0d0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            marginHorizontal: 10,
            marginVertical: 25,
            gap: 20,
            flexDirection: "column",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, color: "gray" }}>Last Name</Text>
            <TextInput
              value={lastName}
              onChangeText={setLname}
              style={{
                padding: 10,
                borderColor: "#d0d0d0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      <View style={{ backgroundColor: "white" }}>
        <Pressable
          onPress={saveName}
          style={{
            color: "white",
            padding: 15,
            backgroundColor: firstName?.length > 0 ? "#a71ec9" : "#e0e0e0",
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
              color: firstName?.length > 0 ? "white" : "gray",
              fontSize: 15,
              fontWeight: "500",
            }}
          >
            Next
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default NameScreen;

const styles = StyleSheet.create({});
