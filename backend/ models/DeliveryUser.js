const mongoose = require("mongoose");

const deliveryUser = new mongoose.Schema({
  name : { type: String },
  contact: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const DeliveryUser = mongoose.model("deliveryUser", deliveryUser);
module.exports = DeliveryUser;