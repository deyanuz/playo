import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import venues from "../venues";
import VenueCard from "../components/VenueCard";

const BookScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View
        style={{
          padding: 12,
          paddingRight: 15,
          marginTop: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>KolaBagan</Text>
          <MaterialIcons name="keyboard-arrow-down" size={27} color="black" />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons name="chatbox-outline" size={27} color="black" />
          <Ionicons name="notifications-outline" size={27} color="black" />
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
          marginHorizontal: 12,
          backgroundColor: "#e8e8e8",
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 25,
        }}
      >
        <TextInput placeholder="Search for venues" />
        <Ionicons name="search" size={27} color="gray" />
      </View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 13,
        }}
      >
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            borderColor: "#e0e0e0",
            borderWidth: 1,
          }}
        >
          <Text>Sports & Availability</Text>
        </View>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            borderColor: "#e0e0e0",
            borderWidth: 1,
          }}
        >
          <Text>Favourites</Text>
        </View>
        <View
          style={{
            padding: 10,
            borderRadius: 10,
            borderColor: "#e0e0e0",
            borderWidth: 1,
          }}
        >
          <Text>Offers</Text>
        </View>
      </Pressable>
      <FlatList
        data={venues}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VenueCard item={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default BookScreen;

const styles = StyleSheet.create({});
