import fs from 'fs';
import { getCoord } from './utils/location';
import redis from 'redis';

interface StoreInfo {
  storeId: number;
}

// const client = redis.createClient({
//   url: 'http://localhost:6379',
// });

const onewayID = (hashSize: number): string => {
  return Math.random().toString(36).substr(2, hashSize);
};

fs.readFile('assets/dummy.csv', 'utf8', function (err, data) {
  if (err) {
    console.error('err', err);
  }
  let dataArray = data.split(/\r?\n/);
  dataArray.shift();
  dataArray.map(async (data) => {
    console.log('data', data);
    const lineData = data.split(',');

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

    if (!objectData.REFINE_WGS84_LOGT || !objectData.REFINE_WGS84_LAT) {
      if (!objectData.REFINE_ROADNM_ADDR) {
        // console.log(lineData[1], await getCoord(objectData.REFINE_ROADNM_ADDR));
      } else if (!objectData.REFINE_LOTNO_ADDR) {
        console.log(objectData);
      }
    }
  });
});
