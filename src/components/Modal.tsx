import ReactDOM from 'react-dom';

interface Props {
  show: boolean;
  onClick: () => void;
}

const Modal = (props: Props) => {
  const backdrop = <div className='Backdrop' onClick={props.onClick}></div>;

  return (
    <>
      {ReactDOM.createPortal(
        props.show ? backdrop : null,
        document.getElementById('modal-root')!
      )}
    </>
  );
};

export default Modal;
