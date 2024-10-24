import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const VenueCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={{ margin: 15 }}>
      <Pressable
        onPress={() => navigation.navigate("Venue", { item })}
        style={{
          backgroundColor: "white",
          borderRadius: 7,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <View>
          <Image
            style={{
              width: "100%",
              height: 200,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={{ uri: item?.image }}
          />
        </View>
        <View style={{ paddingVertical: 12, paddingHorizontal: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>
              {item?.name.length > 35
                ? item?.name.substring(0, 35) + "..."
                : item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#9d23bc",
                gap: 6,
                padding: 6,
                borderRadius: 5,
              }}
            >
              <AntDesign name="star" size={20} color="white" />
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {item?.rating}
              </Text>
            </View>
          </View>
          <Text style={{ color: "gray" }}>
            {item?.address.length > 40
              ? item?.address.substring(0, 40) + "..."
              : item.address}
          </Text>
          <View
            style={{
              height: 1,
              borderWidth: 0.6,
              borderColor: "#e0e0e0",
              marginVertical: 10,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Upto 10% off</Text>
            <Text>BDT 250 onwards</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default VenueCard;

const styles = StyleSheet.create({});
