import React, { createContext, useState } from 'react';

const defaultContext: IModalContext = {
  modalContent: undefined,
  updateModalContent: undefined,
  isModalVisible: false,
  setModalVisible: undefined,
};

const ModalContext = createContext(defaultContext);

const ModalContextProvider: React.FC = ({ children }) => {
  const [modalContent, updateModalContent] = useState<IModal>();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <ModalContext.Provider
      value={{ modalContent, updateModalContent, isModalVisible, setModalVisible }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContextProvider, ModalContext };
