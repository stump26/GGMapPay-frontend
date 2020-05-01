import { APIGatewayProxyHandler } from 'aws-lambda';
import app from './app';
import redis from './redisConfig';
import serverless from 'serverless-http';

const serverlessApp = serverless(app);

export const handler: APIGatewayProxyHandler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = true;

  const response = await serverlessApp(event, context);

  // disconnect db & redis
  try {
    await Promise.all([redis.disconnect()]);
  } catch (e) {}

  return response;
};
