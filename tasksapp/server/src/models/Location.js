const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const LocationSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, "Please add an address"],
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Task",
      unique: true,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
    },
  },
  {
    timestamps: true,
  }
);

LocationSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };

  //Do not save address
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Location", LocationSchema);
