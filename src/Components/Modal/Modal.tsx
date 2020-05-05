import React, { useContext, useEffect, useRef } from 'react';

import { ModalContext } from '~/Context/ModalContext';
import styled from 'styled-components';

type ModalContainerProps = {
  visible: boolean;
};

const ModalContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: ${(props: ModalContainerProps) => (props.visible ? 'flex' : 'none')};
  top: 0;
  background-color: #02010ebd;
  z-index: 5;
  cursor: pointer;
`;

const ModalBox = styled.div`
  position: relative;
  min-width: 600px;
  min-height: 30vh;
  max-height: 70vh;
  overflow: auto;
  margin: auto;
  background: #f7f7f7;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  cursor: default;

  & > .head {
    height: 20px;
    background: #aaa;
  }
`;

const Modal: React.FC = () => {
  const { setModalVisible, isModalVisible, modalContent } = useContext(ModalContext);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
      // clicked on outside of element
      function handleClickOutside(event: MouseEvent) {
        if (event.target === ref.current) {
          setModalVisible && setModalVisible(false);
        }
      }
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <ModalContainer visible={isModalVisible} ref={wrapperRef}>
      <ModalBox>{modalContent}</ModalBox>
    </ModalContainer>
  );
};

export default Modal;
