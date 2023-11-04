const express = require("express");
const { NotificationModel } = require("../model/notification.model");
const { auth } = require("../middleware/auth.middleware");

const notificationRouter = express.Router();
notificationRouter.use(auth);

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
 * /notification:
 *   description: Operations related to Notification model
 *   tags:
 *     - Notification Routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the notification.
 *         user:
 *           type: string
 *           description: The user ID associated with the notification.
 *         content:
 *           type: string
 *           description: The content of the notification.
 *         read:
 *           type: boolean
 *           description: Indicates if the notification has been read.
 *         sender:
 *           type: string
 *           description: The sender ID associated with the notification.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the notification was created.
 */

/**
 * @swagger
 * /notification:
 *   post:
 *     summary: Create a new notification
 *     description: Create a new notification with the specified user and content.
 *     tags:
 *       - Notification Routes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: The user ID associated with the notification.
 *               content:
 *                 type: string
 *                 description: The content of the notification.
 *     responses:
 *       201:
 *         description: Notification created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (success).
 *                 data:
 *                   $ref: '#/components/schemas/Notification'
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

notificationRouter.post("/", async (req, res) => {
  const { user, content } = req.body;
  try {
    // Create a new notification
    const newNotification = new NotificationModel({
      user,
      content,
      read: false,
    });
    const notification = await newNotification.save();
    res.status(201).json({
      status: "success",
      data: notification,
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
 * /notification:
 *   get:
 *     summary: Get user notifications
 *     description: Retrieve a list of notifications for the specified user.
 *     tags:
 *       - Notification Routes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully.
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
 *                     $ref: '#/components/schemas/Notification'
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

notificationRouter.get("/", async (req, res) => {
  const userID = req.user.userID;
  try {
    const notifications = await NotificationModel.find({ user: userID });
    res.status(200).json({
      status: "success",
      data: notifications,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "error",
      error: err.message,
    });
  }
});

/**
 * @swagger
 * /notification/{notificationId}:
 *   patch:
 *     summary: Mark a notification as read
 *     description: Update a notification to mark it as read by its unique identifier.
 *     tags:
 *       - Notification Routes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         description: The unique identifier of the notification to mark as read.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request (success).
 *                 data:
 *                   $ref: '#/components/schemas/Notification'
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
 *         description: Notification not found.
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
 *                   description: Error message.
 */

notificationRouter.patch("/:notificationId", async (req, res) => {
  const notificationId = req.params.notificationId;
  try {
    const notification = await NotificationModel.findByIdAndUpdate(
      { _id: notificationId },
      { read: true },
      { new: true }
    );
    if (notification) {
      res.status(200).json({
        status: "success",
        data: notification,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Notification not found.",
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
 * /notification/{notificationId}:
 *   delete:
 *     summary: Delete a notification
 *     description: Delete a notification by its unique identifier.
 *     tags:
 *       - Notification Routes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         description: The unique identifier of the notification to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Notification deleted successfully.
 *       404:
 *         description: Notification not found.
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
 *                   description: Error message.
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

notificationRouter.delete("/:notificationId", async (req, res) => {
  const notificationId = req.params.notificationId;
  try {
    const result = await NotificationModel.findByIdAndRemove({
      _id: notificationId,
    });
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).json({
        status: "fail",
        message: "Notification not found.",
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

module.exports = { notificationRouter };
