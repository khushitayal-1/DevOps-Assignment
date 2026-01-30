const { getChannel } = require("./rabbitmq");

function sendVerificationEmail(data) {
  const channel = getChannel();
  channel.sendToQueue("email_queue", Buffer.from(JSON.stringify(data)));
}

module.exports = { sendVerificationEmail };
