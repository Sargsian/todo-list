import { Dayjs } from 'dayjs';
import { getWeekdays } from '../../utils/DateUtils';

import classes from './Weekdays.module.less';

type Props = {
  now: Dayjs;
};

const Weekdays = (props: Props) => {
  const { now } = props;

  return (
    <ul className={classes.DatePicker_weekdays}>
      {getWeekdays(now).map((weekday) => {
        return (
          <li key={weekday} className={classes.DatePicker_weekday}>
            {weekday}
          </li>
        );
      })}
    </ul>
  );
};

export default Weekdays;
