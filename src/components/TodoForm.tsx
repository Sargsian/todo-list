import Button from './Button';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Todo } from '../models/types';
import TodoDate from './TodoDate';
import TodoInput from './TodoInput';

import classes from './TodoForm.module.less';
import TodoFile from './TodoFile';

type Props = {
  addTodo: (todo: Todo) => void;
};

const TodoForm = (props: Props) => {
  const [deadline, setDeadline] = useState('');
  const [fileList, setFileList] = useState<FileList>();
  const [titleIsEmpty, setTitleIsEmpty] = useState(false);
  const [descIsEmpty, setDescIsEmpty] = useState(false);
  const [deadlineIsEmpty, setDeadlineIsEmpty] = useState(false);
  const [fileListIsEmpty, setFileListIsEmpty] = useState(false);

  const { addTodo } = props;

  const addTodoHandler = (e: FormEvent) => {
    e.preventDefault();
    const title = titleRef.current;
    const desc = descRef.current;

    if (!title?.value) {
      setTitleIsEmpty(true);
    }
    if (!desc?.value) {
      setDescIsEmpty(true);
    }

    if (!deadline) {
      setDeadlineIsEmpty(true);
    }

    if (!fileList?.length) {
      setFileListIsEmpty(true);
    }

    if (!title?.value || !desc?.value || !deadline || !fileList?.length) return;

    addTodo({
      title: title.value,
      desc: desc.value,
      deadline,
      isDone: false,
      isDoneLate: false,
      appId: Date.now().toString(),
    });
    title.value = '';
    desc.value = '';
    setDeadline('');
    setFileList(undefined);
  };

  const clearWarningsOnFocus = () => {
    setTitleIsEmpty(false);
    setDescIsEmpty(false);
    setDeadlineIsEmpty(false);
    setFileListIsEmpty(false);
  };

  const attachFileHandler = (fileList: FileList) => {
    console.log(fileList);
    setFileList(fileList);
  };

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  return (
    <form className={classes.TodoForm} onSubmit={addTodoHandler}>
      <span className={classes.TodoForm_iconWrapper}>
        
        <TodoDate
          deadlineHandler={setDeadline}
          deadlineIsSet={deadline}
          deadLineIsEmpty={deadlineIsEmpty}
          clearWarningsOnFocus={clearWarningsOnFocus}
        />
        <TodoFile
          attachFileHandler={attachFileHandler}
          clearWarningsOnFocus={clearWarningsOnFocus}
          fileListIsAttached={fileList?.length}
          fileListIsEmpty={fileListIsEmpty}
        />
      </span>
      <TodoInput
        clearWarningsOnFocus={clearWarningsOnFocus}
        valueIsEmpty={titleIsEmpty}
        elementRef={titleRef}
        title={'Название'}
        htmlFor={'title'}
        maxLength={433}
      />
      <TodoInput
        clearWarningsOnFocus={clearWarningsOnFocus}
        valueIsEmpty={descIsEmpty}
        elementRef={descRef}
        title={'Описание'}
        htmlFor={'desc'}
        maxLength={455}
      />
      <Button classModifier={classes.TodoForm___formButton}>
        Создать todo
      </Button>
    </form>
  );
};

export default TodoForm;
