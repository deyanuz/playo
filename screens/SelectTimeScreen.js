import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import times from "../time";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const SelectTimeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Select suitable time",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
    });
  }, []);
  const [time, setTime] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState(null);
  const [isStartTimePickerVis, setIsStartTimePickerVis] = useState(false);
  const [isEndTimePickerVis, setIsEndTimePickerVis] = useState(false);
  const showStartTimePicker = () => {
    setIsStartTimePickerVis(true);
  };
  const showEndTimePicker = () => {
    setIsEndTimePickerVis(true);
  };
  const handleConfirmTime = (time) => {
    setStartTime(time);
    hideStartTimePicker();
  };
  const handleConfirmEndTime = (time) => {
    setEndTime(time);
    hideEndTimePicker();
  };
  useEffect(() => {
    if (startTime && endTime) {
      const formattedStartTime = formatTime(startTime);
      const formattedEndTime = formatTime(endTime);
      const timeInterval = `${formattedStartTime} - ${formattedEndTime}`;
      console.log(timeInterval);
      navigation.navigate("Create", { timeInterval });
    }
  }, [startTime, endTime]);
  const hideStartTimePicker = () => {
    setIsStartTimePickerVis(false);
  };
  const hideEndTimePicker = () => {
    setIsEndTimePickerVis(false);
  };
  const formatTime = (time) => {
    if (!time) return "Select a time";
    const hours = time.getHours() % 12 || 12;
    const minutes = time.getMinutes();
    const ampm = time.getHours() >= 12 ? "PM" : "AM";
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours} : ${formattedMinutes} ${ampm}`;
  };
  return (
    <View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {times.map((item, index) => (
          <Pressable
            key={index}
            style={{
              backgroundColor: "white",
              margin: 20,
              width: 150,
              height: 120,
              borderRadius: 7,
              alignItems: "center",
              justifyContent: "center",
              gap: 15,
              shadowColor: "#171717",
              shadowOffset: { width: -2, height: 3 },
              shadowRadius: 3,
            }}
          >
            <Text>{item?.icon}</Text>
            <Text>{item?.type}</Text>
            <Text>{item?.timings}</Text>
          </Pressable>
        ))}
      </Pressable>
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Text style={styles.label}>Start time: </Text>
          <Button
            title={formatTime(startTime)}
            onPress={showStartTimePicker}
            color="#c518f0"
          />
          <DateTimePickerModal
            isVisible={isStartTimePickerVis}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideStartTimePicker}
            is24Hour={false}
          />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.label}>End time: </Text>
          <Button
            title={formatTime(endTime)}
            onPress={showEndTimePicker}
            color="#c518f0"
          />
          <DateTimePickerModal
            isVisible={isEndTimePickerVis}
            mode="time"
            onConfirm={handleConfirmEndTime}
            onCancel={hideEndTimePicker}
            is24Hour={false}
          />
        </View>
      </View>
    </View>
  );
};

export default SelectTimeScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  timeContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  summaryContainer: {
    marginTop: 32,
    alignItems: "center",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
