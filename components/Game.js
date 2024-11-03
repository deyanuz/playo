import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import Feather from "react-native-vector-icons/Feather";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../AuthContext";

const Game = ({ item }) => {
  const navigation = useNavigation();
  const { userID } = useContext(AuthContext);
  const userRequests = item?.requests.some((req) => req.userID == userID);
  return (
    <Pressable
      onPress={() => navigation.navigate("Game", { item: item })}
      style={{
        marginVertical: 10,
        marginHorizontal: 14,
        padding: 14,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text>Regular</Text>
        <Feather name="bookmark" size={25} color="black" />
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: item.adminUrl }}
              style={{ width: 56, height: 56, borderRadius: 28 }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: -7,
              }}
            >
              {item?.players
                .filter((c) => c?.name != item?.admin)
                .map((player, index) => (
                  <Image
                    key={index}
                    source={{ uri: player?.imageUrl }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginLeft: -7,
                    }}
                  />
                ))}
            </View>
          </View>

          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text>
              {item?.players?.length}/{item?.totalPlayers} Going
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: "#fffbde",
              borderRadius: 8,
              borderColor: "#eedc82",
              borderWidth: 1,
            }}
          >
            <Text style={{ fontWeight: "500" }}>
              Only {item?.totalPlayers - item?.players?.length} slots left 🚀
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ marginTop: 10, color: "gray", fontSize: 15 }}>
              {item?.admin}
            </Text>
            <Text style={{ marginTop: 10, fontSize: 13, fontWeight: "500" }}>
              {item?.date}, {item?.time}
            </Text>
          </View>
          {item?.matchFull && (
            <Image
              style={{ width: 100, height: 70, resizeMode: "contain" }}
              source={{
                uri: "https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v3%2Fmatch_full.png&w=256&q=75",
              }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
        }}
      >
        <SimpleLineIcons name="location-pin" size={25} color="black" />
        <Text
          style={{ fontSize: 15, flex: 1 }}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {item?.area}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            backgroundColor: "#e0e0e0",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 5,
            marginTop: 12,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: "400" }}>
            Intermideate to Advanced
          </Text>
        </View>
        {userRequests && (
          <View
            style={{
              backgroundColor: "#fffbde",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 7,
              marginTop: 10,
              borderColor: "#eedc82",
              borderWidth: 1,
            }}
          >
            <Text>Requested</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default Game;

const styles = StyleSheet.create({});
