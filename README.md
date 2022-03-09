# Hacker News Search App

Learn the basics of caching in Node.js by using Redis to cache API responses from Algolia's Hacker News API.

**Full tutorial**: [How to Set Up Redis for Caching in Node.js](https://betterstack.com/community/guides/scaling-nodejs/nodejs-caching-redis/).

![Hacker News Search Application](screenshot.png)

## 🟢 Prerequisites

You must have Node.js, npm, and Redis installed on your machine. This project was built against the following versions:

- Node.js v16.14.0.
- npm v8.3.1.
- Redis v6.2.6

## 📦 Getting started

- Clone this repo to your machine

```shell
git clone https://github.com/betterstack-community/hacker-news-redis
```

- `cd` into the project folder and run `npm install` to download dependencies.
- Ensure the Redis server is up and running:
```
systemctl status redis
```
- Execute the command below to start the development server:

```shell
npm run dev
```

- Visit http://localhost:3000 in your browser.

## ⚖ License

The code used in this project and in the linked tutorial are licensed under the [Apache License, Version 2.0](LICENSE).
