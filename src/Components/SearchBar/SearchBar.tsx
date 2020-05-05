import React, { useState } from 'react';

import Dropdown from '~/Components/Dropdown';
import { IC_SEARCH } from '~/utils/icon';
import styled from 'styled-components';

const Container = styled.div`
  width: 37vw;
  height: 50px;
  display: flex;
  flex-direction: row;
  margin: 10px;
  box-shadow: #7d7d7d 3px 4px 10px 3px;
`;

const SearchField = styled.input.attrs({
  type: 'text',
})`
  flex: 1;
  font-size: 1.1em;
  font-weight: bold;
  padding: 0 1em;
  border: none;

  &:focus {
    border: 2px solid #cf313a;
    outline: 2px solid #cf313a;
  }
`;

const SearchButton = styled.button`
  color: #fff;
  border: none;
  background-color: #c2174f;
  margin-right: 0;
  flex-basis: 100px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  border-collapse: collapse;

  &:active {
    background-color: #842746;
  }
`;

const SearchIcon = styled(IC_SEARCH)`
  margin: auto;
  width: 24px;
  height: 24px;
  fill: #fff;
`;

const SIGUNDropdown = styled(Dropdown)`
  width: 120px;
  background: #fff;
  padding-left: 0.5em;
`;

const SIGUNCODE = {
  가평군: 41820,
  경기도: 41000,
  고양시: 41280,
  과천시: 41290,
  광명시: 41210,
  광주시: 41610,
  구리시: 41310,
  군포시: 41410,
  김포시: 41570,
  남양주시: 41360,
  동두천시: 41250,
  부천시: 41190,
  성남시: 41130,
  수원시: 41110,
  시흥시: 41390,
  안산시: 41270,
  안성시: 41550,
  안양시: 41170,
  양주시: 41630,
  양평군: 41830,
  여주시: 41670,
  연천군: 41800,
  오산시: 41370,
  용인시: 41460,
  의왕시: 41430,
  의정부시: 41150,
  이천시: 41500,
  파주시: 41480,
  평택시: 41220,
  포천시: 41650,
  하남시: 41450,
  화성시: 41590,
};

const SearchBar = () => {
  const [sigun, setSigun] = useState<string>();
  const [sigunCode, setSigunCode] = useState<string>();

  const handleOptionClick = (e: React.MouseEvent) => {
    console.log((e.target as HTMLOptionElement).text);
    setSigun((e.target as HTMLOptionElement).text);
    setSigunCode((e.target as HTMLOptionElement).value);
  };
  return (
    <Container>
      <SIGUNDropdown keyValue={SIGUNCODE} text={sigun} onOptionClick={handleOptionClick} />
      <SearchField />
      <SearchButton>
        <SearchIcon />
      </SearchButton>
    </Container>
  );
};

export default SearchBar;
