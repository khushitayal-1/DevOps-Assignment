// worker/rabbitmqWorker.js
const amqp = require("amqplib");
const nodemailer = require("nodemailer");

async function startWorker() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue("email_queue", { durable: true });
    console.log("🐰 RabbitMQ worker connected and waiting for messages...");

    // Keep consuming messages
    channel.consume("email_queue", async (msg) => {
      if (msg !== null) {
        try {
          const data = JSON.parse(msg.content.toString());

          // Create transporter (you could move this outside consume for efficiency)
          const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          // Send email
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: "Verify your account",
            html: `<a href="http://localhost:3000/api/auth/verify/${data.token}">Click to verify</a>`,
          });

          console.log(`📧 Email sent to ${data.email}`);
          channel.ack(msg); // acknowledge message
        } catch (err) {
          console.error("❌ Failed to process message:", err);
          channel.nack(msg, false, true); // requeue message on failure
        }
      }
    });
  } catch (err) {
    console.error("❌ RabbitMQ connection error:", err);
    process.exit(1); // exit if cannot connect
  }
}

module.exports = { startWorker };

// If you want to run this directly with `node rabbitmqWorker.js`, you can add:
if (require.main === module) {
  require("dotenv").config(); // load .env
  startWorker();
}
