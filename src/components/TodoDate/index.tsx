import DatePicker from './DatePicker';

type Props = {
  deadlineHandler: (deadline: string) => void;
  clearWarningsOnFocus: () => void;
  deadlineIsSet: string;
  deadLineIsEmpty: boolean;
};

const TodoDate = (props: Props) => {
  const {
    deadlineHandler,
    deadlineIsSet,
    deadLineIsEmpty,
    clearWarningsOnFocus,
  } = props;
  return (
    <DatePicker
      deadlineHandler={deadlineHandler}
      deadlineIsSet={deadlineIsSet}
      deadLineIsEmpty={deadLineIsEmpty}
      clearWarningsOnFocus={clearWarningsOnFocus}
    />
  );
};

export default TodoDate;
