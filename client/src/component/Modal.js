import React from 'react'

function Modal({children, close}) {
  return (
    <div className ="overlay">
        <button id="close-btn" onClick={close}> close</button>
      {children}
    </div>
  )
}

export default Modal
