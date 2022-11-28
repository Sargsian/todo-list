import { Dayjs } from 'dayjs';

import classes from './Header.module.less';

type Props = {
  prevMonth: () => void;
  nextMonth: () => void;
  currentMonth: Dayjs;
};

const Header = (props: Props) => {
  const { prevMonth, nextMonth, currentMonth } = props;
  const dateFormat = 'MMM YYYY';

  return (
    <div className={classes.DatePicker_header}>
      <img src='/rightArrow.svg' alt='previous month' onClick={prevMonth} />
      <div className={classes.DatePicker_currDate}>
        {currentMonth.format(dateFormat)}
      </div>
      <img src='/rightArrow.svg' alt='next month' onClick={nextMonth} />
    </div>
  );
};

export default Header;
