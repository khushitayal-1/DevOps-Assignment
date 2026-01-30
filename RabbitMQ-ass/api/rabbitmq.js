// api/rabbitmq.js
const amqp = require("amqplib");

let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue("email_queue", { durable: true });
  console.log("🐰 RabbitMQ connected");
}

function getChannel() {
  if (!channel) throw new Error("Channel not initialized. Call connectRabbitMQ first.");
  return channel;
}

function sendToQueue(data) {
  const ch = getChannel();
  ch.sendToQueue("email_queue", Buffer.from(JSON.stringify(data)), { persistent: true });
}

module.exports = { connectRabbitMQ, getChannel, sendToQueue };
