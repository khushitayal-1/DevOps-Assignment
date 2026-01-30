require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/auth");
const { connectRabbitMQ } = require("./rabbitmq");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // frontend


const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

connectRabbitMQ().then(() => console.log("🐰 RabbitMQ connected"));

app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));
