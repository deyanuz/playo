import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const PreFinalScreen = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
