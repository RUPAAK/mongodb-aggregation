const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: String,
  country: String,
  continent: String,
  population: Number,
});

const Country = mongoose.model("Country", countrySchema);

module.exports= Country