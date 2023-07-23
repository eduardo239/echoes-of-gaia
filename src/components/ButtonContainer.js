const ButtonContainer = ({ children }) => {
  return (
    <div className="d-flex justify-content-center gap-1 mt-3 p-3 bg-light border-bottom-light ">
      {children}
    </div>
  );
};

export default ButtonContainer;
