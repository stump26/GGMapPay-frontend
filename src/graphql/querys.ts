import { gql } from 'apollo-boost';

export const GET_AROUND_CENTER_QUERY = gql`
  query($lat: Float!, $long: Float!) {
    getAroundStore(lat: $lat, long: $long) {
      CMPNM_NM
      TELNO
      REFINE_ROADNM_ADDR
      REFINE_LOTNO_ADDR
      REFINE_WGS84_LAT
      REFINE_WGS84_LOGT
      DATA_STD_DE
    }
  }
`;

export const GET_SEARCH_STORE_QUERY = gql`
  query($query: String!, $SIGUN_CD: Int, $page: Int) {
    getSearchStore(query: $query, SIGUN_CD: $SIGUN_CD, page: $page) {
      TOTAL_PAGE
      CUR_PAGE
      STORES {
        CMPNM_NM
        TELNO
        REFINE_ROADNM_ADDR
        REFINE_LOTNO_ADDR
        REFINE_WGS84_LAT
        REFINE_WGS84_LOGT
        DATA_STD_DE
      }
    }
  }
`;
