import React, { useContext, useState } from 'react';

import Dropdown from '~/Components/Dropdown';
import { GET_SEARCH_STORE_QUERY } from '~/graphql/querys';
import { IC_SEARCH } from '~/utils/icon';
import { LoadingContext } from '~/Context/LoadingContext';
import { ModalContext } from '~/Context/ModalContext';
import SearchReasult from '~/Components/SearchReasult';
import { onewayID } from '~/utils/hashid';
import styled from 'styled-components';
import { useBetterCallback } from '~/utils/Hooks';
import { useLazyQuery } from '@apollo/react-hooks';

interface FetchMoreOptions {
  updateQuery: (
    previousQueryResult: {
      [key: string]: any;
    },
    options: {
      fetchMoreResult?: {
        [key: string]: any;
      };
      variables: {
        [key: string]: any;
      };
    },
  ) => Object;
}

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
  const [searchQuery, setSearchQuery] = useState<string>();
  const [curpage, setCurPage] = useState<number>();
  const [maxpage, setMaxPage] = useState<number>();
  const { setModalVisible, updateModalContent } = useContext(ModalContext);
  const { setLoadingVisible } = useContext(LoadingContext);

  const SearchQueryHandler = async (data: any) => {
    setCurPage(data.getSearchStore.CUR_PAGE);
    setMaxPage(data.getSearchStore.TOTAL_PAGE);
    const transformed = await data.getSearchStore.STORES.reduce((acc: Array<IMarker>, cur: any) => {
      const newobj: IMarker = {
        MarkerID: onewayID(7),
        StoreName: cur.CMPNM_NM,
        addr: cur.REFINE_ROADNM_ADDR,
        jibun: cur.REFINE_LOTNO_ADDR,
        telno: cur.TELNO,
        latlng: {
          latitude: cur.REFINE_WGS84_LAT,
          longitude: cur.REFINE_WGS84_LOGT,
        },
      };
      return [...acc, newobj];
    }, []);
    updateModalContent(<SearchReasult datas={transformed} onClickNextPrev={pageHandler} />);
    setModalVisible && setModalVisible(true);
    setLoadingVisible(false);
  };

  const [searchStore, { fetchMore }] = useLazyQuery(GET_SEARCH_STORE_QUERY, {
    onCompleted: SearchQueryHandler,
  });

  const pageHandler = useBetterCallback(
    (method: string, [curpage, maxpage, fetchMore]: any) => {
      if (method === '<') {
        if (curpage && curpage !== 1) {
          fetchMore({
            variables: { page: curpage - 1 },
            updateQuery: (prev: any, { fetchMoreResult }: any) => {
              if (!fetchMoreResult) return prev;

              SearchQueryHandler(fetchMoreResult);
            },
          });
        }
      } else if (method === '>') {
        if (curpage && curpage !== maxpage) {
          fetchMore({
            variables: { page: curpage + 1 },
            updateQuery: (prev: any, { fetchMoreResult }: any) => {
              if (!fetchMoreResult) return prev;

              SearchQueryHandler(fetchMoreResult);
            },
          });
        }
      }
    },
    [curpage, maxpage, fetchMore],
  );

  const handleOptionClick = (e: React.MouseEvent) => {
    setSigun((e.target as HTMLOptionElement).text);
    setSigunCode((e.target as HTMLOptionElement).value);
  };

  const handleSearchClick = (e: React.MouseEvent) => {
    setLoadingVisible(true);
    searchStore({
      variables: { query: searchQuery, SIGUN_CD: sigunCode ? parseInt(sigunCode) : undefined },
    });
  };
  const handleSearchFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Container>
      <SIGUNDropdown keyValue={SIGUNCODE} text={sigun} onOptionClick={handleOptionClick} />
      <SearchField onChange={handleSearchFieldChange} />
      <SearchButton onClick={handleSearchClick}>
        <SearchIcon />
      </SearchButton>
    </Container>
  );
};

export default SearchBar;
