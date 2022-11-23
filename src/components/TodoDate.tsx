import { useState } from 'react';
import classes from './TodoDate.module.less';

const TodoDate = () => {
  const [date, setDate] = useState('');


  return (
    <div className={classes.todoDate}>
    <div className={classes.todoDate__month}>November
    {/* <div className={}></div> */}
    </div>
    <div className={classes.months}></div>
    </div>
  );
};

export default TodoDate;
