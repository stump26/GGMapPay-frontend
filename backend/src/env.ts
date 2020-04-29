import dotenv from 'dotenv';

dotenv.config();

export const REDIS_URI = process.env.REDIS_URI;

export default [REDIS_URI];
