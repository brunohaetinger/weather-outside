# Weather Outside

Weather Outside displays 5 days weather forecast for Munich. It get information from OpenWeatherMap API.
As the API has a diferent origin from this application, we are using a CORS Proxy backend to succefully fetch the API.

The proxy is only allowed to handle requests from the hosted Weather Outside application. If you want to use this application locally, run this project aside: https://github.com/Rob--W/cors-anywhere

## Live application

To see use the live application, go to: [Weather Outside at brunohaetinger.com/](https://weather-outside.brunohaetinger.com/)

## Run locally

1. Clone the cors proxy server https://github.com/Rob--W/cors-anywhere
2. Inside `cors-anywhere` folder, install it's dependencies with `yarn` or `npm i` command
3. Run the server with `node server.js`
4. Clone this repo (Weather Outside) and install dependencies (`yarn` or `npm i` command).
5. Run the project with `yarn start` or `npm run start` command.
