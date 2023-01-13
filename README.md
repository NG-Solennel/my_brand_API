# My Brand Api

## Description

This is an api that is used on personal blog portfolio which will act as an intermediary between a front end website using javascript and a mongodb database to store some of the sites data.

## Badges

### Coveralls

[![Coverage Status](https://coveralls.io/repos/github/NG-Solennel/my_brand_API/badge.svg?branch=feat-tests)](https://coveralls.io/github/NG-Solennel/my_brand_API?branch=feat-tests)

### CircleCI

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/NG-Solennel/my_brand_API/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/NG-Solennel/my_brand_API/tree/develop)

## API Reference

### API Endpoints

#### Blog

| HTTP Request | Endpoint                 | Description                         |
| :----------- | :----------------------- | :---------------------------------- |
| `GET`        | `/api/v1/blogs`          | Used to get all the blogs available |
| `POST`       | `/api/v1/blogs`          | Used to post a new blog             |
| `GET`        | `/api/v1/blogs/{blogId}` | Used to get a single blog           |
| `PUT`        | `/api/v1/blogs/{blogId}` | Used to update a blog               |
| `DELETE`     | `/api/v1/blogs/{blogId}` | Used to delete a blog               |

#### Message

| HTTP Request | Endpoint                       | Description                       |
| :----------- | :----------------------------- | :-------------------------------- |
| `GET`        | `/api/v1/messages`             | Used to get all the messages sent |
| `POST`       | `/api/v1/messages`             | Used to post a new message        |
| `GET`        | `/api/v1/messages/{messageId}` | Used to get a single blog         |
| `DELETE`     | `/api/v1/messages/{messageId}` | Used to delete a message          |

#### Users

| HTTP Request | Endpoint               | Description                       |
| :----------- | :--------------------- | :-------------------------------- |
| `GET`        | `/api/v1/users`        | Used to get all the messages sent |
| `POST`       | `/api/v1/users/signup` | Used to signup a new user         |
| `POST`       | `/api/v1/users/login`  | Used to login a new user          |

#### Admin

| HTTP Request | Endpoint               | Description                        |
| :----------- | :--------------------- | :--------------------------------- |
| `GET`        | `/api/v1/admin`        | Used to get all the administrators |
| `POST`       | `/api/v1/admin/signup` | Used to signup an admin            |

## Installation

### Clone it from git

```bash
  git clone git@github.com:NG-Solennel/my_brand_API.git
```

### Install with npm

```bash
    cd my_brand_API
    npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL_REMOTE`

`CLOUD_KEY_SECRET`

`TOK_SECRET`

`API_SERVER_URL`

`CLOUD_NAME`

`CLOUDINARY_API_KEY`

## Used Technologies

### Build With

- [NodeJs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)

### Tested With

- [Jest](https://jestjs.io/)
- [Supertest](https://www.npmjs.com/package/supertest)

### Deployed With

- [Cyclic](https://www.cyclic.sh/)
- [Render](https://render.com/)

## Author

- [Ngabo Solennel](https://github.com/NG-Solennel/)
