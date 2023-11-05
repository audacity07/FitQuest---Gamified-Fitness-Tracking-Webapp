const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["friend_request", "challenge_request"],
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "challenge",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const NotificationModel = mongoose.model("notification", notificationSchema);
module.exports = { NotificationModel };
