const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?limit=1&access_token=pk.eyJ1IjoiYnVkZGhzYmh1c2hhbiIsImEiOiJja200cWl4MGowNnlqMm5ud3RwZmZkeGhxIn0.tVjA-5dIFUTl29Gn3upmLw";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Could not Connect to API", undefined);
    } else if (body.features.length == 0) {
      callback("Location not found, try with other one", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
