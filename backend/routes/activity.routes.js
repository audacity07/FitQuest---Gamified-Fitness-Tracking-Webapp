const express = require("express");
const { ActivityModel } = require("../model/activity.model");

const activityRouter = express.Router();

activityRouter.post("/add", async (req, res) => {
  try {
    let activity = new ActivityModel(req.body);
    await activity.save();
    res.status(200).json({ msg: "Activity added", Activity: req.body });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

activityRouter.get("/", async (req, res) => {
  try {
    let activity = await ActivityModel.find({
      name: req.body.name,
    });
    res.status(200).json({ activity });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

activityRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ActivityModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({ msg: "Activity has been updated" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

activityRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ActivityModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "Activity has been deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

module.exports = { activityRouter };
