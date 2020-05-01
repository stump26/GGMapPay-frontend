import { getAround } from '../../lib/RedisAPI/redis';

type GET_AROUND_VALUES = {
  long: number;
  lat: number;
};
const APIURL = 'https://openapi.gg.go.kr/RegionMnyFacltStus?Type=json';
const resolvers = {
  Query: {
    getAroundStore: async (_: any, { long, lat }: GET_AROUND_VALUES) => {
      const aroundInfo: any = await getAround({
        longitude: long,
        latitude: lat,
      });

      const objAroundInfo = aroundInfo.reduce(
        (acc: Array<IStoreInfoType>, cur: string) => {
          const objCur = JSON.parse(cur);
          return [...acc, objCur];
        },
        [],
      );
      return objAroundInfo;
    },
  },
};

export default resolvers;
