const mongoose = require("mongoose");

const selectedActivitySchema = mongoose.Schema(
  {
    name: String,
    currentLevel: Number,
    totalDays: Number,
    currentXP: Number,
    goalPerWeek: Number,
    date: Number,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const SelectedActivityModel = mongoose.model(
  "selectedActivity",
  selectedActivitySchema
);
module.exports = { SelectedActivityModel };
