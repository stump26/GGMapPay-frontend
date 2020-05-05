import './Dropdown.css';

import React, { useState } from 'react';

import { IC_RT } from '~/utils/icon';
import styled from 'styled-components';

interface Props {
  className?: string;
  text?: string;
  keyValue: { [key: string]: number };
  onOptionClick?: (e: React.MouseEvent) => void;
}
interface OptionContainerProps {
  visible: boolean;
  x: number;
  y: number;
  width: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;
const Field = styled.div`
  padding-left: 1em;
  flex-basis: 90%;
`;
const Drophandle = styled.div`
  display: flex;
  flex-basis: 10%;
  align-items: center;
`;

const DropdownhandleIC = styled(IC_RT)`
  width: 24px;
  stroke: #929292;
`;
const OptionContainer = styled.div<OptionContainerProps>`
  display: flex;
  flex-direction: column;
  background: #fff;
  max-height: 300px;
  overflow: auto;
  position: absolute;
  direction: rtl;
  text-align: left;
  ${(props) => ({
    display: props.visible ? 'flex' : 'none',
    left: props.x,
    top: props.y,
    width: props.width,
  })}
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c2174f;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  &::-webkit-scrollbar-button:start:decrement,
  ::-webkit-scrollbar-button:end:increment {
    display: none;
  }

  & > option {
    margin: 10px 0;
    padding-left: 0.5em;
  }
`;

const Dropdown: React.FC<Props> = ({ className, text, keyValue, onOptionClick }) => {
  const [optionVisible, setOptionVisible] = useState(false);
  const [optPosX, setOptPosX] = useState(0);
  const [optPosY, setOptPosY] = useState(0);
  const [optWidth, setWidth] = useState(108);

  const dropdownHandler = (e: React.MouseEvent) => {
    const element = document.getElementById('dropdown-container');
    const elementOffset = element?.getBoundingClientRect();
    if (elementOffset) {
      setOptPosY(elementOffset.bottom);
      setOptPosX(elementOffset.left);
      setOptionVisible(!optionVisible);
      setWidth(elementOffset.width);
    }
  };
  return (
    <Container id="dropdown-container" className={className} onClick={dropdownHandler}>
      <Field>{text ? text : '선택'}</Field>
      <Drophandle>
        <DropdownhandleIC className={`handlerAni ${optionVisible ? 'active-rotation' : ''}`} />
      </Drophandle>
      <OptionContainer visible={optionVisible} x={optPosX} y={optPosY} width={optWidth}>
        {keyValue &&
          Object.keys(keyValue).map((key) => (
            <option key={keyValue[key]} value={keyValue[key]} onClick={onOptionClick}>
              {key}
            </option>
          ))}
      </OptionContainer>
    </Container>
  );
};

export default Dropdown;
