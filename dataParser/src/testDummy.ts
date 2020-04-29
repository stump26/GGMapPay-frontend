import redis from 'redis';

const client = redis.createClient({
  url: 'redis://localhost:6379',
});

client.georadius('store', 127.059413, 37.15096, 1, 'km', (err, store) => {
  console.log(store); // ['incheon', 'seoul']
});
