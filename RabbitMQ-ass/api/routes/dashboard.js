const express = require("express");
const User = require("../../models/User"); // your MongoDB user model
const router = express.Router();

// GET all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "email verified"); // only show email + verified
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
