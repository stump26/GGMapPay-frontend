import redis from '../../redisConfig';

type COORD = {
  longitude: number;
  latitude: number;
};

export const getAround = async (coord: COORD) => {
  const result = await redis.geoRadius(
    'store',
    coord.longitude,
    coord.latitude,
    500,
    'm',
  );
  return result;
};
