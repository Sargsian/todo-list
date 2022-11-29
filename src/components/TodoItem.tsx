import Button from './Button';
import { ChangeEvent, useState } from 'react';
import { compareDates } from '../utils/DateUtils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Todo } from '../models/types';
import { useMutate } from '../hooks/useMutate';

import classes from './TodoItem.module.less';

dayjs.extend(customParseFormat);

type Props = {
  todo: Todo;
  deleteTodoHandler: (appId: string) => void;
};

const TodoItem = (props: Props) => {
  const {
    todo: { deadline, isDone, isDoneLate, appId, fileRef, fileName },
    deleteTodoHandler,
  } = props;
  const [todoIsDone, setTodoIsDone] = useState(isDone);
  const [todoIsDoneLate, setTodoIsDoneLate] = useState(isDoneLate);
  const [editTodo, setEditTodo] = useState(false);
  const [title, setTitle] = useState(props.todo.title);
  const [desc, setDesc] = useState(props.todo.desc);
  const [handInDate, setHandInDate] = useState(props.todo.handInDate);

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const changeDescHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const { mutateTodo } = useMutate();

  const splitDeadline = deadline.split(' ');
  const date = splitDeadline[0];
  const time = splitDeadline[1];

  const formattedDate = dayjs(date).format('DD/MM/YYYY');

  const now = dayjs().format('YYYY/MM/DD HH:mm');

  const itemStateClassName = todoIsDone
    ? classes.TodoItem___isDone
    : todoIsDoneLate
    ? classes.TodoItem___isDoneLate
    : compareDates(now, deadline)
    ? classes.TodoItem___expired
    : null;

  const finishTask = () => {
    if (todoIsDone || todoIsDoneLate) return;
    const handInDate = dayjs().format('HH:mm DD/MM/YYYY');
    setHandInDate(handInDate);
    if (compareDates(deadline, now)) {
      setTodoIsDone(true);
      mutateTodo({ ...props.todo, isDone: true, handInDate }, 'PUT');
      return;
    }
    setTodoIsDoneLate(true);
    mutateTodo({ ...props.todo, isDoneLate: true, handInDate }, 'PUT');
  };

  const deleteTodo = async () => {
    mutateTodo(props.todo, 'DELETE');

    deleteTodoHandler(appId);
  };

  const editTodoHandler = () => {
    if (editTodo) {
      mutateTodo({ ...props.todo, title, desc }, 'PUT');
    }
    setEditTodo(!editTodo);
  };

  return (
    <>
      <div className={`${classes.TodoItem} ${itemStateClassName}`}>
        <div className={classes.TodoItem_date}>
          <span>
            До: {time} <br /> {formattedDate}
          </span>
          {handInDate && (
            <span>
              Выполнено: <br /> {handInDate.split(' ')[0]}
              <br />
              {handInDate.split(' ')[1]}
            </span>
          )}
        </div>
        <div className={classes.Todo_content}>
          {editTodo ? (
            <>
              <input type='text' value={title} onChange={changeTitleHandler} />
              <input type='text' value={desc} onChange={changeDescHandler} />
            </>
          ) : (
            <>
              <h1>{title}</h1>
              <h3>{desc}</h3>
            </>
          )}
        </div>
        <div className={classes.Todo_actions}>
          <span className={classes.Todo_iconActions}>
            <a href={fileRef} download={fileName} target='blank' title={`скачать ${fileName}`}>
              <img src='/attach.svg' alt='файл' />
            </a>
            <button
              onClick={finishTask}
              style={{ pointerEvents: isDone || isDoneLate ? 'none' : 'auto' }}
              disabled={isDone || isDoneLate}
            >
              <img src='/check.svg' alt='выполнено' title='Выполнено!'/>
            </button>
          </span>
          <Button onClick={editTodoHandler} disable={isDone || isDoneLate}>
            Изменить
          </Button>
          <Button
            classModifier={classes.Todo___deleteButton}
            onClick={deleteTodo}
          >
            Удалить
          </Button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
