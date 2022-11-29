import { FormEvent, useRef, useState } from 'react';
import Button from './Button';
import { Todo } from '../models/types';
import TodoDate from './TodoDate';
import TodoInput from './TodoInput';
import TodoFile from './TodoFile';
import { storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';

import classes from './TodoForm.module.less';

type Props = {
  addTodo: (todo: Todo) => void;
  refetch: () => void;
};

const TodoForm = (props: Props) => {
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState<File>();
  const [titleIsEmpty, setTitleIsEmpty] = useState(false);
  const [descIsEmpty, setDescIsEmpty] = useState(false);
  const [deadlineIsEmpty, setDeadlineIsEmpty] = useState(false);
  const [fileListIsEmpty, setFileListIsEmpty] = useState(false);
  const [fileIsLoading, setFileIsLoading] = useState(false);

  const { addTodo, refetch } = props;

  const addTodoHandler = (e: FormEvent) => {
    e.preventDefault();
    const title = titleRef.current;
    const desc = descRef.current;

    if (!title?.value) setTitleIsEmpty(true);
    if (!desc?.value) setDescIsEmpty(true);
    if (!deadline) setDeadlineIsEmpty(true);
    if (!file) setFileListIsEmpty(true);

    if (!title?.value || !desc?.value || !deadline || !file) return;
    
    const appId = Date.now().toString();
    addTodo({
      title: title.value,
      desc: desc.value,
      deadline,
      isDone: false,
      isDoneLate: false,
      appId: appId,
      fileName: file.name,
    });
    
    const fileRef = ref(storage, `${appId}-${file.name}`);
    setFileIsLoading(true);
    uploadBytes(fileRef, file).then(() => {
      setFileIsLoading(false);
      refetch();
    });

    title.value = '';
    desc.value = '';
    setDeadline('');
    setFile(undefined);
  };

  const clearWarningsOnFocus = () => {
    setTitleIsEmpty(false);
    setDescIsEmpty(false);
    setDeadlineIsEmpty(false);
    setFileListIsEmpty(false);
  };

  const attachFileHandler = (file: File) => {
    setFile(file);
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
          fileIsAttached={file}
          fileIsEmpty={fileListIsEmpty}
          fileIsLoading={fileIsLoading}
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
