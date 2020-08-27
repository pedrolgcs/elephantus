import app from './app';

const port = process.env.PORT || 3334;

app.listen(port, () =>
  console.log(
    `🚀 => server running in: ${process.env.APP_API_URL}:${process.env.PORT}`,
  ),
);
