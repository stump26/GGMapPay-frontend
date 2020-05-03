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
  min-width: 600px;
  min-height: 60vh;
  margin: auto;
  background: #f7f7f7;
  border-radius: 10px;
  cursor: default;
`;

const Modal: React.FC = () => {
  const { toggleVisible, isVisible, modal } = useContext(ModalContext);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: MouseEvent) {
        if (event.target === ref.current) {
          toggleVisible();
        }
      }

      // Bind the event listener
      document.addEventListener('click', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('click', handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <ModalContainer visible={isVisible} ref={wrapperRef}>
      <ModalBox>{modal}</ModalBox>
    </ModalContainer>
  );
};

export default Modal;
