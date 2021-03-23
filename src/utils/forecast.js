const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=4c9e4c6391a68e5617d6e1a64b1fbbbe&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Could not connect to forcast API", undefined);
    } else if (body.error) {
      callback("Coordinates not found, try with other one", undefined);
    } else {
      callback(undefined, {
        description:
          body.current.weather_descriptions[0] +
          ". Current temprature is " +
          body.current.temperature +
          " degress, It feels like " +
          body.current.feelslike +
          " degress" +
          ". The Humidity is  " +
          body.current.humidity +
          "%",
      });
    }
  });
};

module.exports = forecast;
