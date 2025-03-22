import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose, open }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = open ? (
    <>
      <div
        className="fixed top-0 left-0 h-screen w-screen z-100 bg-[#00000080]"
        onClick={onClose}
      ></div>
      <div className="fixed top-1/2 left-1/2 z-1000 transform -translate-x-1/2 -translate-y-1/2 animate-[slide_300ms_ease-out]">
        {children}
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
