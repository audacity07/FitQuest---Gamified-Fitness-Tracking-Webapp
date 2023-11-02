const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { selectedActivityRouter } = require("./routes/selectedActivity.routes");
const { activityRouter } = require("./routes/activity.routes");

const app = express();
app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FitQuest API",
      version: "1.0.0",
      description: "Routes to handle users, activity and their progress",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSdoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/user", userRouter);
app.use("/selectedactivity", selectedActivityRouter);
app.use("/activity", activityRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.get("/regeneratetoken", (req, res) => {
  const refreshToken = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(refreshToken, "masai");
  if (decoded) {
    const authToken = jwt.sign(
      { username: decoded.username, userID: decoded.userID },
      "masai",
      {
        expiresIn: 300,
      }
    );
    res
      .status(200)
      .json({ status: "success", data: { newAuthToken: authToken } });
  } else {
    res.status(400).json({
      status: "fail",
      message: `Invalid Refresh Token, Cant generate new token`,
    });
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to DB`);
  } catch (error) {}
  console.log(`Server is running on ${process.env.PORT}`);
});
