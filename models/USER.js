const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: { type: String },
  lastname: { type: String },
  phonenumber: { type: String },
  create_timestamp: { type: Date },
  update_timestamp: { type: Date }
}, {
  versionKey: false
});

model = mongoose.model("user", schema, "USER");
module.exports = model;