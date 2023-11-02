const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { ActivityModel } = require("../model/activity.model");

const activityRouter = express.Router();

/**
 * @swagger
 * /activity/add:
 *   post:
 *     summary: Add a new activity
 *     description: Create a new activity record.
 *     tags:
 *       - Activity Routes
 */

/**
 * @swagger
 * /activity/add:
 *   post:
 *     summary: Add a new activity
 *     description: Create a new activity record.
 *     tags:
 *       - Activity Routes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       201:
 *         description: Activity added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (success).
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 data:
 *                   type: object
 *                   properties:
 *                     Activity:
 *                       $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Bad request. Error in request data or validation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (fail).
 *                 error:
 *                   type: string
 *                   description: Error message.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the activity.
 *         emoji:
 *           type: string
 *           description: An emoji representing the activity.
 */
activityRouter.post("/add", async (req, res) => {
  try {
    let activity = new ActivityModel(req.body);
    await activity.save();
    res.status(201).json({
      status: "success",
      message: "Activity added",
      data: { Activity: req.body },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

/**
 * @swagger
 * /activity:
 *   get:
 *     summary: Get activities
 *     description: Retrieve a list of activities.
 *     tags:
 *       - Activity Routes
 *     responses:
 *       200:
 *         description: List of activities retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (success).
 *                 data:
 *                   type: object
 *                   properties:
 *                     activities:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Bad request. Error in fetching activities.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (fail).
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
activityRouter.get("/", async (req, res) => {
  try {
    let activities = await ActivityModel.find({});
    res.status(200).json({ status: "success", data: { activities } });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

/**
 * @swagger
 * /activity/update/{id}:
 *   patch:
 *     summary: Update an activity
 *     description: Update the details of an existing activity by its ID.
 *     tags:
 *       - Activity Routes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the activity to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: Activity has been updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (success).
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Bad request. Error in request data or validation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (fail).
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
activityRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ActivityModel.findByIdAndUpdate({ _id: id }, req.body);
    res
      .status(200)
      .json({ status: "success", message: "Activity has been updated" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

/**
 * @swagger
 * /activity/delete/{id}:
 *   delete:
 *     summary: Delete an activity
 *     description: Delete an activity by its ID.
 *     tags:
 *       - Activity Routes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the activity to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activity has been deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (success).
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Bad request. Error in request data or validation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (fail).
 *                 error:
 *                   type: string
 *                   description: Error message.
 */
activityRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ActivityModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ status: "success", message: "Activity has been deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

module.exports = { activityRouter };
