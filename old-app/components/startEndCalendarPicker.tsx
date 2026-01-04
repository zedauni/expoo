import React from "react";
import { Colors } from "../constants/styles";
import { Dimensions } from "react-native";
import { Calendar } from "react-native-calendars";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export interface DateData {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
}

interface StartEndCalendarPickerProps {
  maxDate?: string;
  current?: string;
  onDayPress: (day: DateData) => void;
}

const StartEndCalendarPicker: React.FC<StartEndCalendarPickerProps> = (props) => {
  return (
    <Calendar
      style={{ width: width * 0.85 }}
      maxDate={props.maxDate}
      current={props.current}
      firstDay={1}
      hideExtraDays={true}
      renderArrow={(direction: string) =>
        direction == "left" ? (
          <MaterialIcons name="arrow-back-ios" color={Colors.grey} size={18} />
        ) : (
          <MaterialIcons
            name="arrow-forward-ios"
            color={Colors.grey}
            size={18}
          />
        )
      }
      theme={{
        backgroundColor: Colors.white,
        calendarBackground: Colors.white,
        textSectionTitleColor: Colors.black,
        selectedDayTextColor: Colors.white,
        todayTextColor: Colors.black,
        dayTextColor: Colors.black,
        textDisabledColor: Colors.grey,
        textMonthFontFamily: "SemiBold",
        textDayHeaderFontFamily: "SemiBold",
        textDayFontFamily: "SemiBold",
        monthTextColor: Colors.black,
      }}
      onDayPress={props.onDayPress}
      markedDates={{
        [props.current || ""]: {
          selected: true,
          selectedColor: Colors.primary,
        },
      }}
    />
  );
};

export default StartEndCalendarPicker;
