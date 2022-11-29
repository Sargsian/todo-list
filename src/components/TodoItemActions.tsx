import Button from './Button';

import classes from './TodoItemActions.module.less';

type Props = {
  fileRef: string | undefined;
  fileName: string;
  finishTask: () => void;
  isDone: boolean;
  isDoneLate: boolean;
  editTodoHandler: () => void;
  deleteTodo: () => void;
};

const TodoItemActions = (props: Props) => {
  const {
    deleteTodo,
    editTodoHandler,
    fileName,
    fileRef,
    finishTask,
    isDone,
    isDoneLate,
  } = props;

  return (
    <div className={classes.Todo_actions}>
      <span className={classes.Todo_iconActions}>
        <a
          href={fileRef}
          download={fileName}
          target='blank'
          title={`скачать ${fileName}`}
        >
          <img src='/attach.svg' alt='файл' />
        </a>
        <button
          onClick={finishTask}
          style={{ pointerEvents: isDone || isDoneLate ? 'none' : 'auto' }}
          disabled={isDone || isDoneLate}
        >
          <img src='/check.svg' alt='выполнено' title='Выполнено!' />
        </button>
      </span>
      <Button onClick={editTodoHandler} disable={isDone || isDoneLate}>
        Изменить
      </Button>
      <Button classModifier={classes.Todo___deleteButton} onClick={deleteTodo}>
        Удалить
      </Button>
    </div>
  );
};

export default TodoItemActions;
