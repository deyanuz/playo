import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import IpAddress from "../DeviceConfig";

const PaymentScreen = () => {
  const route = useRoute();
  const total = (parseFloat(route?.params?.price) || 0) + 20;
  const { userID } = useContext(AuthContext);
  const navigation = useNavigation();
  const courtNumber = route.params.selectedCourt;
  const date = route.params.selectedDate;
  const time = route.params.selectedTime;
  const name = route.params.place;
  const game = route.params?.gameID;
  const bookSlot = async () => {
    try {
      const response = await axios.post(`http://${IpAddress}:8000/book`, {
        courtNumber,
        date,
        time,
        userID,
        name,
        game,
      });
      if (response.status == 200) {
        console.log(response.data);
        navigation.replace("Main");
      } else {
        console.log("Booking failed", response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <SafeAreaView>
        <ScrollView style={{ marginTop: 50 }}>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 23, fontWeight: "500", color: "#9d23bc" }}>
              {route?.params?.selectedSport}
            </Text>
            <View
              style={{
                borderColor: "#e0e0e0",
                borderWidth: 1,
                padding: 10,
                marginTop: 10,
                borderRadius: 6,
                shadowColor: "#171717",
                shadowOffset: { width: -1, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
            >
              <View>
                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <MaterialCommunityIcons
                    name="fireplace-off"
                    size={24}
                    color="gray"
                  />
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    {route?.params?.selectedCourt}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <Feather name="calendar" size={24} color="gray" />
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    {route?.params?.selectedDate}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <Feather name="clock" size={24} color="gray" />
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    {route?.params?.selectedTime}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <MaterialCommunityIcons
                    name="currency-bdt"
                    size={24}
                    color="gray"
                  />
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    {route?.params?.price}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 15, marginHorizontal: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
                >
                  <Text>Court Price:</Text>
                  <EvilIcons name="question" size={24} color="black" />
                </View>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  BDT {route?.params?.price}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
                >
                  <Text>Convenience Fee</Text>
                  <EvilIcons name="question" size={24} color="black" />
                </View>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>BDT 20</Text>
              </View>
            </View>
            <Text
              style={{
                height: 1,
                borderColor: "#e0e0e0",
                borderWidth: 3,
                marginTop: 20,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                marginHorizontal: 15,
              }}
            >
              <Text>Total Amount</Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                BDT {total}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                marginHorizontal: 15,
              }}
            >
              <Text>Total Amount</Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                To be paid at venue
              </Text>
            </View>
            <Text
              style={{
                height: 1,
                borderColor: "#e0e0e0",
                borderWidth: 3,
                marginTop: 20,
              }}
            />
            <View
              style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
            >
              <Image
                style={{ width: 100, height: 80, resizeMode: "contain" }}
                source={{
                  uri: "https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50",
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Pressable
        onPress={bookSlot}
        style={{
          backgroundColor: "#9d23bc",
          padding: 15,
          marginBottom: 30,
          borderRadius: 6,
          marginHorizontal: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            color: "white",
            textAlign: "center",
          }}
        >
          Book Venue
        </Text>
      </Pressable>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
