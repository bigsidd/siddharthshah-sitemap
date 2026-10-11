// Forwards hello@siddharthshah.me to both inboxes (Cloudflare Email Worker "hello-forward").
const TO = ['siddharth_shah@me.com', 'bigsidd@gmail.com'];

export default {
  async email(message) {
    const sent = await Promise.allSettled(TO.map((to) => message.forward(to)));
    if (sent.every((s) => s.status === 'rejected')) message.setReject('Delivery failed, please try again later');
  },
};
