import { StyleSheet, Text, View } from "react-native";
import React from "react";
import services from "../amenities";

const Amenities = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 17, fontWeight: "500" }}>
        Most popular facalities
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}
      >
        {services?.map((it, i) => (
          <View
            style={{
              margin: 10,
              backgroundColor: "#9d23bc",
              paddingHorizontal: 11,
              paddingVertical: 5,
              borderRadius: 20,
            }}
            key={i}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              {it.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Amenities;

const styles = StyleSheet.create({});
