import { useState } from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { compareDates } from '../utils/DateUtils';
import { useMutate } from '../hooks/useMutate';
import { Todo } from '../models/types';
import dayjs from 'dayjs';
import TodoItemContent from './TodoItemContent';
import TodoItemActions from './TodoItemActions';

import classes from './TodoItem.module.less';

dayjs.extend(customParseFormat);

type Props = {
  todo: Todo;
  deleteTodoHandler: (appId: string) => void;
};

const TodoItem = (props: Props) => {
  const { todo, deleteTodoHandler } = props;
  const { deadline, isDone, isDoneLate, appId, fileRef, fileName } = todo;

  const [todoIsDone, setTodoIsDone] = useState(isDone);
  const [todoIsDoneLate, setTodoIsDoneLate] = useState(isDoneLate);
  const [editTodo, setEditTodo] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [desc, setDesc] = useState(todo.desc);
  const [handInDate, setHandInDate] = useState(todo.handInDate);

  const { mutateTodo } = useMutate();

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
      mutateTodo({ ...todo, isDone: true, handInDate }, 'PUT');
      return;
    }
    setTodoIsDoneLate(true);
    mutateTodo({ ...todo, isDoneLate: true, handInDate }, 'PUT');
  };

  const deleteTodo = async () => {
    mutateTodo(todo, 'DELETE');

    deleteTodoHandler(appId);
  };

  const editTodoHandler = () => {
    if (editTodo) {
      mutateTodo({ ...todo, title, desc }, 'PUT');
    }
    setEditTodo(!editTodo);
  };

  return (
    <>
      <div className={`${classes.TodoItem} ${itemStateClassName}`}>
        <TodoItemContent
          desc={desc}
          editTodo={editTodo}
          handInDate={handInDate}
          setDesc={setDesc}
          setTitle={setTitle}
          deadline={deadline}
          title={title}
        />
        <TodoItemActions
          deleteTodo={deleteTodo}
          editTodoHandler={editTodoHandler}
          fileName={fileName}
          fileRef={fileRef}
          finishTask={finishTask}
          isDone={todoIsDone}
          isDoneLate={todoIsDoneLate}
        />
      </div>
    </>
  );
};

export default TodoItem;
