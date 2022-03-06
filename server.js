const express = require('express');
const path = require('path');
const axios = require('axios');
const redis = require('redis');

const redisClient = redis.createClient(process.env.REDIS_PORT || 6379);

(async () => {
  redisClient.on('error', (err) => {
    console.log('Redis Client Error', err);
    process.exit(1);
  });
  redisClient.on('ready', () => console.log('Redis is ready'));

  await redisClient.connect();

  await redisClient.ping();
})();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');

app.locals.dateFns = require('date-fns');

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Search Hacker News',
  });
});

async function searchHN(query) {
  const response = await axios.get(
    `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=90`
  );
  return response.data;
}

app.get('/search', async (req, res, next) => {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      res.redirect(302, '/');
      return;
    }

    let results = null;

    const key = 'search:' + searchQuery.toLowerCase();

    const value = await redisClient.get(key);
    if (value) {
      results = JSON.parse(value);
      console.log('Cache hit for', key);
    } else {
      console.log('Cache miss for', key);
      results = await searchHN(searchQuery);
      redisClient.setEx(key, 300, JSON.stringify(results));
    }

    res.render('search', {
      title: `Search results for: ${searchQuery}`,
      searchResults: results,
      searchQuery,
    });
  } catch (err) {
    next(err);
  }
});

app.use(function (err, req, res, next) {
  console.error(err);
  res.set('Content-Type', 'text/html');
  res.status(500).send('<h1>Internal Server Error</h1>');
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Hacker news server started on port: ${server.address().port}`);
});
