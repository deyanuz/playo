import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Amenities from "../components/Amenities";

const VenueInfoScreen = () => {
  const route = useRoute();
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <>
            <View style={{ marginTop: 1 }}>
              <Image
                style={{ width: "100%", height: 200, resizeMode: "cover" }}
                source={{
                  uri: "https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800",
                }}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Text>{route.params?.item.name}</Text>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Ionicons name="time-outline" size={24} color="gray" />
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  6:00 AM - 11:00 PM
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5, marginVertical: 8 }}>
                <Ionicons name="location-outline" size={24} color="gray" />
                <Text style={{ fontSize: 14, width: "80", fontWeight: "500" }}>
                  {route.params?.item.location}
                </Text>
              </View>
            </View>

            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <View>
                <View style={{ flexDirection: "row" }}>
                  {[0, 0, 0, 0, 0].map((e, i) => (
                    <FontAwesome
                      style={{ paddingHorizontal: 3 }}
                      name={
                        i < Math.floor(route.params?.item.rating)
                          ? "star"
                          : "star-o"
                      }
                      size={15}
                      color="#ffd700"
                      key={i}
                    />
                  ))}
                  <Text>{route.params?.item.rating} (9 ratings)</Text>
                </View>

                <Pressable
                  style={{
                    marginTop: 6,
                    width: 160,
                    borderColor: "#686868",
                    borderWidth: 1,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Text>Rate the venue</Text>
                </Pressable>
              </View>
              <View>
                <View>
                  <Text>100 total activities</Text>
                </View>
                <Pressable
                  style={{
                    marginTop: 6,
                    width: 160,
                    borderColor: "#686868",
                    borderWidth: 1,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Text>1 upcoming</Text>
                </Pressable>
              </View>
            </View>
            <Text
              style={{ fontSize: 15, marginHorizontal: 10, fontWeight: "500" }}
            >
              Sports available
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {route.params?.item.sportsAvailable.map((it, i) => (
                <View
                  key={i}
                  style={{
                    borderColor: "#686868",
                    margin: 10,
                    padding: 20,
                    width: 130,
                    height: 90,
                    borderWidth: 1,
                    borderRadius: 7,
                  }}
                >
                  <MaterialCommunityIcons
                    style={{ textAlign: "center" }}
                    name={it.icon}
                    size={24}
                    color="gray"
                    key={i}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 10,
                    }}
                  >
                    {it?.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <Amenities />
            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Activities
              </Text>
              <Pressable
                style={{
                  borderColor: "#787878",
                  marginTop: 10,
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: 5,
                  marginBottom: 7,
                }}
              >
                <AntDesign name="plus" size={27} color="gray" />
                <Text>Create Activity</Text>
              </Pressable>
            </View>
          </>
        </ScrollView>
      </SafeAreaView>
      <Pressable
        style={{
          backgroundColor: "purple",
          padding: 8,
          marginBottom: 30,
          borderRadius: 7,
          marginHorizontal: 15,
        }}
      >
        <Text
          style={{ textAlign: "center", fontWeight: "bold", color: "white" }}
        >
          Book Now
        </Text>
      </Pressable>
    </>
  );
};

export default VenueInfoScreen;

const styles = StyleSheet.create({});
