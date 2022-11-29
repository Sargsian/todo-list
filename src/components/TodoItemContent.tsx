import dayjs from 'dayjs';

import classes from './TodoItemContent.module.less';

type Props = {
  deadline: string;
  handInDate: string | undefined;
  editTodo: boolean;
  setTitle: (title: string) => void;
  setDesc: (desc: string) => void;
  title: string;
  desc: string;
};

const TodoItemContent = (props: Props) => {
  const { desc, editTodo, handInDate, setDesc, setTitle, deadline, title } =
    props;

  const splitDeadline = deadline.split(' ');
  const date = splitDeadline[0];
  const time = splitDeadline[1];

  const formattedDate = dayjs(date).format('DD/MM/YYYY');

  return (
    <>
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
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type='text'
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </>
        ) : (
          <>
            <h1>{title}</h1>
            <h3>{desc}</h3>
          </>
        )}
      </div>
    </>
  );
};

export default TodoItemContent;
