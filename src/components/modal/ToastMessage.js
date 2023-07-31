import {
  DANGER,
  INFO,
  PRIMARY,
  SUCCESS,
  WARNING,
} from "../../helper/constants";

const ToastMessage = ({ toast, refAppToast }) => {
  return (
    <div
      ref={refAppToast}
      style={{ display: toast.show ? "block" : "none" }}
      className={`app-toast-container moveAndFadeOut ${
        toast.type === SUCCESS
          ? "app-toast-" + SUCCESS
          : toast.type === PRIMARY
          ? "app-toast-" + PRIMARY
          : toast.type === DANGER
          ? "app-toast-" + DANGER
          : toast.type === WARNING
          ? "app-toast-" + WARNING
          : toast.type === INFO
          ? "app-toast-" + INFO
          : "app-toast-" + INFO
      }`}
    >
      <span>{toast.message}</span>
    </div>
  );
};

export default ToastMessage;
