import express from 'express';
import routes from './routes/index';
import file from './file';

const app: express.Application = express();
const port = 3000;

app.use(routes);

// Start server
app.listen(port, async (): Promise<void> => {
  await file.generateThumbPath();

  const url = 'http://localhost:' + port;
  console.log(
    'Please follow the url: ' + url + ' to open project in browser :)'
  );
});

export default app;
