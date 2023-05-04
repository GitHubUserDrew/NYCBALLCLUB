import React from 'react'

function Modal({children, close}) {
  return (
    <div className ="overlay">
        <button onClick={close}> close</button>
      {children}
    </div>
  )
}

export default Modal
