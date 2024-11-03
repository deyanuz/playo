import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import IpAddress from "../DeviceConfig";

const ManageScreen = () => {
  const [option, setOption] = useState("requests");
  const route = useRoute();
  const userID = route?.params?.userID;
  const gameID = route?.params?.gameID;
  const [requests, setRequests] = useState([]);
  const [players, setPlayers] = useState([]);
  const accept = async (userID) => {
    try {
      const user = {
        gameID: gameID,
        userID: userID,
      };
      const response = await axios.post(
        `http://${IpAddress}:8000/accept`,
        user
      );
      if (response.status == 200) {
        Alert.alert("Success", "Request accepted");
        await fetchRequests();
        await fetchPlayers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  useEffect(() => {
    fetchPlayers();
  }, []);
  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `http://${IpAddress}:8000/games/${gameID}/requests`
      );
      setRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        `http://${IpAddress}:8000/games/${gameID}/players`
      );
      setPlayers(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView>
      <View style={{ padding: 12, backgroundColor: "#9d23bc" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <Ionicons name="arrow-back" size={25} color="white" />
          <AntDesign name="plussquareo" size={25} color="white" />
        </View>
        <View
          style={{
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
            Manage
          </Text>
          <Text style={{ color: "white", fontSize: 17 }}>Match full</Text>
        </View>
        <View
          style={{
            height: 1,
            borderWidth: 1,
            borderColor: "#fcf005",
            marginVertical: 10,
          }}
        />
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 15,
          }}
        >
          <Pressable onPress={() => setOption("requests")}>
            <Text
              style={{
                color: option == "requests" ? "#fcf005" : "white",
                fontWeight: "500",
              }}
            >
              Requests ({requests.length})
            </Text>
          </Pressable>

          <Pressable onPress={() => setOption("playing")}>
            <Text
              style={{
                color: option == "playing" ? "#fcf005" : "white",
                fontWeight: "500",
              }}
            >
              Playing ({players.length})
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: 10, marginHorizontal: 15 }}>
        <View>
          {option == "requests" && (
            <View>
              {requests?.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    padding: 10,
                    backgroundColor: "white",
                    marginVertical: 10,
                    borderRadius: 6,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 13,
                    }}
                  >
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                      source={{ uri: item?.image }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text>
                        {item?.firstName} {item?.lastName}
                      </Text>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          marginTop: 10,
                          borderRadius: 20,
                          borderColor: "#fcf005",
                          borderWidth: 1,
                          alignSelf: "flex-start",
                        }}
                      >
                        <Text>INTERMIDEATE</Text>
                      </View>
                    </View>
                    <View>
                      <Image
                        style={{
                          width: 110,
                          height: 60,
                          resizeMode: "contain",
                        }}
                        source={{
                          uri: "https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50",
                        }}
                      />
                    </View>
                  </View>
                  <Text style={{ marginTop: 7 }}>{item?.comment}</Text>
                  <View
                    style={{
                      height: 1,
                      borderColor: "#e0e0e0",
                      borderWidth: 1,
                      marginVertical: 15,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          borderRadius: 5,
                          alignSelf: "flex-start",
                          backgroundColor: "#e0e0e0",
                        }}
                      >
                        <Text>0 NO SHOWS</Text>
                      </View>
                      <Text
                        style={{
                          marginTop: 10,
                          fontWeight: "bold",
                          textDecorationLine: "underline",
                        }}
                      >
                        See reputation
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <Pressable
                        style={{
                          padding: 10,
                          borderRadius: 6,
                          borderColor: "#e0e0e0",
                          borderWidth: 1,
                          width: 100,
                        }}
                      >
                        <Text style={{ textAlign: "center" }}>Reject</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => accept(item?.userID)}
                        style={{
                          padding: 10,
                          borderRadius: 6,
                          backgroundColor: "#c518f0",
                          width: 100,
                        }}
                      >
                        <Text style={{ textAlign: "center", color: "white" }}>
                          Accept
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <View>
          {option == "playing" && (
            <View>
              {players.map((item, index) => (
                <Pressable
                  key={index}
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <View>
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: "contain",
                        borderRadius: 30,
                      }}
                      source={{ uri: item?.image }}
                    />
                  </View>
                  <View>
                    <Text>
                      {item?.firstName} {item?.lastName}
                    </Text>
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        marginTop: 10,
                        borderRadius: 20,
                        borderColor: "#fcf005",
                        borderWidth: 1,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Text>INTERMIDEATE</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ManageScreen;

const styles = StyleSheet.create({});
