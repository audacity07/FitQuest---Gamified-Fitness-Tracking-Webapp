const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ChallengeModel = mongoose.model("challenge", challengeSchema);
module.exports = { ChallengeModel };
