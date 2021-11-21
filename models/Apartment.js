const mongoose = require("mongoose");

const ApartmentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    price: {
      type: Number,
    },
    size: {
      type: Number,
    },
    type: {
      type: String,
    },
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    garage: {
      type: Number,
    },
    location: {
      type: String,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    userId: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { timestamps: true }
);

ApartmentSchema.index({ "$**": "text" });
module.exports = mongoose.model("Apartment", ApartmentSchema);
