import React from "react";

const Modal = () => {
  return (
    <>
      <div classNameName="modal" onClick={() => setOpen(false)}>
        <div style={modalStyle}>
          <h3>Modal</h3>
          <button onClick={() => setIsOpen(false)}>Close</button>
          <p>Modal content</p>
        </div>
      </div>
    </>
  );
};

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#FFF",
  borderRadius: "24px",
  boxShadow: 24,
  padding: "10px",
  textAlign: "center",
};
export default Modal;
