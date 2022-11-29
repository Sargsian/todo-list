import { useState } from 'react';
import dayjs from 'dayjs';
import locale from 'dayjs/locale/ru';
import weekdayPlugin from 'dayjs/plugin/weekday';
import Days from './Days';
import Weekdays from './Weekdays';
import Header from './Header';
import Time from './Time';
import Modal from '../Modal';

import classes from './DatePicker.module.less';

dayjs.extend(weekdayPlugin);

/**
 * Calendar component to select a deadline
 * @type {string}
 */

type Props = {
  deadlineHandler: (deadline: string) => void;
  clearWarningsOnFocus: () => void;
  deadlineIsSet: string;
  deadLineIsEmpty: boolean;
};

const DatePicker = (props: Props) => {
  const now = dayjs().locale({ ...locale });

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [date, setDate] = useState('');

  const [month, setMonth] = useState(now.month());

  const currentMonth = now.month(month);

  const {
    deadlineHandler,
    deadlineIsSet,
    deadLineIsEmpty,
    clearWarningsOnFocus,
  } = props;

  const pickDayHandler = (day: number | undefined) => {
    if (!day) return;
    setShowTime(true);
    setDate(currentMonth.date(day).format('YYYY/MM/DD'));
  };

  const nextMonth = () => {
    setMonth(month + 1);
  };

  const prevMonth = () => {
    setMonth(month - 1);
  };

  const showCalendarHandler = () => {
    setShowCalendar(!showCalendar);
    if (deadLineIsEmpty) {
      clearWarningsOnFocus();
    }
  };

  return (
    <div className={classes.DatePicker}>
      <img
        src='./calendar.svg'
        alt='calendar'
        title='Назначить дедлайн'
        className={`${classes.DatePicker_calIcon} ${
          deadlineIsSet && classes.DatePicker_calIcon___success
        } ${deadLineIsEmpty && classes.DatePicker_calIcon___invalid}`}
        onClick={showCalendarHandler}
      />
      {showCalendar && (
        <>
          <div className={classes.DatePicker_calendar}>
            <Header
              currentMonth={currentMonth}
              nextMonth={nextMonth}
              prevMonth={prevMonth}
            />
            <div
              className={`${classes.DatePicker_content} ${
                showTime && classes.DatePicker_content___showTime
              }`}
            >
              <div className={classes.DatePicker_days}>
                <Weekdays now={now} />
                <Days currentMonth={currentMonth} dayHandler={pickDayHandler} />
              </div>
              <Time
                goBack={() => setShowTime(false)}
                date={date}
                deadlineHandler={deadlineHandler}
                closeCalendar={() => setShowCalendar(false)}
              />
            </div>
          </div>
          <Modal onClick={() => setShowCalendar(false)} show={showCalendar} />
        </>
      )}
    </div>
  );
};

export default DatePicker;
