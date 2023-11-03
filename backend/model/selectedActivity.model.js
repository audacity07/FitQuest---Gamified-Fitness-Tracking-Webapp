const mongoose = require("mongoose");

const selectedActivitySchema = mongoose.Schema(
  {
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "activity", // Reference to the ActivityModel
      required: true,
    },
    currentLevel: {
      type: Number,
      default: 1,
    },
    totalDays: {
      type: Number,
      default: 0,
    },
    currentXP: {
      type: Number,
      default: 0,
    },
    goalPerWeek: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const SelectedActivityModel = mongoose.model(
  "selectedactivity",
  selectedActivitySchema
);
module.exports = { SelectedActivityModel };
