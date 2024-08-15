const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: Number },
  sex: { type: String },
  age: { type: Number, required: true },
  weight: { type: String, required: true },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
