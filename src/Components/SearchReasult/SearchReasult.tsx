import React, { useEffect, useMemo, useRef, useState } from 'react';

import { StoreItem } from '~/Components/StoreList';
import styled from 'styled-components';

interface Props {
  datas: Array<IMarker>;
  onClickNextPrev?: (page: string) => void;
}

const ListHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  padding-top: 10px;
  text-align: center;
  align-self: center;
`;

const PageNationContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px auto;
  justify-content: center;
  align-items: center;
  height: 52px;

  > * {
    height: 35px;
    width: 22px;
    text-align: center;
    line-height: 35px;
    border: 1px solid #f40808;
    border-left: none;
    padding: 0 5px;
    color: #f40808;
    cursor: pointer;
  }
  > :nth-child(1) {
    border-left: 1px solid #f40808;
    border-radius: 4px 0 0 4px;
  }
  > :nth-last-child(1) {
    border-radius: 0 4px 4px 0;
  }
`;

const SearchReasult: React.FC<Props> = ({ datas, onClickNextPrev }) => {
  const [buttonItems, setButtonItems] = useState<string[]>();
  const [sectionNum, changeSectionNum] = useState<number>(0);
  const PagenationRef = useRef<HTMLDivElement>(null);

  const sectionLength = Math.floor(datas.length / 20);
  const divData = useMemo<Array<IMarker>>(
    () => datas.slice(20 * sectionNum, 20 * (sectionNum + 1)),
    [datas, sectionNum],
  );

  const pagenationHandler = (page: string) => {
    if (isNaN(parseInt(page))) {
      onClickNextPrev && onClickNextPrev(page);
    } else {
      changeSectionNum(parseInt(page));
    }
  };

  useEffect(() => {
    const buttonText = ['<'];
    for (let i = 0; i < sectionLength; i++) {
      buttonText.push(i.toString());
    }
    buttonText.push('>');
    setButtonItems(buttonText);
  }, [sectionLength]);

  return (
    <>
      <ListHeader>Search Result</ListHeader>
      {divData.map((data) => (
        <StoreItem key={data.MarkerID} data={data} />
      ))}
      <PageNationContainer ref={PagenationRef}>
        {buttonItems?.map((i: string) => (
          <span
            key={i}
            onClick={() => {
              pagenationHandler(i);
            }}
          >
            {isNaN(parseInt(i)) ? i : parseInt(i) + 1}
          </span>
        ))}
      </PageNationContainer>
    </>
  );
};

export default SearchReasult;
