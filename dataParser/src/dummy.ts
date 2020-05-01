import fs from 'fs';
import { getCoord } from './utils/location';
import redis from 'redis';

interface StoreInfo {
  storeId: number;
}

const client = redis.createClient({
  url: 'http://localhost:6379',
});

const onewayID = (hashSize: number): string => {
  return Math.random().toString(36).substr(2, hashSize);
};

const setRedis = (objectData: any) => {
  client.geoadd(
    'store',
    objectData.REFINE_WGS84_LOGT,
    objectData.REFINE_WGS84_LAT,
    JSON.stringify(objectData),
  );
};

fs.readFile('assets/data.csv', 'utf8', function (err, data) {
  if (err) {
    console.error('err', err);
  }
  let dataArray = data.split(/\r?\n/);
  dataArray.shift();
  dataArray.map(async (data) => {
    const lineData = data
      .split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/)
      .map((a) => a.replace(/"|'/, ''));

    const objectData = {
      SIGUN_NM: lineData[0],
      CMPNM_NM: lineData[1],
      INDUTYPE_NM: lineData[2],
      REFINE_ROADNM_ADDR: lineData[3],
      REFINE_LOTNO_ADDR: lineData[4],
      TELNO: lineData[5],
      REFINE_ZIP_CD: lineData[6],
      REFINE_WGS84_LAT: lineData[7],
      REFINE_WGS84_LOGT: lineData[8],
      DATA_STD_DE: lineData[9],
    };

    let coord;
    if (!objectData.REFINE_WGS84_LOGT || !objectData.REFINE_WGS84_LAT) {
      if (objectData.REFINE_ROADNM_ADDR) {
        coord = await getCoord(objectData.REFINE_ROADNM_ADDR);
      } else if (objectData.REFINE_LOTNO_ADDR) {
        coord = await getCoord(objectData.REFINE_LOTNO_ADDR);
      }
      if (coord) {
        objectData.REFINE_WGS84_LOGT = coord.longitude.toString();
        objectData.REFINE_WGS84_LAT = coord.latitude.toString();

        setRedis(objectData);
      }
    } else {
      setRedis(objectData);
    }
  });
  console.log('jobend');
  return;
});
