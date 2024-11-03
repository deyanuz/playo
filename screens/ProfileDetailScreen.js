import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import IpAddress from "../DeviceConfig";

const ProfileDetailScreen = () => {
  const [user, setUser] = useState("");
  const navigation = useNavigation();
  const { userID, token, setToken, setUserID } = useContext(AuthContext);
  useEffect(() => {
    if (userID) {
      fetchUser();
    }
  }, [userID]);
  const fetchUser = async () => {
    try {
      console.log("mysysy", userID);
      const response = await axios.get(
        `http://${IpAddress}:8000/user/${userID}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem("token");

      setToken("");

      setUserID("");

      navigation.replace("Start");
    } catch (error) {
      console.log("Error", error);
    }
  };
  console.log(user);
  return (
    <View>
      <View
        style={{
          backgroundColor: "white",
          padding: 12,
          margin: 12,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            //   alignItems: 'center',
            gap: 20,
          }}
        >
          <Pressable onPress={clearAuthToken} style={{}}>
            <Image
              style={{ width: 70, height: 70, borderRadius: 35 }}
              source={{ uri: user?.image }}
            />
            {/* <Text style={{textAlign:"center"}}>{user?.user?.firstName}</Text> */}
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 30,
              justifyContent: "space-around",
              width: "80%",
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "center",
                  color: "gray",
                  marginTop: 6,
                  fontSize: 23,
                  fontWeight: "600",
                }}
              >
                {user?.nofGames}
              </Text>
              <Text style={{ color: "gray", marginTop: 6, fontSize: 13 }}>
                GAMES
              </Text>
            </View>
          </View>
        </View>

        <View>
          <Text style={{ marginTop: 10, fontWeight: "500" }}>
            {user?.user?.firstName}
          </Text>
          <Text style={{ color: "gray", marginTop: 6 }}>
            Last Played on 13th July
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileDetailScreen;

const styles = StyleSheet.create({});
