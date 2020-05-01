import { PORT } from './env';
import app from './app';

const opts = {
  port: PORT,
};

app.listen(opts, () => {
  console.log(`✅  Listening on: http://localhost:${opts.port}`);
  console.log(
    `🚀Graphql Server Running at http://localhost:${opts.port}/graphql`,
  );
});
