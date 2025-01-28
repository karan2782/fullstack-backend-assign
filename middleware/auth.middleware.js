const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");
require("dotenv").config();

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(500).json({ message: `Token not found` });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    
    const currentDate = Date.now() / 1000;
    if (currentDate > decoded.exp) {
      return res.status(500).json({ message: `Token is expired` });
    }

    const user = await User.findOne({ _id: decoded.userId });

    req.userInfo = user;

    next();
  } catch (error) {
    return res.status(500).json({ message: `Error ${error}` });
  }
};

module.exports = { auth };
