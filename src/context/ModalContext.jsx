import React, { createContext, useContext, useState } from 'react'

const ModalContext = createContext(null)

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null) // null | 'waitlist' | 'positions'

  return (
    <ModalContext.Provider value={{
      modal,
      openWaitlist: () => setModal('waitlist'),
      openPositions: () => setModal('positions'),
      closeModal: () => setModal(null),
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
