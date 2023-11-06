const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { SelectedActivityModel } = require("../model/selectedActivity.model");

const selectedActivityRouter = express.Router();
selectedActivityRouter.use(auth);

/**
 * @swagger
 * securityDefinitions:
 *   bearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 * /selectedactivity:
 *   description: Operations related to Selected Activity model
 *   tags:
 *     - Selected Activity Routes
 */

/**
 * @swagger
 * /selectedactivity/add:
 *   post:
 *     summary: Add a new selected activity
 *     description: Create a new selected activity record.
 *     tags:
 *       - Selected Activity Routes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SelectedActivity'
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
 *                       $ref: '#/components/schemas/SelectedActivity'
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
 *     SelectedActivity:
 *       type: object
 *       properties:
 *         activity:
 *           type: string
 *           description: The ID of the activity associated with the selected activity.
 *         currentLevel:
 *           type: number
 *           description: The current level of the selected activity.
 *         totalDays:
 *           type: number
 *           description: The total number of days for the selected activity.
 *         currentXP:
 *           type: number
 *           description: The current XP (experience points) for the selected activity.
 *         goalPerWeek:
 *           type: number
 *           description: The goal per week for the selected activity.
 *         date:
 *           type: string
 *           format: date
 *           description: The date for the selected activity.
 *         user:
 *           type: string
 *           description: The ID of the user associated with the selected activity.
 */
selectedActivityRouter.post("/add", async (req, res) => {
  req.body.user = req.user.userID;
  // console.log(req.body);
  try {
    // // Check if required fields are present in the request body
    // if (
    //   !req.body.activity ||
    //   !req.body.currentLevel ||
    //   !req.body.totalDays ||
    //   !req.body.currentXP ||
    //   !req.body.goalPerWeek ||
    //   !req.body.date ||
    //   !req.body.user
    // ) {
    //   return res.status(400).json({
    //     status: "fail",
    //     message: "Required fields are missing.",
    //   });
    // }

    let selectedActivity = new SelectedActivityModel(req.body);
    await selectedActivity.save();
    res.status(201).json({
      status: "success",
      message: "Activity added",
      data: { Activity: selectedActivity },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

/**
 * @swagger
 * /selectedactivity:
 *   get:
 *     summary: Get selected activities
 *     description: Retrieve a list of selected activities for the current user.
 *     tags:
 *       - Selected Activity Routes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of selected activities retrieved successfully.
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
 *                     selectedActivities:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/SelectedActivity'
 *       400:
 *         description: Bad request. Error in fetching selected activities.
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
selectedActivityRouter.get("/", async (req, res) => {
  try {
    let selectedActivities = await SelectedActivityModel.find({
      user: req.user.userID,
    })
      .populate("activity")
      .populate("user")
      .exec();

    res.status(200).json({ status: "success", data: { selectedActivities } });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

/**
 * @swagger
 * /selectedactivity/update/{id}:
 *   patch:
 *     summary: Update a selected activity
 *     description: Update the details of a selected activity.
 *     tags:
 *       - Selected Activity Routes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the selected activity to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SelectedActivity'
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
 *       403:
 *         description: Forbidden. User is not authorized to update this activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (fail).
 *                 message:
 *                   type: string
 *                   description: Error message (user not authorized).
 *       404:
 *         description: Not Found. Activity not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (fail).
 *                 message:
 *                   type: string
 *                   description: Error message (activity not found).
 */
selectedActivityRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const selectedActivity = await SelectedActivityModel.findOne({
      _id: id,
      user: req.user.userID,
    });
    if (!selectedActivity) {
      return res.status(404).json({
        status: "fail",
        message: "Activity not found",
      });
    }

    // // Check if the user is authorized to update the activity
    // console.log(req.user.userID, selectedActivity.user);
    if (req.user.userID !== selectedActivity.user.toString()) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to update this activity.",
      });
    }

    // Check if at least one field to update is provided in the request body
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        status: "fail",
        message: "No fields to update provided in the request body.",
      });
    }

    // Update the selected activity
    await SelectedActivityModel.findByIdAndUpdate({ _id: id }, req.body);
    let selectedActivities = await SelectedActivityModel.find({
      user: req.user.userID,
    })
      .populate("activity")
      .exec();
    res.status(200).json({
      status: "success",
      message: "Activity has been updated",
      data:selectedActivities
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

/**
 * @swagger
 * /selectedactivity/delete/{id}:
 *   delete:
 *     summary: Delete a selected activity
 *     description: Delete a selected activity by its ID.
 *     tags:
 *       - Selected Activity Routes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the selected activity to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
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
 *       403:
 *         description: Forbidden. User is not authorized to delete this activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (fail).
 *                 message:
 *                   type: string
 *                   description: Error message (user not authorized).
 *       404:
 *         description: Not Found. Activity not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (fail).
 *                 message:
 *                   type: string
 *                   description: Error message (activity not found).
 */
selectedActivityRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const selectedActivity = await SelectedActivityModel.findOne({ _id: id });
    if (!selectedActivity) {
      return res.status(404).json({
        status: "fail",
        message: "Activity not found",
      });
    }

    // Check if the user is authorized to delete the activity
    if (req.user.userID !== selectedActivity.user.toString()) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to delete this activity.",
      });
    }

    // Delete the selected activity
    await SelectedActivityModel.findByIdAndDelete({ _id: id });
    res.status(204).json({
      status: "success",
      message: "Activity has been deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

module.exports = { selectedActivityRouter };
