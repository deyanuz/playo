import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import Calender from "../components/Calender";
import moment from "moment";

const SlotScreen = () => {
  const navigation = useNavigation();
  const today = moment().format("YYYY-MM-DD");
  const route = useRoute();
  const [selectedSport, setSelectedSport] = useState(
    route?.params?.sports[0].name
  );
  const time = route?.params?.slot;
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedCourt, setSelectedCourt] = useState([]);
  const [duration, setDuration] = useState(60);
  const calculateEndTime = (startTime, duration) => {
    if (typeof startTime !== "string") {
      console.log("invalid");
      return;
    }
    const match = startTime.match(/(\d+:\d+)([APMapm]+)/);
    if (!match) {
      console.log("error");
    }
    const time = match[1];
    const modifier = match[2].toUpperCase();
    const [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
    if (modifier == "PM" && hours < 12) hours += 12;
    if (modifier == "AM" && hours == 12) hours = 0;
    const totalMinutes = hours * 60 + minutes + duration;
    let endHours = Math.floor(totalMinutes / 60);
    if (endHours >= 24) endHours = endHours % 24;
    let endMinutes = totalMinutes % 60;
    let endModifier = endHours >= 12 ? "PM" : "AM";
    if (endHours > 12) endHours = endHours % 12;
    if (endHours == 0) endHours = 12;
    const formattedEndHours = endHours.toString().padStart(2, "0");
    const formattedEndMinutes = endMinutes.toString().padStart(2, "0");
    return `${formattedEndHours}:${formattedEndMinutes} ${endModifier}`;
  };
  const [checkedTimes, setCheckedTimes] = useState([]);
  const [times, setTimes] = useState([]);
  const generateTimes = () => {
    const start = moment(selectedDate).startOf("day").add(6, "hours");
    const end = moment(selectedDate).endOf("day");
    const interval = 60;
    const result = [];
    const current = moment(start);
    while (current <= end) {
      result.push(current.format("h:mma"));
      current.add(interval, "minutes");
    }
    setTimes(result);
  };
  useEffect(() => {
    generateTimes();
  }, [selectedDate]);
  useEffect(() => {
    const checkTime = () => {
      const currentDateTime = moment();
      const selectedDateStart = moment(selectedDate).startOf("day");
      const timess = times?.map((item) => {
        const dateTime = moment(selectedDateStart).set({
          hour: moment(item, "h:mma").get("hour"),
          minute: moment(item, "h:mma").get("minute"),
        });
        const status = currentDateTime.isBefore(dateTime);
        return { time: item, status: status };
      });
      setCheckedTimes(timess);
    };
    checkTime();
  }, [selectedDate, times]);
  const isSlotBooked = (time) => {};
  const courts = route?.params?.sports?.filter((i) => i.name == selectedSport);
  const price = route?.params?.sports
    ?.filter((i) => i.name == selectedSport)
    .map((i) => i.price);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Ionicons name="arrow-back" size={25} color="black" />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 15, fontWeight: "500", width: "80%" }}
            >
              {route?.params?.place}
            </Text>
          </View>
          <ScrollView
            // contentContainerStyle={{ marginLeft: "auto" }}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {route?.params?.sports?.map((it, i) => (
              <View key={i}>
                {selectedSport.includes(it?.name) ? (
                  <Pressable
                    style={{
                      borderColor: "#9d23bc",
                      margin: 10,
                      padding: 20,
                      width: 130,
                      height: 90,
                      borderWidth: 2,
                      borderRadius: 7,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{ textAlign: "center" }}
                      name={it.icon}
                      size={24}
                      color="gray"
                      key={i}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: 10,
                      }}
                    >
                      {it?.name}
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      setSelectedSport(it?.name);
                      setSelectedCourt([]);
                    }}
                    style={{
                      borderColor: "#686868",
                      margin: 10,
                      padding: 20,
                      width: 130,
                      height: 90,
                      borderWidth: 1,
                      borderRadius: 7,
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{ textAlign: "center" }}
                      name={it.icon}
                      size={24}
                      color="gray"
                      key={i}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: 10,
                      }}
                    >
                      {it?.name}
                    </Text>
                  </Pressable>
                )}
              </View>
            ))}
          </ScrollView>
          {selectedSport && (
            <ScrollView>
              <Calender
                selected={selectedDate}
                selectedSport={selectedSport}
                onSelectDate={setSelectedDate}
                setSelectedTime={setSelectedTime}
                setSelectedSport={setSelectedSport}
              />
            </ScrollView>
          )}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              width: "60%",
              margin: 10,
              justifyContent: "space-between",
            }}
          >
            <Pressable
              style={{
                borderColor: "#e0e0e0",
                borderWidth: 1,
                paddingVertical: 15,
                paddingHorizontal: 50,
              }}
            >
              <Text
                style={{ fontSize: 13, fontWeight: "400", textAlign: "center" }}
              >
                Time
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                {route?.params?.startTime
                  ? route?.params?.startTime
                  : selectedTime.length > 0
                  ? selectedTime
                  : "Choose a time"}
              </Text>
            </Pressable>

            <Pressable
              style={{
                borderColor: "#e0e0e0",
                borderWidth: 1,
                paddingVertical: 15,
                paddingHorizontal: 50,
              }}
            >
              <Text
                style={{ fontSize: 13, fontWeight: "400", textAlign: "center" }}
              >
                Time
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                {route?.params?.endTime
                  ? route?.params?.endTime
                  : selectedTime.length > 0
                  ? calculateEndTime(selectedTime, duration)
                  : "Choose a time"}
              </Text>
            </Pressable>
          </Pressable>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
              marginTop: 12,
            }}
          >
            Duration
          </Text>
          <Pressable
            style={{
              gap: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Pressable
              onPress={() => setDuration(Math.max(60, duration - 60))}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "gray",
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 15, fontWeight: "600" }}
              >
                -
              </Text>
            </Pressable>
            <Text
              style={{ textAlign: "center", fontSize: 15, fontWeight: "600" }}
            >
              {duration}
            </Text>
            <Pressable
              onPress={() => setDuration(duration + 60)}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "gray",
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ textAlign: "center", fontSize: 15, fontWeight: "600" }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
          <Text
            style={{
              textAlign: "center",
              marginVertical: 10,
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            Select Slot
          </Text>
          {selectedSport && (
            <ScrollView
              horizontal
              contentContainerStyle={{ marginHorizontal: 10 }}
              showsHorizontalScrollIndicator={false}
            >
              {checkedTimes?.map((item, index) => {
                const disabled = isSlotBooked(item.time);
                return (
                  <View key={index}>
                    {selectedTime.includes(item?.time) ? (
                      <Pressable
                        onPress={() => setSelectedTime(item?.time)}
                        style={{
                          margin: 10,
                          borderColor: "#9d23bc",
                          backgroundColor: "#291b87",
                          borderRadius: 5,
                          borderWidth: 1,
                          padding: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            padding: 10,
                          }}
                        >
                          {item?.time}
                        </Text>
                      </Pressable>
                    ) : (
                      <Pressable
                        style={{
                          margin: 10,
                          borderColor:
                            item?.status == false || disabled
                              ? "gray"
                              : "#9d23bc",
                          borderRadius: 5,
                          borderWidth: 1,
                          padding: 10,
                        }}
                      >
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                          {item?.time}
                        </Text>
                      </Pressable>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          )}
          <View style={{ marginHorizontal: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {courts.map((item) =>
                item.courts.map((court, index) =>
                  selectedCourt.includes(court.name) ? (
                    <Pressable
                      key={index}
                      onPress={() => setSelectedCourt(court.name)}
                      style={{
                        backgroundColor: "#9d23bc",
                        borderRadius: 6,
                        padding: 15,
                        width: 160,
                        margin: 10,
                      }}
                    >
                      <Text style={{ textAlign: "center", color: "white" }}>
                        {court.name}
                      </Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => setSelectedCourt(court.name)}
                      style={{
                        borderRadius: 6,
                        padding: 15,
                        width: 160,
                        margin: 10,
                        borderWidth: 1,
                        borderColor: "#9d23bc",
                      }}
                    >
                      <Text style={{ textAlign: "center", color: "#9d23bc" }}>
                        {court.name}
                      </Text>
                    </Pressable>
                  )
                )
              )}
            </View>
            {selectedCourt.length > 0 && (
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  marginBottom: 20,
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                Court price: BDT {price}
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <Pressable
        onPress={() =>
          navigation.navigate("Payment", {
            selectedCourt: selectedCourt,
            selectedSport: selectedSport,
            price: price,
            selectedTime: time,
            selectedDate: selectedDate,
            place: route?.params?.place,
            gameID: route?.params?.gameID,
          })
        }
        style={{
          backgroundColor: "#c518f0",
          padding: 15,
          marginBottom: 30,
          borderRadius: 7,
          marginHorizontal: 15,
        }}
      >
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          Next
        </Text>
      </Pressable>
    </>
  );
};

export default SlotScreen;

const styles = StyleSheet.create({});
