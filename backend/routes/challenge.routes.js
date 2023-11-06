const express = require("express");
const { ChallengeModel } = require("../model/challenge.model");
const { auth } = require("../middleware/auth.middleware");
const { NotificationModel } = require("../model/notification.model");
const { UserModel } = require("../model/user.model");

const challengeRouter = express.Router();
challengeRouter.use(auth);

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
 * /challenge:
 *   description: Operations related to Challenge model
 *   tags:
 *     - Challenge Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Challenge:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the challenge.
 *         title:
 *           type: string
 *           description: The title of the challenge.
 *         creator:
 *           type: string
 *           description: The user ID of the challenge creator.
 *         participants:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of user IDs representing the participants of the challenge.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the challenge was created.
 */

/**
 * @swagger
 * /challenge:
 *   post:
 *     summary: Create a new challenge
 *     description: Create a new challenge with a title and participants.
 *     tags:
 *       - Challenge Routes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the challenge.
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of user IDs representing the participants of the challenge.
 *     responses:
 *       201:
 *         description: Challenge successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the challenge creation request (success).
 *                 data:
 *                   $ref: '#/components/schemas/Challenge'
 *       400:
 *         description: Bad request.
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

// Create a Challenge
challengeRouter.post("/", async (req, res) => {
  const creator = req.user.userID;
  const { title, participants } = req.body;
  try {
    // Create a new challenge
    const newChallenge = new ChallengeModel({ title, creator, participants });
    const challenge = await newChallenge.save();

    // push the current challenge to the creator's `acceptedChallenge` array

    await UserModel.findByIdAndUpdate(
      { _id: creator },
      { $push: { acceptedChallenges: challenge._id } },
      { new: true }
    );

    // Send notifications to invited participants
    for (const participantId of participants) {
      if (participantId !== creator) {
        const notificationContent = `${req.user.username} has invited you to join the challenge: ${title}.`;
        const newNotification = new NotificationModel({
          user: participantId,
          content: notificationContent,
          read: false,
          sender: creator,
          category: "challenge_request",
          challengeId: challenge._id,
        });
        await newNotification.save();
      }
    }

    res.status(201).json({
      status: "success",
      data: challenge,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
});

/**
 * @swagger
 * /challenge:
 *   get:
 *     summary: Get challenges created by the user
 *     description: Retrieve challenges created by the currently authenticated user.
 *     tags:
 *       - Challenge Routes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Challenges successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (success).
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Challenge'
 *       400:
 *         description: Bad request.
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

// Get Challenges by User:
challengeRouter.get("/", async (req, res) => {
  const userID = req.user.userID;
  try {
    const userData = await UserModel.findById({ _id: userID })
    .populate({
      path: "acceptedChallenges",
      populate: {
        path: "creator participants", 
      },
    })
    .exec();
    res.status(200).json({
      status: "success",
      data: userData.acceptedChallenges,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
});

/**
 * @swagger
 * /challenge/{challengeId}:
 *   patch:
 *     summary: Update challenge data
 *     description: Update the data of a specific challenge.
 *     tags:
 *       - Challenge Routes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: challengeId
 *         in: path
 *         required: true
 *         type: string
 *         description: The ID of the challenge to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the challenge.
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of user IDs representing the updated participants of the challenge.
 *     responses:
 *       200:
 *         description: Challenge data successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (success).
 *                 data:
 *                   $ref: '#/components/schemas/Challenge'
 *       400:
 *         description: Bad request.
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
 *       404:
 *         description: Challenge not found.
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
 *                   description: Error message (challenge not found).
 */

// Update Challenge Data:
challengeRouter.patch("/:challengeId", async (req, res) => {
  const challengeId = req.params.challengeId;
  const updatedData = req.body;
  try {
    const challenge = await ChallengeModel.findByIdAndUpdate(
      { _id: challengeId },
      updatedData,
      { new: true }
    );
    if (challenge) {
      res.status(200).json({
        status: "success",
        data: challenge,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Challenge not found.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
});

/**
 * @swagger
 * /challenge/{challengeId}:
 *   delete:
 *     summary: Delete a challenge
 *     description: Delete a specific challenge by its ID.
 *     tags:
 *       - Challenge Routes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: challengeId
 *         in: path
 *         required: true
 *         type: string
 *         description: The ID of the challenge to be deleted.
 *     responses:
 *       204:
 *         description: Challenge successfully deleted.
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
 *                   description: A success message (challenge deleted).
 *       404:
 *         description: Challenge not found.
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
 *                   description: Error message (challenge not found).
 *       500:
 *         description: Internal server error.
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

// Delete a Challenge
challengeRouter.delete("/:challengeId", async (req, res) => {
  const challengeId = req.params.challengeId;
  try {
    const result = await ChallengeModel.findByIdAndRemove({ _id: challengeId });
    if (result) {
      res.status(204).json({
        status: "success",
        message: "Challenge deleted.",
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Challenge not found.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
});

module.exports = { challengeRouter };
