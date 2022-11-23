import classes from './Button.module.less';

type Props = {
  children: string;
  classModifier?: string;
};

const Button: React.FC<Props> = (props) => {
  return (
    <button className={`${classes.button} ${props.classModifier}`}>
      {props.children}
    </button>
  );
};

export default Button;
