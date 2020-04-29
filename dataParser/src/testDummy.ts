import redis from 'redis';

const client = redis.createClient({
  url: 'redis://localhost:6379',
});

client.georadius('store', 127.054387, 37.15972047, 50, 'm', (err, store) => {
  console.log(store); // ['incheon', 'seoul']
});
