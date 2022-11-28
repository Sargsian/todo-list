import dayjs, { Dayjs } from 'dayjs';
import { compareDates, getArrayOfDays } from '../../utils/DateUtils';

import classes from './Days.module.less';

type Props = {
  currentMonth: Dayjs;
  dayHandler: (day: number | undefined) => void;
};

const Days = (props: Props) => {
  const { currentMonth, dayHandler } = props;

  const calculateDay = (day: number) => {
    const now = dayjs().format('YYYY-MM-DD HH:mm');
    const calendarDate = currentMonth
      .date(day)
      .format('YYYY-MM-DD HH:mm');
    return compareDates(now, calendarDate);
  };

  return (
    <>
      <ul className={classes.DatePicker_days}>
        {getArrayOfDays(currentMonth).map((day, i) => {
          return (
            <li
              key={i}
              className={`${classes.DatePicker_day} ${
                (!day || (day && calculateDay(day))) &&
                classes.DatePicker___dayDisabled
              }`}
              onClick={() => dayHandler(day)}
            >
              {day}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Days;
