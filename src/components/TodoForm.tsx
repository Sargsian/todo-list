import Button from './Button';
import { FormEvent, useRef } from 'react';
import { Todo } from '../models/types';
import TodoDate from './TodoDate';

import classes from './TodoForm.module.less';

type Props = {
  addTodo: (todo: Todo) => void;
};

const TodoForm = (props: Props) => {
  const addTodoHandler = (e: FormEvent) => {
    e.preventDefault();
    const title = titleRef.current;
    const desc = descRef.current;
    if (!title?.value || !desc?.value) return;
    const date = new Date();
    props.addTodo({ title: title.value, desc: desc.value });
    title.value = '';
    desc.value = '';
  };

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  return (
    <form className={classes.todoForm} onSubmit={addTodoHandler}>
      <div className={classes.todoForm__input}>
        <label htmlFor='title'>Название</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className={classes.todoForm__input}>
        <label htmlFor='desc'>Описание</label>
        <input type='text' id='desc' ref={descRef} />
      </div>
      {/* <TodoDate /> */}
      <Button classModifier={classes.todoForm__button}>Создать todo</Button>
    </form>
  );
};

export default TodoForm;
