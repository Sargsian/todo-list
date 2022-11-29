import { RefObject } from 'react';

import classes from './TodoInput.module.less';

type Props = {
  valueIsEmpty: boolean;
  clearWarningsOnFocus: () => void;
  elementRef: RefObject<HTMLInputElement>;
  title: string;
  htmlFor: string;
  maxLength: number;
};

const TodoInput = (props: Props) => {
  const { valueIsEmpty, clearWarningsOnFocus, elementRef, title, htmlFor, maxLength } = props;

  return (
    <div className={classes.TodoForm_field}>
      <label htmlFor={htmlFor}>{title}</label>
      <input
        type='text'
        maxLength={maxLength}
        id={htmlFor}
        className={`${classes.TodoForm_input} ${
          valueIsEmpty && classes.TodoForm_input___invalid
        }`}
        ref={elementRef}
        onFocus={clearWarningsOnFocus}
      />
    </div>
  );
};

export default TodoInput;
