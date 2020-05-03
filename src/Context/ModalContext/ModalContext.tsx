import React, { createContext, useState } from 'react';

const defaultContext: IModalContext = {
  modal: undefined,
  setModal: undefined,
  isVisible: false,
  toggleVisible: () => {
    return;
  },
};

const ModalContext = createContext(defaultContext);

const ModalContextProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState<IModal>();
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!isVisible);
  };
  return (
    <ModalContext.Provider
      value={{ modal, setModal, isVisible, toggleVisible }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContextProvider, ModalContext };
