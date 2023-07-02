import CardItem from "./CardItem";

const ModalItems = ({
  type = null,
  id = "",
  title = "",
  character,
  items = [],
}) => {
  return (
    <div
      data-bs-theme="dark"
      className="modal modal-lg fade"
      id={id}
      tabIndex="-1"
      aria-labelledby={id}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={id}>
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-wrap justify-content-center gap-3 my-3">
              {!!character &&
                items &&
                items.map((item, index) => (
                  <CardItem type={type} item={item} key={index} />
                ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-warning"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalItems;
