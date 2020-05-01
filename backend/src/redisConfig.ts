import { REDIS_URI } from './env';
import Redis from 'redis';

class RedisClient {
  client: Redis.RedisClient | null = null;

  connect() {
    this.client = Redis.createClient({
      url: REDIS_URI || 'redis://localhost:6379',
    });
  }

  geoRadius(
    key: string,
    long: number,
    lat: number,
    radius: number,
    unit: 'km' | 'm' | 'mi' | 'ft',
  ): Promise<(string | [string, string | [string, string]])[]> {
    if (!this.client) {
      this.connect();
    }
    return new Promise((resolve, reject) => {
      this.client!.georadius(key, long, lat, radius, unit, (err, cache) => {
        if (err) {
          reject(err);
        }
        resolve(cache);
      });
    });
  }

  remove(...keys: string[]) {
    if (!this.client) {
      this.connect();
    }
    return this.client!.del(...keys);
  }

  async disconnect() {
    if (this.client) {
      await this.client.quit();
      this.client = null;
      return;
    }
    return Promise.resolve();
  }
}

const client = new RedisClient();

export default client;
