import redis from 'redis';

type COORD = {
  longitude: number;
  latitude: number;
};

// conn Redis.
const client = redis.createClient({
  url: 'redis://localhost:6379',
});

export const getAround = async (coord: COORD) => {
  return new Promise((resolve, reject) => {
    client.georadius(
      'store',
      coord.longitude,
      coord.latitude,
      500,
      'm',
      (err, store) => {
        if (err) {
          reject(err);
        }
        resolve(store);
      },
    );
  });
};
