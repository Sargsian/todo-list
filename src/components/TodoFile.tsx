import { ChangeEvent } from 'react';
import classes from './TodoFile.module.less';

type Props = {
  attachFileHandler: (file: File) => void;
  clearWarningsOnFocus: () => void;
  fileIsAttached: File | undefined;
  fileIsEmpty: boolean;
  fileIsLoading: boolean;
};

const TodoFile = (props: Props) => {
  const {
    attachFileHandler,
    clearWarningsOnFocus,
    fileIsAttached,
    fileIsEmpty,
    fileIsLoading,
  } = props;

  const attachFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      attachFileHandler(fileList[0]);
      e.target.value = '';
    }
  };

  return (
    <label
      htmlFor='file-upload'
      title='Прикрепить файл'
      className={`${classes.TodoForm_attachIcon} ${
        fileIsAttached !== undefined && classes.TodoForm_attachIcon___success
      } ${fileIsEmpty && classes.TodoForm_attachIcon___invalid} `}
      onClick={clearWarningsOnFocus}
    >
      <img src='./attach.svg' alt='calendar' />
      {fileIsLoading && <div className={classes.TodoItem_fileIsloading}></div>}
      <input type='file' id='file-upload' onChange={(e) => attachFile(e)} />
    </label>
  );
};

export default TodoFile;
