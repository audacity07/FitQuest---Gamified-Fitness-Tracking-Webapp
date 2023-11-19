const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blacklist.model");
const { auth } = require("../middleware/auth.middleware");
const { NotificationModel } = require("../model/notification.model");

const userRouter = express.Router();

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
 * /user:
 *   description: Operations related to User model
 *   tags:
 *     - User Routes
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a unique username and email.
 *     tags:
 *       - User Routes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user (must be unique).
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address for the new user (must be unique).
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the registration request (success).
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 data:
 *                   type: object
 *                   properties:
 *                     registeredUser:
 *                       $ref: '#/components/schemas/User'
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
 *                   description: Error message.
 *       409:
 *         description: Conflict. User already exists.
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
 *                   description: Error message (user with the same email already exists).
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the user was last updated.
 */
userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if required fields are present in the request body
    if (!username || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide username, email, and password.",
      });
    }

    // Check if a user with the same email already exists
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        status: "fail",
        message: `This email has already been registered.`,
      });
    }

    // Check if the password meets the required criteria
    if (!testPassword(password)) {
      return res.status(400).json({
        status: "fail",
        message:
          "Password doesn't meet the required criteria. Please ensure it's at least 8 characters long and includes a combination of letters(uppercase & lowercase), numbers, and special characters.",
      });
    }

    const hash = await bcrypt.hash(password, 5);
    const newUser = new UserModel({
      username,
      email,
      password: hash,
    });
    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "The new user has been registered",
      data: { registeredUser: { username, email } },
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      // Handle duplicate key (unique constraint) error
      res.status(409).json({
        status: "fail",
        message: "User with the same email or username already exists.",
      });
    } else {
      // Handle other database-related errors
      res.status(400).json({ status: "fail", error: err.message });
    }
  }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user by email and password and return an access token.
 *     tags:
 *       - User Routes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the login request (success).
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                 data:
 *                   type: object
 *                   properties:
 *                     userID:
 *                       type: string
 *                       description: The unique identifier of the user.
 *                     username:
 *                       type: string
 *                       description: The username of the user.
 *                     token:
 *                       type: string
 *                       description: An access token for the authenticated user.
 *                     refreshToken:
 *                       type: string
 *                       description: A refresh token for the authenticated user.
 *       400:
 *         description: Bad request. User not registered or wrong password.
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
 *                   description: Error message (user not registered or wrong password).
 */
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if both email and password are provided in the request body
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide both email and password.",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User not registered",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "fail",
        message: "Password is wrong",
      });
    }

    const token = jwt.sign(
      { username: user.username, userID: user._id },
      "masai",
      {
        expiresIn: "7d",
      }
    );
    const refreshToken = jwt.sign(
      { username: user.username, userID: user._id },
      "masai",
      {
        expiresIn: "28d",
      }
    );

    res.status(200).json({
      status: "success",
      message: "Logged In",
      data: {
        userID: user._id,
        username: user.username,
        token,
        refreshToken,
        totalXP: user.totalXP,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: User logout
 *     description: Log out a user by blacklisting their token.
 *     tags:
 *       - User Routes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User has been logged out.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the logout request (success).
 *                 message:
 *                   type: string
 *                   description: A success message.
 *       400:
 *         description: Bad request. Token missing in the Authorization header.
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
 *                   description: Error message (missing token in the Authorization header).
 */
userRouter.post("/logout", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    // Check if the token is present in the Authorization header
    if (typeof token === "undefined") {
      return res.status(400).json({
        status: "fail",
        message: "Missing token in the Authorization header",
      });
    }

    let newToken = new BlackListModel({ token });
    await newToken.save();
    res
      .status(200)
      .json({ status: "success", message: "User has been logged out" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - User Routes
 *     responses:
 *       200:
 *         description: List of users successfully retrieved.
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
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *       404:
 *         description: No users found.
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
 *                   description: Error message (no users found).
 */
userRouter.get("/", async (req, res) => {
  try {
    // Find all users
    const users = await UserModel.find();

    // Check if there are no users
    if (users.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No users found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { users },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

/**
 * @swagger
 * /user/update/{id}:
 *   patch:
 *     summary: Update a user
 *     description: Update the details of an existing user by their ID.
 *     tags:
 *       - User Routes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user (must be unique).
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address for the new user (must be unique).
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *     responses:
 *       200:
 *         description: User has been updated successfully.
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
 *       404:
 *         description: User not found.
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
userRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // if (req.user.userID !== user.user.toString()) {
    //   return res.status(403).json({
    //     status: "fail",
    //     message: "You are not authorized to perform this operation.",
    //   });
    // }

    // Check if at least one field to update is provided in the request body
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        status: "fail",
        message: "No fields to update provided in the request body.",
      });
    }

    // Update the user
    await UserModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({
      status: "success",
      message: "User has been updated",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

/**
 * @swagger
 * /user/updatechallenge:
 *   patch:
 *     summary: Update user's challenge array
 *     description: Update the details of an existing user challenge by their ID.
 *     tags:
 *       - User Routes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               challengeId:
 *                 type: string
 *                 description: The new challengeId for the user (must be unique).
 *               notificationId:
 *                 type: string
 *                 description: The id used to update the notification.
 *     responses:
 *       200:
 *         description: User has been updated successfully.
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
 *       404:
 *         description: User not found.
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
userRouter.patch("/updatechallenge", auth, async (req, res) => {
  const id = req.user.userID;
  try {
    const user = await UserModel.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // if (req.user.userID !== user.user.toString()) {
    //   return res.status(403).json({
    //     status: "fail",
    //     message: "You are not authorized to perform this operation.",
    //   });
    // }

    // Check if at least one field to update is provided in the request body
    if (!Object.keys(req.body).length) {
      return res.status(400).json({
        status: "fail",
        message: "No fields to update provided in the request body.",
      });
    }
    // Update the user
    await UserModel.findByIdAndUpdate(
      { _id: id },
      { $push: { acceptedChallenges: req.body.challengeId } },
      { new: true }
    );

    // Update notification `read:true`
    await NotificationModel.findByIdAndUpdate(
      { _id: req.body.notificationId },
      { read: "true" }
    );

    res.status(200).json({
      status: "success",
      message: "User challenge array has been updated",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by their ID.
 *     tags:
 *       - User Routes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User has been deleted successfully.
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
 *       404:
 *         description: User not found.
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
userRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // // Check if the user is authorized to perform this operation
    // if (req.user.userID !== user.user.toString()) {
    //   return res.status(403).json({
    //     status: "fail",
    //     message: "You are not authorized to perform this operation.",
    //   });
    // }

    // Delete the selected user
    await UserModel.findByIdAndDelete({ _id: id });
    res.status(204).json({
      status: "success",
      message: "User has been deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
});

function testPassword(password) {
  let num = false;
  let uppercase = false;
  let specialChar = false;
  let len = false;

  if (password.length >= 8) {
    len = true;
  }

  for (let val of password) {
    if (val >= "A" && val <= "Z") {
      uppercase = true;
    }
    if (val >= 0 && val <= 9) {
      num = true;
    }
    if (val === "@" || val === "#" || val === "$") {
      specialChar = true;
    }
  }
  if (num && uppercase && specialChar && len) {
    return true;
  } else {
    return false;
  }
}

module.exports = { userRouter };
