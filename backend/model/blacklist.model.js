const mongoose = require("mongoose");

const blackListSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const BlackListModel = mongoose.model("blacklist", blackListSchema);
module.exports = { BlackListModel };
