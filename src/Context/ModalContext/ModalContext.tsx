import React, { createContext, useState } from 'react';

import { useBetterCallback } from '~/utils/Hooks';

const defaultContext: IModalContext = {
  modalContent: undefined,
  updateModalContent: undefined,
  isVisible: false,
  toggleVisible: () => {
    return;
  },
};

const ModalContext = createContext(defaultContext);

const ModalContextProvider: React.FC = ({ children }) => {
  const [modalContent, updateModalContent] = useState<IModal>();
  const [isVisible, setVisible] = useState(false);

  const toggleVisible = useBetterCallback(
    ([isVisible]: any) => {
      setVisible(!isVisible);
    },
    [isVisible],
  );
  return (
    <ModalContext.Provider value={{ modalContent, updateModalContent, isVisible, toggleVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContextProvider, ModalContext };
