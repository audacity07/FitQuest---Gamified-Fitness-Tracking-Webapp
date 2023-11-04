const express = require("express");
const { FriendModel } = require("../model/friend.model");
const { auth } = require("../middleware/auth.middleware");
const { NotificationModel } = require("../model/notification.model");

const friendRouter = express.Router();
friendRouter.use(auth);

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
 * /friend:
 *   description: Operations related to Friend model
 *   tags:
 *     - Friend Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Friend:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the friend relationship.
 *         user:
 *           type: string
 *           description: The user ID of one of the friends in the relationship.
 *         friend:
 *           type: string
 *           description: The user ID of the other friend in the relationship.
 *         isFollowing:
 *           type: boolean
 *         isFollower:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the friend relationship was created.
 */

/**
 * @swagger
 * /friend/follow:
 *   post:
 *     summary: Follow a user
 *     description: Create a new friend relationship where the user follows another user.
 *     tags:
 *       - Friend Routes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friendId:
 *                 type: string
 *                 description: The user ID of the friend to follow.
 *     responses:
 *       201:
 *         description: Friend relationship successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (success).
 *                 data:
 *                   $ref: '#/components/schemas/Friend'
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
 *                 message:
 *                   type: string
 *                   description: Error message (friend relationship already exists).
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

// Follow Another User
friendRouter.post("/follow", async (req, res) => {
  const userID = req.user.userID;
  const { friendId } = req.body;
  try {
    // Check if the friend relationship already exists
    const existingFriendship = await FriendModel.findOne({
      user: userID,
      friend: friendId,
    });
    if (existingFriendship) {
      return res.status(400).json({
        status: "fail",
        message: "Friend relationship already exists.",
      });
    }

    // create new friendship
    const newFriendship = new FriendModel({
      user: userID,
      friend: friendId,
      isFollowing: true,
      isFollower: false,
    });
    const friendship = await newFriendship.save();

    // Check if the other user is not following back
    const otherUserFriendship = await FriendModel.findOne({
      user: friendId, // User who was followed
      friend: userID, // User who initiated the follow
      isFollower: false,
    });

    if (!otherUserFriendship) {
      // Create a notification for the other user
      const notificationContent = `${req.user.username} is following you!`;
      const newNotification = new NotificationModel({
        user: friendId,
        content: notificationContent,
        sender: userID,
        read: false,
      });

      await newNotification.save();
    }

    // add data for that other guy as well.
    const newFriendship2 = new FriendModel({
      user: friendId,
      friend: userID,
      isFollowing: false,
      isFollower: false,
    });
    await newFriendship2.save();

    res.status(201).json({
      status: "success",
      data: friendship,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      error: err.message,
    });
  }
});

/**
 * @swagger
 * /friend/follow/:
 *   patch:
 *     summary: Update friend data
 *     description: Update the friend relationship.
 *     tags:
 *       - Friend Routes
 *     parameters:
 *       - in: path
 *         name: friendshipId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the friend relationship.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Friend relationship successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (success).
 *                 data:
 *                   $ref: '#/components/schemas/Friend'
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
 *         description: Friend relationship not found.
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
 *                   description: Error message (friendship not found).
 */

// patch a User
friendRouter.patch("/follow/:friendshipId", async (req, res) => {
  const userID = req.user.userID;
  const friendshipId = req.params.friendshipId;
  try {
    const friendship = await FriendModel.findByIdAndUpdate(
      { _id: friendshipId },
      { isFollowing: false },
      { new: true }
    );
    if (friendship) {
      res.status(200).json({
        status: "success",
        data: friendship,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Friendship not found.",
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
 * /friend/following:
 *   get:
 *     summary: Get friends being followed
 *     description: Retrieve a list of friends that the user is following.
 *     tags:
 *       - Friend Routes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Friends being followed retrieved successfully.
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
 *                     $ref: '#/components/schemas/Friend'
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

// Read a User's Friends
friendRouter.get("/following", async (req, res) => {
  const userID = req.user.userID;
  try {
    const friends = await FriendModel.find({ user: userID, isFollowing: true })
      .populate("user")
      .populate("friend")
      .exec();
    res.status(200).json({
      status: "success",
      data: friends,
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
 * /friend/unfollow/{friendshipId}:
 *   delete:
 *     summary: Delete a friend relationship
 *     description: Delete a friend relationship based on the unique identifier.
 *     tags:
 *       - Friend Routes
 *     parameters:
 *       - in: path
 *         name: friendshipId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique identifier of the friend relationship to delete.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Friend relationship successfully deleted.
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
 *         description: Friend relationship not found.
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
 *                   description: Error message (friendship not found).
 */

// Delete a Friend Relationship
friendRouter.delete("/unfollow/:friendshipId", async (req, res) => {
  const friendshipId = req.params.friendshipId;
  try {
    const result = await FriendModel.findByIdAndRemove({ _id: friendshipId });
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({
        status: "fail",
        message: "Friendship not found.",
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

module.exports = { friendRouter };
