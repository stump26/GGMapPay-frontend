import React from 'react';
import styled from 'styled-components';

interface Props {
  StoreID: string;
  StoreName: string;
  addr: string;
  jibun: string;
}

const CardContainer = styled.div`
  position: absolute;
  width: 288px;
  height: 132px;
  background: #fff;
`;
const CardTitle = styled.div`
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
`;
const CardBody = styled.div`
  position: relative;
  overflow: hidden;
`;
const CardDesc = styled.div`
  display: flex;
  height: 75px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:nth-child(1) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:nth-child(2) {
    font-size: 11px;
    color: #888;
    margin-top: -2px;
  }
`;
const StoreCard: React.FC<Props> = ({ StoreID, StoreName, addr, jibun }) => {
  return (
    <CardContainer id={`storecard_${StoreID}`}>
      <CardTitle>{StoreName}</CardTitle>
      <CardBody>
        <CardDesc>
          <div>{addr}</div>
          <div>{jibun}</div>
        </CardDesc>
      </CardBody>
    </CardContainer>
  );
};

export default StoreCard;
