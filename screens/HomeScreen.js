import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View>
          <Text style={{ marginLeft: 15 }}>Zunayed</Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginRight: 15,
          }}
        >
          <Ionicons name="chatbox-outline" size={25} color="black" />
          <Ionicons name="notifications-outline" size={25} color="black" />

          <Pressable>
            <Image
              style={{ width: 30, height: 30, borderRadius: 15 }}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AF2bZyigIIj8b2GrRpAzoac3cju3600tcaLW8FmmQ6uRcYF4Eg=s32-c-mo",
              }}
            />
          </Pressable>
        </View>
      ),
    });
  }, []);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View
        style={{
          padding: 13,
          backgroundColor: "white",
          margin: 15,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          elevation: 3,
          shadowColor: "#000",
        }}
      >
        <View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 25 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/785/785116.png",
            }}
          />
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text>Set Your Weekly Goals</Text>
            <Image
              style={{ width: 20, height: 20, borderRadius: 10 }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/426/426833.png",
              }}
            />
          </View>
          <Text style={{ marginTop: 8, color: "gray" }}>KEEP YOURSELF FIT</Text>
        </View>
      </View>

      <View
        style={{
          padding: 13,
          backgroundColor: "white",
          marginVertical: 6,
          marginHorizontal: 13,
          borderRadius: 12,
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
            backgroundColor: "#e0e0e0",
            borderRadius: 4,
            width: 200,
            marginVertical: 5,
          }}
        >
          <Text style={{ color: "#484848", fontSize: 13 }}>
            GEAR UP FOR YOUR GAMES
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16 }}>Badminton Activity</Text>
          <Pressable
            style={{
              padding: 10,
              backgroundColor: "white",
              borderRadius: 7,
              elevation: 6,
              shadowColor: "#000",
              width: 80,
            }}
          >
            <Text style={{ textAlign: "center" }}>View</Text>
          </Pressable>
        </View>
        <Text style={{ marginTop: 4, color: "gray" }}>
          You have no Games today
        </Text>
        <Pressable
          style={{
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              textDecorationLine: "underline",
            }}
          >
            View My Calender
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
