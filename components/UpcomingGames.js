import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const UpcomingGames = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Game", { item: item })}
      style={{
        backgroundColor: "white",
        padding: 12,
        borderBlockColor: "#e0e0e0",
        borderBottomWidth: 2,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          marginVertical: 7,
          color: "#9d23bc",
        }}
      >
        {item?.date}
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          backgroundColor: "white",
          marginTop: 12,
        }}
      >
        <View>
          <Image
            source={{ uri: item?.adminUrl }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              flexWrap: "wrap", // allow text to wrap if it overflows
              marginBottom: 6,
            }}
          >
            {item?.admin}'s {item?.sport} Game
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: "gray",
              marginBottom: 10,
              flexShrink: 1, // allow text to shrink if overflows
            }}
          >
            {item?.area}
          </Text>
          <View
            style={{
              marginVertical: 10,
              padding: item?.isBooked ? 0 : 15,
              borderRadius: 8,
              borderColor: "#e0e0e0",
              borderWidth: 1,
              width: "100%",
            }}
          >
            {item?.isBooked ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#c518f0",
                  paddingVertical: 10,
                  borderRadius: 7,
                }}
              >
                <Text
                  style={{ fontSize: 13, fontWeight: "500", color: "white" }}
                >
                  Booked
                </Text>
              </View>
            ) : (
              <>
                <Text style={{ textAlign: "center", fontWeight: "500" }}>
                  {item?.time}
                </Text>
              </>
            )}
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {item?.players.length}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 10 }}>
            Going
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default UpcomingGames;

const styles = StyleSheet.create({});
