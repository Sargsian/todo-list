import classes from './Button.module.less';

type Props = {
  children: string;
  classModifier?: string;
  disable?: boolean;
  onClick?: () => void;
};

const Button = (props: Props) => {
  return (
    <button
      className={`${classes.Button} ${props.classModifier}`}
      disabled={props.disable}
      style={{ pointerEvents: props.disable ? 'none' : 'auto' }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
