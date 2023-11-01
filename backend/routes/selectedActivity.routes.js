const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { SelectedActivityModel } = require("../model/selectedActivity.model");

const selectedActivityRouter = express.Router();
selectedActivityRouter.use(auth);

selectedActivityRouter.post("/add", async (req, res) => {
  try {
    let selectedActivity = new SelectedActivityModel(req.body);
    await selectedActivity.save();
    res.status(200).json({ msg: "Activity added", Activity: selectedActivity });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

selectedActivityRouter.get("/", async (req, res) => {
  try {
    let selectedActivity = await SelectedActivityModel.find({
      userID: req.body.userID,
    });
    res.status(200).json({ selectedActivity });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

selectedActivityRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const selectedActivity = await SelectedActivityModel.findOne({ _id: id });
  try {
    if (req.body.userID === selectedActivity.userID) {
      await SelectedActivityModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).json({ msg: "Activity has been updated" });
    } else {
      res.status(200).send({ msg: `You are not authorised!` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

selectedActivityRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const selectedActivity = await SelectedActivityModel.findOne({ _id: id });
  try {
    if (req.body.userID === selectedActivity.userID) {
      await SelectedActivityModel.findByIdAndDelete({ _id: id });
      res.status(200).json({ msg: "Activity has been deleted" });
    } else {
      res.status(200).send({ msg: `You are not authorised!` });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

module.exports = { selectedActivityRouter };
