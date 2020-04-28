import dotenv from 'dotenv';

dotenv.config();

export const DORO_API = process.env.DORO_API;
export const COORD_API = process.env.COORD_API;

export default [DORO_API, COORD_API];
