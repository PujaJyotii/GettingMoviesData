import Card from "./Card";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";

function Backdrop(props) {
  return <div className={classes.backdrop} onClick={props.onClose} />;
}

function Overlay(props) {
  return (
    <Card className={classes.overlay}>
      <header>{props.title}</header>
      <p>{props.message}</p>
      <footer>
        <button onClick={props.onClose}>Okay!</button>
      </footer>
    </Card>
  );
}

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Overlay
          title={props.title}
          message={props.message}
          onClose={props.onClose}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
}

export default Modal;
