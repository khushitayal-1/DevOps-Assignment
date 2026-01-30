require("dotenv").config();
const { startWorker } = require("./rabbitmqworker");

startWorker().catch((err) => {
  console.error("❌ Worker failed:", err);
  process.exit(1);
});
