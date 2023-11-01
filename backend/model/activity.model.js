const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
  {
    name: String,
    emoji: String,
  },
  {
    versionKey: false,
  }
);

const ActivityModel = mongoose.model("Activity", activitySchema);
module.exports = { ActivityModel };
