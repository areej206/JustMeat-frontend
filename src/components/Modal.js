const Modal = ({ show, onCloseButtonClick, message }) => {
    if (!show) {
      return null;
    }
  
    return (
      <div className="modal-wrapper">
           
        <div className="modal-main">
          <div className="body">
            {message}
          </div>
          <div className="footer">
            <button onClick={onCloseButtonClick}>X</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;