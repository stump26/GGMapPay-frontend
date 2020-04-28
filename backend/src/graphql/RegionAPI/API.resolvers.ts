import axios, { AxiosResponse } from 'axios';

const APIURL = 'https://openapi.gg.go.kr/RegionMnyFacltStus?Type=json';
const resolvers = {
  Query: {
    requestText: async (): Promise<Array<IStoreInfoType>> => {
      console.log('hi');
      const res: AxiosResponse<API_ResponeType> = await axios(APIURL);
      console.log('res', res.data.RegionMnyFacltStus[1]);
      return res.data.RegionMnyFacltStus[1].row;
    },
  },
};

export default resolvers;
