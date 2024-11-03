import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import axios from "axios";
import IpAddress from "../DeviceConfig";
import { AuthContext } from "../AuthContext";

const GameSetupScreen = () => {
  const route = useRoute();
  const [modalVis, setModalVis] = useState(false);
  const [comment, setComment] = useState("");
  const { userID, setUserID, setToken } = useContext(AuthContext);
  const [matchFull, setMatchFull] = useState(false);
  const toggleMatchFull = async (gameID) => {
    try {
      const response = await axios.post(
        `http://${IpAddress}:8000/toggle-matchfull`,
        { gameID }
      );
      if (response.status == 200) {
        Alert.alert("Success", "Match full status updated");
        setMatchFull(!matchFull);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const userRequested = route?.params?.item?.requests.some(
    (req) => req.userID == userID
  );
  const navigation = useNavigation();
  const gameID = route?.params?.item?._id;
  const sendJoinReq = async (gameID) => {
    try {
      const response = await axios.post(
        `http://${IpAddress}:8000/games/${gameID}/request`,
        { userID, comment }
      );
      if (response.status == 200) {
        Alert.alert("Request Sent", "Please wait for the host to accept!", [
          {
            text: "Cancel",
            onPress: () => Alert.alert("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => setModalVis(false) },
        ]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const [venues, setVenues] = useState([]);
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get(`http://${IpAddress}:8000/venues`);
        setVenues(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVenues();
  }, []);
  const venue = venues.find((i) => i?.name == route?.params?.item?.area);
  const [startTime, endTime] = route?.params?.item?.time
    .split("-")
    .map((t) => t.trim());
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    fetchPlayers();
  }, []);
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
    <>
      <SafeAreaView>
        <ScrollView style={{ marginBottom: 80 }}>
          <View
            style={{
              padding: 15,
              backgroundColor: "#9d23bc",
              marginTop: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Ionicons name="arrow-back" size={25} color="white" />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Entypo name="share" size={25} color="white" />
                <Entypo name="dots-three-vertical" size={25} color="white" />
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                {route?.params?.item?.sport}
              </Text>
              <View
                style={{
                  padding: 7,
                  backgroundColor: "white",
                  borderRadius: 7,
                  alignSelf: "flex-start",
                }}
              >
                <Text>Regular</Text>
              </View>
              <View
                style={{
                  marginLeft: "auto",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "500", color: "white" }}
                >
                  Match Full
                </Text>
                <FontAwesome
                  onPress={() => toggleMatchFull(route?.params?.item?._id)}
                  name={
                    matchFull || route?.params?.item?.matchFull == true
                      ? "toggle-on"
                      : "toggle-off"
                  }
                  size={25}
                  color="white"
                />
              </View>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 15, color: "white", fontWeight: "500" }}>
                {route?.params?.item?.time} . {route?.params?.item?.date}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate("Slot", {
                  place: route?.params?.item?.area,
                  sports: venue?.sportsAvailable,
                  date: route?.params?.item?.date,
                  slot: route?.params?.item?.time,
                  startTime: startTime,
                  endTime: endTime,
                  gameID: route?.params?.item?._id,
                  bookings: venue?.bookings,
                });
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                width: "90%",
                backgroundColor: "#fcf005",
                marginTop: 10,
                justifyContent: "center",
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 7,
                flexDirection: "row",
              }}
            >
              <Entypo name="location" size={25} color="#9d23bc" />
              <Text
                style={{ color: "#9d23bc", flexWrap: "wrap", flexShrink: 1 }}
              >
                {route?.params?.item?.area}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 15,
              backgroundColor: "white",
              padding: 10,
              flexDirection: "row",
              gap: 10,
              borderRadius: 7,
            }}
          >
            <MaterialCommunityIcons
              name="directions-fork"
              size={25}
              color="#febe10"
            />
            <View>
              <Text style={{ fontSize: 15 }}>Add Expense</Text>
              <View
                style={{
                  marginTop: 6,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ width: "80%", color: "gray" }}>
                  Start adding your expenses to split cost among players
                </Text>
                <Entypo name="chevron-small-right" size={25} color="gray" />
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 15 }}>
            <Image
              style={{
                width: "100%",
                height: 200,
                borderRadius: 10,
                resizeMode: "cover",
              }}
              source={{
                uri: "https://playo.gumlet.io/OFFERS/PlayplusSpecialBadmintonOfferlzw64ucover1614258751575.png",
              }}
            />
          </View>
          <View
            style={{
              marginVertical: 17,
              marginHorizontal: 15,
              backgroundColor: "white",
              padding: 12,
              borderRadius: 7,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Players ({route?.params?.item?.players.length})</Text>
              <Ionicons name="earth" size={25} color="gray" />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                💜 You are not covered{" "}
              </Text>
              <Text style={{ fontWeight: "500" }}>Learn more</Text>
            </View>
            <View
              style={{
                marginVertical: 20,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                  source={{ uri: route?.params?.item?.adminUrl }}
                />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Text>{route?.params?.item?.admin}</Text>
                  <View
                    style={{
                      alignSelf: "flex-start",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      backgroundColor: "#e0e0e0",
                      borderRadius: 6,
                    }}
                  >
                    <Text style={{ fontSize: 13 }}>HOST</Text>
                  </View>
                </View>

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
            </View>
            {route?.params?.item?.isUserAdmin == true ? (
              <View>
                <View
                  style={{
                    height: 1,
                    borderWidth: 0.65,
                    borderColor: "#e0e0e0",
                  }}
                />
                <Pressable
                  style={{
                    marginTop: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderWidth: 1,
                      borderColor: "#e0e0e0",
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 30, height: 30, resizeMode: "contain" }}
                      source={{
                        uri: "http://cdn-icons-png.flaticon.com/128/343/343303.png",
                      }}
                    />
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: "500", flex: 1 }}>
                    Add a co-host
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={25}
                    color="black"
                  />
                </Pressable>
                <View
                  style={{
                    height: 1,
                    borderWidth: 0.65,
                    borderColor: "#e0e0e0",
                    marginVertical: 12,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Pressable>
                    <Pressable
                      style={{
                        width: 60,
                        height: 60,
                        borderWidth: 1,
                        borderColor: "#e0e0e0",
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ width: 30, height: 30, resizeMode: "contain" }}
                        source={{
                          uri: "http://cdn-icons-png.flaticon.com/128/1474/1474545.png",
                        }}
                      />
                    </Pressable>
                    <Text
                      style={{
                        fontWeight: "500",
                        marginTop: 8,
                        textAlign: "center",
                      }}
                    >
                      Add
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Pressable
                      onPress={() => {
                        navigation.navigate("Manage", {
                          userID: userID,
                          gameID: route?.params?.item?._id,
                        });
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        borderWidth: 1,
                        borderColor: "#e0e0e0",
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        style={{ width: 30, height: 30, resizeMode: "contain" }}
                        source={{
                          uri: "http://cdn-icons-png.flaticon.com/128/7928/7928637.png",
                        }}
                      />
                    </Pressable>
                    <Text
                      style={{
                        fontWeight: "500",
                        marginTop: 8,
                        textAlign: "center",
                      }}
                    >
                      Manage
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Pressable
                      onPress={() =>
                        navigation.navigate("Players", {
                          players: players,
                        })
                      }
                      style={{
                        width: 60,
                        height: 60,
                        borderWidth: 1,
                        borderColor: "#e0e0e0",
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="chevron-right"
                        size={25}
                        color="black"
                      />
                    </Pressable>
                    <Text
                      style={{
                        fontWeight: "500",
                        marginTop: 8,
                        textAlign: "center",
                      }}
                    >
                      All players
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    height: 1,
                    borderWidth: 0.65,
                    borderColor: "#e0e0e0",
                    marginVertical: 12,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      borderWidth: 1,
                      borderColor: "#e0e0e0",
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{ width: 30, height: 30, resizeMode: "contain" }}
                      source={{
                        uri: "http://cdn-icons-png.flaticon.com/128/1511/1511847.png",
                      }}
                    />
                  </View>
                  <View>
                    <Text>Not on Playo? Invite</Text>
                  </View>
                </View>
              </View>
            ) : (
              <Pressable
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopColor: "#e0e0e0",
                  borderBlockColor: "#e0e0e0",
                  borderBottomWidth: 1,
                  marginBottom: 20,
                  borderTopWidth: 1,
                }}
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate("Players", {
                      players: players,
                    })
                  }
                  style={{
                    width: 60,
                    height: 60,
                    borderWidth: 1,
                    borderColor: "#e0e0e0",
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 12,
                  }}
                >
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={25}
                    color="black"
                  />
                </Pressable>
                <Text
                  style={{
                    fontWeight: "500",
                    marginTop: 8,
                    marginBottom: 12,
                    textAlign: "center",
                  }}
                >
                  All players
                </Text>
              </Pressable>
            )}
          </View>
          <View
            style={{
              marginHorizontal: 15,
              backgroundColor: "white",
              padding: 12,
              borderRadius: 6,
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                Queries (0)
              </Text>
              <View style={{ marginVertical: 10 }}>
                <Text
                  style={{ color: "gray", fontSize: 15, textAlign: "left" }}
                >
                  There are no queries yet!
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {route?.params?.item?.isUserAdmin == true ? (
        <Pressable
          style={{
            backgroundColor: "#9d23bc",
            marginTop: "auto",
            marginBottom: 10,
            padding: 15,
            marginHorizontal: 15,
            borderRadius: 4,
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
            Game Chat
          </Text>
        </Pressable>
      ) : userRequested ? (
        <Pressable
          style={{
            backgroundColor: "#fcf005",
            marginTop: "auto",
            marginBottom: 30,
            padding: 15,
            marginHorizontal: 15,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "red",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            CANCEL REQUEST
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => setModalVis(!modalVis)}
          style={{
            backgroundColor: "#9d23bc",
            marginTop: "auto",
            marginBottom: 10,
            padding: 15,
            marginHorizontal: 15,
            borderRadius: 4,
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
            Join Game
          </Text>
        </Pressable>
      )}
      <BottomModal
        onBackdropPress={() => setModalVis(!modalVis)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVis(!modalVis)}
        visible={modalVis}
        onTouchOutside={() => setModalVis(!modalVis)}
      >
        <ModalContent
          style={{ width: "100%", height: 400, backgroundColor: "white" }}
        >
          <View>
            <Text style={{ fontSize: 15, fontWeight: "500", color: "gray" }}>
              Join Game
            </Text>
            <Text style={{ marginTop: 20, color: "gray" }}>
              {route?.params?.item?.admin} has been working real hard to get
              this game going. Send a request
            </Text>
            <View
              style={{
                borderColor: "#e0e0e0",
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                height: 200,
                marginTop: 20,
              }}
            >
              <TextInput
                style={{ fontSize: 16 }}
                value={comment}
                onChangeText={setComment}
                placeholder="Send a message (Optional)"
              />
            </View>
            <Pressable
              onPress={() => sendJoinReq(route?.params?.item?._id)}
              style={{
                marginTop: "auto",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#9d23bc",
                borderRadius: 5,
                justifyContent: "center",
                padding: 10,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Send Request
              </Text>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default GameSetupScreen;

const styles = StyleSheet.create({});
