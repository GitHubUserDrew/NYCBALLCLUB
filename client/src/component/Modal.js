import React from 'react';

function Modal({ children, close }) {
  return (
    <div className="overlay">
      <button id="close-btn" onClick={close}>Close</button>
      {children}
    </div>
  );
}

export default Modal;

