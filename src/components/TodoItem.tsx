import classes from './TodoItem.module.less';
import * as dayjs from 'dayjs';
import Button from './Button';

type Props = {
  title: string;
  desc: string;
};

const TodoItem = (props: Props) => {
  const { title, desc } = props;
  const date = dayjs().format('DD/MM/YYYY');
  console.log(date);

  return (
    <div className={classes.todoItem}>
      <div className={classes.date}>
        До: <br /> {date}
      </div>
      <div className={classes.content}>
        <h1>{title}</h1>
        <h3>{desc}</h3>
      </div>
      <div className={classes.actions}>
        <span className={classes.iconActions}>
          <img src='/check.svg' alt='выполнено' />
          <img src='/attach.svg' alt='прикрепить файл' />
        </span>
        <Button>Изменить</Button>
        <Button classModifier={classes.item__actions__deleteButton}>Удалить</Button>
      </div>
    </div>
  );
};

export default TodoItem;
