import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';

import colors from '@/components/ui/colors';

const { width } = Dimensions.get('window');

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

const StartEndCalendarPicker: React.FC<StartEndCalendarPickerProps> = ({
  maxDate,
  current,
  onDayPress,
}) => {
  return (
    <Calendar
      style={{ width: width * 0.85 }}
      maxDate={maxDate}
      current={current}
      firstDay={1}
      hideExtraDays={true}
      renderArrow={(direction: string) =>
        direction === 'left' ? (
          <MaterialIcons name="arrow-back-ios" color={colors.grey} size={18} />
        ) : (
          <MaterialIcons
            name="arrow-forward-ios"
            color={colors.grey}
            size={18}
          />
        )
      }
      theme={{
        backgroundColor: colors.white,
        calendarBackground: colors.white,
        textSectionTitleColor: colors.black,
        selectedDayTextColor: colors.white,
        todayTextColor: colors.black,
        dayTextColor: colors.black,
        textDisabledColor: colors.grey,
        // textMonthFontFamily: 'Inter_SemiBold', // Use system or tailwind mapped font if possible
        // textDayHeaderFontFamily: 'Inter_SemiBold',
        // textDayFontFamily: 'Inter_SemiBold',
        monthTextColor: colors.black,
        selectedDayBackgroundColor: colors.primary,
        arrowColor: colors.grey,
      }}
      onDayPress={onDayPress}
      markedDates={{
        [current || '']: {
          selected: true,
          selectedColor: colors.primary,
        },
      }}
    />
  );
};

export default StartEndCalendarPicker;
