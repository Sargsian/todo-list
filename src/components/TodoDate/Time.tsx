import { ChangeEvent, useState } from 'react';

import classes from './Time.module.less';

type Props = {
  goBack: () => void;
  closeCalendar: () => void;
  deadlineHandler: (deadline: string) => void;
  date: string;
};

const Time = (props: Props) => {
  const [hour, setHour] = useState('23');
  const [minutes, setMinutes] = useState('59');

  const { goBack, closeCalendar, deadlineHandler, date } = props;

  const hourHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let inputNumber = e.target.value.substring(0, 2);
    setHour(inputNumber);
  };

  const minutesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let inputNumber = e.target.value.substring(0, 2);
    setMinutes(inputNumber);
  };

  const onTimeHandler = () => {
    const deadline = `${date} ${hour}:${minutes}`;
    deadlineHandler(deadline);
    closeCalendar();
    goBack();
  };

  return (
    <div className={classes.DatePicker_time}>
      <img
        src='./backArrow.svg'
        alt='go back'
        className={classes.DatePicker_backArrow}
        onClick={goBack}
      />
      <div className={classes.DataPicker_inputs}>
        <input
          type='text'
          value={hour}
          max={23}
          min={0}
          onChange={hourHandler}
        />
        <span>:</span>
        <input
          type='number'
          value={minutes}
          max={59}
          onChange={minutesHandler}
        />
      </div>
      <img
        src='./check.svg'
        alt='done'
        className={classes.DatePicker_confirm}
        onClick={onTimeHandler}
      />
    </div>
  );
};

export default Time;
