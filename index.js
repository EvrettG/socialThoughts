const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// this is to be worked on and experimented with later
// const cwd = process.cwd();
// const activity = cwd.includes('01-Activities')
//   ? cwd.split('01-Activities')[1]
//   : cwd;

const PORT = 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
