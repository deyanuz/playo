import { Image, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getRegProgress, saveRegProgress } from "../registrationUtils";

const PasswordScreen = () => {
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    getRegProgress("Password").then((data) => {
      if (data) {
        setPassword(data.password || "");
      }
    });
  }, []);
  const handleNext = () => {
    if (password?.trim() !== "") {
      saveRegProgress("Password", { password });
    }
    navigation.navigate("Name");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 90, marginHorizontal: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: "#9d23bc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="lock1" size={24} color="#9d23bc" />
          </View>
          <Image
            style={{ width: 100, height: 40 }}
            source={{
              uri: "http://cdn-icons-png.flaticon.com/128/10613/10613685.png",
            }}
          />
        </View>
        <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 15 }}>
          Please choose a password
        </Text>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoFocus={true}
          secureTextEntry={true}
          placeholder="Enter your password"
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 25,
            borderBottomColor: "black",
            padding: 10,
            borderBottomWidth: 1,
            borderRadius: 10,
            fontSize: 20,
          }}
        />
        <Text style={{ color: "gray", fontSize: 15, marginTop: 10 }}>
          Your details will be safe with us
        </Text>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{ marginTop: 30, marginLeft: "auto" }}
        >
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#9d23bc"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({});
