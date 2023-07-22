import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";

const ToastMessage = ({
  message = "Message",
  title = "Title",
  show,
  setShow,
}) => {
  return (
    <ToastContainer
      className="p-3"
      position="bottom-center"
      style={{ zIndex: 1 }}
    >
      <Toast onClose={() => setShow(false)} show={show} delay={1200} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{title}</strong>
          {/* <small>11 mins ago</small> */}
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
