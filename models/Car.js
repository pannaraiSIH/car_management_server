const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    licensePlate: String,
    brand: String,
    model: String,
    remark: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);
