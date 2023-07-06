# web-service-news-aggregator-api

In this project, we successfully developed a robust RESTful API using Node.js, Express.js, and various NPM packages. The API provides essential functionality for user registration, login, and customization of news preferences, including categories. Moreover, we integrated external news APIs, specifically GNews API, to fetch news articles from diverse sources. The implementation includes an efficient asynchronous processing and filtering mechanism, ensuring that the fetched articles align with each user's unique preferences. As a result, users can enjoy a tailored news experience that caters to their specific interests and choices.

## Author

- [@divyanshu](https://github.com/divyu-s)

## How to run

Clone the project

```bash
  git clone https://github.com/divyu-s/web-service-news-aggregator-api.git
```

Go to the project directory

```bash
  cd web-service-news-aggregator-api
```

Install dependencies

```bash
  npm install
```

Start the server for development mode

```bash
  npm start
```

It will start a server for development use with url http://localhost:3000/.

## API Reference

##### Register a user

```http
   POST /register
```

| Body       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `name`     | `string` | **Required**. name of user     |
| `email`    | `string` | **Required**. email of user    |
| `password` | `string` | **Required**. password of user |

##### Login a user

```http
   POST /login
```

| Body       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `email`    | `string` | **Required**. email of user    |
| `password` | `string` | **Required**. password of user |

##### Get news by users preference

```http
  GET /news
```

| Headers         | Type           | Description                            |
| :-------------- | :------------- | :------------------------------------- |
| `Authorization` | `JWT ${token}` | **Required**. JWT authentication token |

##### Get the users preferences

```http
  GET /preferences
```

| Header          | Type           | Description                            |
| :-------------- | :------------- | :------------------------------------- |
| `Authorization` | `JWT ${token}` | **Required**. JWT authentication token |

##### set the users news preferences

```http
  PUT /preferences
```

| Header          | Type           | Description                            |
| :-------------- | :------------- | :------------------------------------- |
| `Authorization` | `JWT ${token}` | **Required**. JWT authentication token |

| Body         | Type    | Description                    |
| :----------- | :------ | :----------------------------- |
| `categories` | `array` | **Required**. Users preference |
