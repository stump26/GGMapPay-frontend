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
