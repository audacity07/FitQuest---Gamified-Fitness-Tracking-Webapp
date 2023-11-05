const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    totalXP: {
      type: Number,
      default: 0,
    },
    acceptedChallenges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "challenge",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
