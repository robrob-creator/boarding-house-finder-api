const SMS = require("semaphore.co-sms");
const API_KEY = "";

let sendSMS = async ({ number, message }) => {
  let obj = {
    apikey: API_KEY,
    number,
    message,
    sendername: "SIFS",
  };
  let res = await SMS.send(obj);
  if (res.status == "Sent") console.log("Message has been sent successfully.");
  console.log("failed sms");
};

module.exports = { sendSMS };
