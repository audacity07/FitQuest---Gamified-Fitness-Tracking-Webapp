const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blacklist.model");

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);

  if (!token) {
    return res.status(400).send({ msg: `Token required` });
  }

  try {
    let tokens = await BlackListModel.find();

    // if token is present in the blacklist then:
    if (tokens.some((item) => item.token === token)) {
      return res.status(400).json({ msg: "Token has expired" });
    }

    // if token is not present in the blacklist then decode it and check if it is valid:
    jwt.verify(token, "masai", (err, decoded) => {
      if (err) {
        return res.status(400).json({ msg: "Invalid Token" });
      } else if (decoded) {
        // console.log(decoded);
        req.body.userID = decoded.userID;
        next();
      }
    });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

module.exports = { auth };
