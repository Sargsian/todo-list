import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);

export const getArrayOfDays = (currentMonth: Dayjs) => {
  const prevMonthDays = currentMonth.subtract(1, 'month').daysInMonth();
  const daysInMonth = currentMonth.daysInMonth();
  const weekdayStart = currentMonth.startOf('month').weekday();
  const weekdayEnd = currentMonth.endOf('month').weekday();

  const currMonthDaysArr = [...Array(daysInMonth)].map((_, i) => i + 1);
  const prevMonthDaysArr = [];
  const nextMonthDaysArr = [];
  for (let i = prevMonthDays - weekdayStart; i < prevMonthDays; i++) {
    prevMonthDaysArr.push(undefined);
  }
  for (let i = 0; i < 6 - weekdayEnd; i++) {
    nextMonthDaysArr.push(undefined);
  }
  const arrayOfDays = [
    ...prevMonthDaysArr,
    ...currMonthDaysArr,
    ...nextMonthDaysArr,
  ];
  return arrayOfDays;
};

export const getWeekdays = (dateObj: Dayjs) => {
  const weekdays = [...Array(7)].map((_, i) => {
    return dateObj.weekday(i).format('dd');
  });
  return weekdays;
};

export const compareDates = (date1: string, date2: string) => {
  return !dayjs(date2).isSameOrAfter(date1);
};
