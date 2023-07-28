import {
  DANGER,
  INFO,
  PRIMARY,
  SUCCESS,
  WARNING,
} from "../../helper/constants";

const ToastMessage = ({ message = "", type = SUCCESS, refToast }) => {
  return (
    <div
      ref={refToast}
      className={`toast-container moveAndFadeOut ${
        type === SUCCESS
          ? "toast-" + SUCCESS
          : type === PRIMARY
          ? "toast-" + PRIMARY
          : type === DANGER
          ? "toast-" + DANGER
          : type === WARNING
          ? "toast-" + WARNING
          : type === INFO
          ? "toast-" + INFO
          : "toast-" + INFO
      }`}
    >
      <span>{message}</span>
    </div>
  );
};

export default ToastMessage;
