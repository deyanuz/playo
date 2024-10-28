import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const PlayScreen = () => {
  const [option, setOption] = useState("my-sports");
  const [sport, setSport] = useState("badminton");
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 12,
          paddingRight: 15,
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
              KolaBagan
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={27} color="white" />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="chatbox-outline" size={27} color="white" />
            <Ionicons name="notifications-outline" size={27} color="white" />
            <Image
              style={{ width: 30, height: 30, borderRadius: 15 }}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AF2bZyigIIj8b2GrRpAzoac3cju3600tcaLW8FmmQ6uRcYF4Eg=s32-c-mo",
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginVertical: 13,
          }}
        >
          <Pressable onPress={() => setOption("calender")}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 15,
                color: option === "calender" ? "#fcf005" : "white",
              }}
            >
              Your Calender
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption("my-sports")}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 15,
                color: option === "my-sports" ? "#fcf005" : "white",
              }}
            >
              My Sports
            </Text>
          </Pressable>
          <Pressable onPress={() => setOption("other-sports")}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 15,
                color: option === "other-sports" ? "#fcf005" : "white",
              }}
            >
              Other Sports
            </Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            onPress={() => setSport("badminton")}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderColor: "#fcf005",
              marginRight: 10,
              borderRadius: 8,
              borderWidth: sport == "badminton" ? 0 : 1,
              backgroundColor: sport == "badminton" ? "#fcf005" : "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: sport == "badminton" ? "#9d23bc" : "white",
                fontWeight: "500",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Badminton
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSport("cricket")}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderColor: "#fcf005",
              marginRight: 10,
              borderRadius: 8,
              borderWidth: sport == "cricket" ? 0 : 1,
              backgroundColor: sport == "cricket" ? "#fcf005" : "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: sport == "cricket" ? "#9d23bc" : "white",
                fontWeight: "500",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Cricket
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSport("cycling")}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderColor: "#fcf005",
              marginRight: 10,
              borderRadius: 8,
              borderWidth: sport == "cycling" ? 0 : 1,
              backgroundColor: sport == "cycling" ? "#fcf005" : "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: sport == "cycling" ? "#9d23bc" : "white",
                fontWeight: "500",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Cycling
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSport("running")}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderColor: "#fcf005",
              marginRight: 10,
              borderRadius: 8,
              borderWidth: sport == "running" ? 0 : 1,
              backgroundColor: sport == "running" ? "#fcf005" : "transparent",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: sport == "running" ? "#9d23bc" : "white",
                fontWeight: "500",
                fontSize: 15,
                textAlign: "center",
              }}
            >
              Running
            </Text>
          </Pressable>
        </ScrollView>
        <View></View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          backgroundColor: "white",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Create")}>
          <Text style={{ fontWeight: "bold" }}> Create Game</Text>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Pressable>
            <Text style={{ fontWeight: "bold" }}> Filter</Text>
          </Pressable>
          <Pressable>
            <Text style={{ fontWeight: "bold" }}> Sort</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({});
