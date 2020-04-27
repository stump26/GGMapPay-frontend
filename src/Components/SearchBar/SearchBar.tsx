import React from 'react';
import styled from 'styled-components';
import { IC_SEARCH } from '~/utils/icon';

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
  flex-basis: 13%;
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

const SearchBar = () => {
  return (
    <Container>
      <SearchField />
      <SearchButton>
        <SearchIcon />
      </SearchButton>
    </Container>
  );
};

export default SearchBar;
