import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

const StartScreen = () => {
  const navigation = useNavigation();
  const mapView = useRef(null);
  const users = require("../users");
  const DHAKA_COORDS = {
    latitude: 23.699,
    longitude: 90.4071,
  };
  const generateCircularPoints = (center, radious, numPoints) => {
    const points = [];
    const angleStep = (2 * Math.PI) / numPoints;
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const latitude =
        center.latitude + (radious / 105) * Math.cos(angle) - 0.015;
      const longitude =
        center.longitude +
        (radious / (600 * Math.cos(center.latitude))) * Math.sin(angle);
      points.push({ latitude, longitude });
    }
    return points;
  };
  const numPoints = 6;
  const radious = 6;
  const circularPoints = generateCircularPoints(
    DHAKA_COORDS,
    radious,
    numPoints
  );
  useEffect(() => {
    mapView.current.fitToCoordinates(circularPoints, {
      edgePadding: {
        top: 70,
        bottom: 70,
        left: 70,
        right: 70,
      },
    });
  }, [DHAKA_COORDS]);
  return (
    <>
      <SafeAreaView>
        <MapView
          ref={mapView}
          style={{ width: "100%", height: 400 }}
          initialRegion={{
            latitude: 23.709,
            longitude: 90.4071,
            latitudeDelta: 0.2,
            longitudeDelta: 0.1,
          }}
        >
          {circularPoints.map((p, i) => {
            // cycle through the user array if there are
            // more points than users
            const user = users[i % users.length];
            return (
              <Marker key={i} coordinate={p}>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    source={{ uri: user?.image }}
                    style={{
                      width: 70,
                      height: 70,
                      resizeMode: "cover",
                      borderRadius: 35,
                    }}
                  />
                </View>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 7,
                    borderRadius: 7,
                    backgroundColor: "white",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 13,
                      fontWeight: "500",
                      color: "#9d23bc",
                    }}
                  >
                    {user?.description}
                  </Text>
                </View>
              </Marker>
            );
          })}
        </MapView>
        <View
          style={{
            marginTop: 35,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              width: "50%",
              textAlign: "center",
            }}
          >
            Fine players in your neighbourhood
          </Text>
          <Text style={{ marginTop: 20, color: "gray", fontSize: 15 }}>
            Just like you did as a kid
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={{
            marginTop: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>
            Already have an account? Login
          </Text>
        </Pressable>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Image
            style={{ width: 110, height: 60, resizeMode: "contain" }}
            source={{
              uri: "https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50",
            }}
          />
        </View>
      </SafeAreaView>
      <View style={{ padding: 10, marginTop: "auto" }}>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{
            marginTop: "auto",
            backgroundColor: "#a71ec9",
            padding: 12,
            borderRadius: 7,
            marginBottom: 20,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "500" }}
          >
            READY, SET, GO
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default StartScreen;

const styles = StyleSheet.create({});
