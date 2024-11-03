import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Date from "./Date";

const Calender = ({
  onSelectDate,
  selected,
  selectedSport,
  setSelectedSport,
  setSelectedTime,
}) => {
  const [dates, setDates] = useState([]);
  const [scrollPos, setScrollPos] = useState(0);
  const [month, setMonth] = useState();
  const getCurrentMonth = () => {
    if (dates.length) {
      const month = moment(dates[0])
        .add(scrollPos / 60, "days")
        .format("MMMM");
      setMonth(month);
    }
  };
  useEffect(() => {
    getCurrentMonth();
  }, [dates]);
  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < 10; i++) {
      const date = moment().add(i, "days");
      _dates.push(date);
    }
    setDates(_dates);
  };
  useEffect(() => {
    getDates();
  }, []);
  return (
    <>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, marginTop: 6, fontWeight: "600" }}>
          {month}
        </Text>
        <Text style={{ marginBottom: 10, fontWeight: "500", marginTop: 10 }}>
          {selectedSport}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => setScrollPos(e.nativeEvent.contentOffset.x)}
          >
            {dates?.map((date, index) => (
              <Date
                key={index}
                date={date}
                setSelectedTime={setSelectedTime}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Calender;

const styles = StyleSheet.create({});
