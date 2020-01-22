const express = require("express");
const jwt = require("jsonwebtoken");
const restricted = require("../middleware/restricted");
const usersModel = require("./users-model");

const router = express.Router();

router.get("/", restricted(), async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.decode(token, { complete: true });
    const { department } = user.payload;
    const users = await usersModel.getBy({ department });

    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
