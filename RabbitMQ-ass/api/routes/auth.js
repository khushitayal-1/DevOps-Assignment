const express = require("express");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { sendVerificationEmail } = require("../producer");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";
const { sendToQueue } = require("../rabbitmq");

// After registering user

/**
 * REGISTER
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      email,
      password: hashed,
      verificationToken: token,
      verified: false
    });

    // ✅ Send to RabbitMQ for email
    sendToQueue({ email: user.email, token }); // <- this must be inside the route

    res.json({ message: "Check your email to verify your account" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * VERIFY EMAIL
 */
router.get("/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).send("Invalid token");

    user.verified = true;
    user.verificationToken = null;
    await user.save();

    res.send("✅ Email verified");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("Invalid credentials");
    if (!user.verified) return res.status(403).send("Please verify your email");

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users (for dashboard)
router.get("/dashboard/users", async (req, res) => {
  try {
    const users = await User.find({}, { email: 1, verified: 1, _id: 0 }); // only email & verified
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
