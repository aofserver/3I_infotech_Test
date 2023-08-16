const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  phonenumber: { type: String },
  ref_code: { type: String },
  create_timestamp: { type: Date },
  update_timestamp: { type: Date }
}, {
  versionKey: false
});

model = mongoose.model("otp", schema, "OTP");
module.exports = model;