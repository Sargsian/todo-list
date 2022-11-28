import { ChangeEvent } from 'react';
import classes from './TodoFile.module.less';

type Props = {
  attachFileHandler: (file: FileList) => void;
  clearWarningsOnFocus: () => void;
  fileListIsAttached: number | undefined;
  fileListIsEmpty: boolean;
};

const TodoFile = (props: Props) => {
  const {
    attachFileHandler,
    clearWarningsOnFocus,
    fileListIsAttached,
    fileListIsEmpty,
  } = props;

  const attachFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      attachFileHandler(fileList);
    }
  };

  console.log(fileListIsAttached, 'file is attached')

  return (
    <label
      htmlFor='file-upload'
      className={`${classes.TodoForm_attachIcon} ${
        fileListIsAttached && classes.TodoForm_attachIcon___success
      } ${fileListIsEmpty && classes.TodoForm_attachIcon___invalid}`}
      onClick={clearWarningsOnFocus}
    >
      <img src='./attach.svg' alt='calendar' />
      <input
        type='file'
        multiple={true}
        id='file-upload'
        onChange={(e) => attachFile(e)}
      />
    </label>
  );
};

export default TodoFile;
