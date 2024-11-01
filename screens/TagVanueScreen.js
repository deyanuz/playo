import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import IpAddress from "../DeviceConfig";

const TagVanueScreen = () => {
  const [venues, setVenues] = useState([]);
  const navigattion = useNavigation();
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
  const [taggedVenue, setTaggedVenue] = useState(null);
  useEffect(() => {
    if (taggedVenue) {
      navigattion.goBack({ taggedVenue });
    }
  }, [navigattion, taggedVenue]);
  const handleSelectVenue = (venue) => {
    navigattion.navigate("Create", { taggedVenue: venue });
  };
  return (
    <SafeAreaView>
      <View style={{ padding: 10, backgroundColor: "#9d23bc", marginTop: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Ionicons name="arrow-back" size={25} color="white" />
          <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
            Tag Venue
          </Text>
        </View>
      </View>
      <FlatList
        data={venues}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectVenue(item?.name)}
            style={{
              padding: 10,
              marginVertical: 5,
              borderColor: "#e0e0e0",
              borderWidth: 1,
              marginHorizontal: 10,
              borderRadius: 6,
            }}
          >
            <View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Image
                  style={{
                    width: 90,
                    height: 90,
                    resizeMode: "cover",
                    borderRadius: 7,
                  }}
                  source={{ uri: item?.image }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 15, fontWeight: "500", width: "100%" }}
                  >
                    {item?.name}
                  </Text>
                  <Text style={{ marginTop: 5, color: "gray" }}>
                    {item?.address}
                  </Text>
                  <Text style={{ marginTop: 7, fontWeight: "500" }}>
                    {item?.avgRating} ({item?.ratingCount} ratings)
                  </Text>
                </View>
                <Ionicons
                  name="shield-checkmark-sharp"
                  size={25}
                  color="#c518f0"
                />
              </View>
              <View style={{ marginTop: 7 }}>
                <Text style={{ textAlign: "center", color: "gray" }}>
                  BOOKABLE
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default TagVanueScreen;

const styles = StyleSheet.create({});
