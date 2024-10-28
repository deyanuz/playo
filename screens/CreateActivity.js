import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

const CreateActivity = () => {
  const [sport, setSport] = useState("");
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selected, setSelected] = useState(["public"]);
  const [nPlayers, setNPlayers] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const [taggedVenue, setTaggedVenue] = useState(null);

  useEffect(() => {
    if (route.params?.taggedVenue) setTaggedVenue(route.params?.taggedVenue);
  }, [route?.params]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <View style={{ marginHorizontal: 10 }}>
          <Ionicons name="arrow-back" size={25} color="black" />
        </View>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Create Activity
          </Text>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginTop: 15,
              marginVertical: 15,
            }}
          >
            <MaterialCommunityIcons name="whistle" size={25} color="gray" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: "500" }}>Sport</Text>
              <TextInput
                value={sport}
                onChangeText={setSport}
                style={{ marginTop: 7, fontSize: 15 }}
                placeholderTextColor="gray"
                placeholder="Eg. Badmnton..."
              />
            </View>
            <AntDesign name="arrowright" size={25} color="gray" />
          </Pressable>
          <Text style={{ borderColor: "#e0e0e0", borderWidth: 1, height: 1 }} />
          <Pressable
            onPress={() => navigation.navigate("TagVanue")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginTop: 15,
              marginVertical: 15,
            }}
          >
            <Entypo name="location" size={25} color="gray" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: "500" }}>Area</Text>
              <TextInput
                value={area ? area : taggedVenue}
                onChangeText={setArea}
                style={{ marginTop: 7, fontSize: 15, color: "black" }}
                placeholderTextColor="gray"
                placeholder="Eg. Dhanmandi..."
              />
            </View>
            <AntDesign name="arrowright" size={25} color="gray" />
          </Pressable>
          <Text style={{ borderColor: "#e0e0e0", borderWidth: 1, height: 1 }} />
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginTop: 15,
              marginVertical: 15,
            }}
          >
            <Feather name="calendar" size={25} color="gray" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: "500" }}>Date</Text>
              <TextInput
                editable={false}
                style={{ marginTop: 7, fontSize: 15, color: "black" }}
                placeholderTextColor={date ? "black" : "gray"}
                placeholder={date ? date : "Pick a day..."}
              />
            </View>
            <AntDesign name="arrowright" size={25} color="gray" />
          </Pressable>
          <Text style={{ borderColor: "#e0e0e0", borderWidth: 1, height: 1 }} />
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginTop: 15,
              marginVertical: 15,
            }}
          >
            <AntDesign name="clockcircleo" size={25} color="gray" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 17, fontWeight: "500" }}>Time</Text>
              <TextInput
                style={{ marginTop: 7, fontSize: 15 }}
                placeholderTextColor={time ? "black" : "gray"}
                placeholder={time ? time : "Pick exact time..."}
              />
            </View>
            <AntDesign name="arrowright" size={25} color="gray" />
          </Pressable>
          <Text style={{ borderColor: "#e0e0e0", borderWidth: 1, height: 1 }} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              marginTop: 7,
              marginVertical: 10,
            }}
          >
            <Feather name="activity" size={25} color="gray" />
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ marginBottom: 10, fontSize: 15, fontWeight: "500" }}
              >
                Activity Access
              </Text>

              <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable
                  onPress={() => setSelected("public")}
                  style={
                    selected.includes("public")
                      ? {
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                          backgroundColor: "#c518f0",
                          width: 140,
                          justifyContent: "center",
                          borderRadius: 5,
                          padding: 10,
                        }
                      : {
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                          backgroundColor: "white",
                          width: 140,
                          justifyContent: "center",
                          borderRadius: 5,
                          padding: 10,
                        }
                  }
                >
                  <Ionicons
                    name="earth"
                    size={25}
                    color="gray"
                    style={{
                      color: selected.includes("public") ? "white" : "black",
                    }}
                  />
                  <Text
                    style={
                      selected.includes("public")
                        ? {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 15,
                          }
                        : {
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 15,
                          }
                    }
                  >
                    Public
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setSelected("invite-only")}
                  style={
                    selected.includes("invite-only")
                      ? {
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                          backgroundColor: "#c518f0",
                          width: 140,
                          justifyContent: "center",
                          borderRadius: 5,
                          padding: 10,
                        }
                      : {
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                          backgroundColor: "white",
                          width: 140,
                          justifyContent: "center",
                          borderRadius: 5,
                          padding: 10,
                        }
                  }
                >
                  <AntDesign
                    name="lock1"
                    size={25}
                    color="gray"
                    style={{
                      color: selected.includes("invite-only")
                        ? "white"
                        : "black",
                    }}
                  />
                  <Text
                    style={
                      selected.includes("invite-only")
                        ? {
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 15,
                          }
                        : {
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 15,
                          }
                    }
                  >
                    Invite only
                  </Text>
                </Pressable>
              </Pressable>
            </View>
          </View>
          <Text
            style={{
              borderColor: "#e0e0e0",
              borderWidth: 1,
              height: 1,
              marginTop: 7,
            }}
          />
          <Text style={{ marginTop: 20, fontSize: 16 }}>Total players</Text>
          <View
            style={{
              padding: 10,
              backgroundColor: "#f0f0f0",
              marginTop: 10,
              borderRadius: 6,
            }}
          >
            <View style={{ marginVertical: 3 }}>
              <View>
                <TextInput
                  value={nPlayers}
                  onChangeText={setNPlayers}
                  style={{
                    padding: 10,
                    backgroundColor: "white",
                    borderColor: "#d0d0d0",
                    borderWidth: 1,
                    borderRadius: 4,
                  }}
                  placeholder="Total number of players..."
                />
              </View>
            </View>
          </View>
          <Text
            style={{
              borderColor: "#e0e0e0",
              borderWidth: 1,
              height: 1,
              marginTop: 15,
            }}
          />
          <Text style={{ fontSize: 16, marginTop: 20 }}>Add Instructions</Text>
          <View
            style={{
              padding: 10,
              backgroundColor: "#f0f0f0",
              marginTop: 10,
              borderRadius: 6,
            }}
          >
            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Ionicons name="bag-check" size={25} color="#febe10" />
              <Text style={{ flex: 1, fontSize: 15, fontWeight: "500" }}>
                Bring your own equipments
              </Text>
              <FontAwesome name="check-square" size={25} color="#c518f0" />
            </View>

            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <MaterialCommunityIcons
                name="directions-fork"
                size={25}
                color="#febe10"
              />
              <Text style={{ flex: 1, fontSize: 15, fontWeight: "500" }}>
                Cost Shared
              </Text>
              <FontAwesome name="check-square" size={25} color="#c518f0" />
            </View>
            <View
              style={{
                marginVertical: 5,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <FontAwesome5 name="syringe" size={25} color="#febe10" />
              <Text style={{ flex: 1, fontSize: 15, fontWeight: "500" }}>
                Covid vaccinated players prefered
              </Text>
              <FontAwesome name="check-square" size={25} color="#c518f0" />
            </View>
            <TextInput
              style={{
                padding: 10,
                backgroundColor: "white",
                borderColor: "#d0d0d0",
                borderWidth: 1,
                marginVertical: 8,
                borderRadius: 6,
              }}
              placeholder="Add more instructions..."
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 15,
              marginVertical: 10,
            }}
          >
            <AntDesign name="setting" size={25} color="black" />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Advanced settings
              </Text>
            </View>
            <AntDesign name="arrowright" size={25} color="gray" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateActivity;

const styles = StyleSheet.create({});
