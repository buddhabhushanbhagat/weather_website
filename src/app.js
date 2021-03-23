const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geoLocation.js");
const forecast = require("./utils/forecast.js");

const app = express();

const publicDirectory = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);

hbs.registerPartials(partialsDirectory);
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Buddhabhushan",
    age: 23,
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address not provided",
    });
  }

  const address = req.query.address;

  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      res.send({
        error,
      });
    } else {
      forecast(latitude, longitude, (error, { description }) => {
        if (error) {
          res.send({
            error,
          });
        } else {
          res.send({
            description,
            location,
            address,
          });
        }
      });
    }
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Bbhushan",
    age: 23,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Bbhushan",
    title: "Help",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Bbhushan",
    errorMsg: "help artical not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Bbhushan",
    errorMsg: "Invalid url or route",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
