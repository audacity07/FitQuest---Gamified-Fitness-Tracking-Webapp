const mongoose = require("mongoose");

const friendSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    friend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isFollowing: {
      type: Boolean,
      default: false,
    },
    isFollower: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const FriendModel = mongoose.model("friend", friendSchema);
module.exports = { FriendModel };
