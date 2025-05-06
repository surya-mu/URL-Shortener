const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originUrl: {
      type: String,
      required: true,
    },
    newUrl: {
      type: String,
      required: true,
      unique: true,
      default: "hello",
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    userid: {
      // added this to schema just now
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const urlModel = mongoose.model("URL", urlSchema);

module.exports = urlModel;
