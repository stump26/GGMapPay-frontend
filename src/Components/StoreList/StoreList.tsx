import React from 'react';
import styled from 'styled-components';

interface StoreListProps {
  title: string;
  datas: Array<IMarker>;
}
interface StoreItemProps {
  data: IMarker;
}

const ListHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  padding-top: 10px;
  text-align: center;
  align-self: center;
`;

const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px 20px;
  border-top: 1px solid #b8b8b8;
  border-bottom: 1px solid #b8b8b8;

  & > .store-title {
    font-weight: bold;
  }
  & > .store-addr,
  & > .store-jibun {
    color: #929292;
  }
  & > .store-telno {
    color: #f40808;
  }
`;

export const StoreItem: React.FC<StoreItemProps> = ({ data }) => {
  return (
    <ItemBody>
      <div className="store-title">{data.StoreName}</div>
      <div className="store-addr">{data.addr}</div>
      <div className="store-jibun">{data.jibun}</div>
      <div className="store-telno">{data.telno}</div>
    </ItemBody>
  );
};

export const StoreList: React.FC<StoreListProps> = ({ title, datas }) => {
  return (
    <>
      <ListHeader>{title}</ListHeader>
      {datas.map((data) => (
        <StoreItem key={data.MarkerID} data={data} />
      ))}
    </>
  );
};
