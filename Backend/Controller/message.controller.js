import customerModel from "../Model/customer.model";
import messageModel from "../Model/message.model";
import twilio from "twilio";
const cron = require("node-cron");

export const getMessage = async (req, res) => {
  try {
    const memberData = await messageModel.find({ status: 1 });
    res.status(200).json({
      data: memberData,
      message: "Successfully data is fetched",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { mobile, message } = req.body;

    const memberData = new memberModel({
      message: message,
      mobile: mobile,
    });

    await memberData.save();
    res.status(201).json({
      data: memberData,
      message: "Added successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//-------use the services of twilio------------

export const sendMessage = async (req, res) => {
  try {
    const customerData = await customerModel.find({
      status: 1,
    });
    const customerNumbers = customerData.map((user) => `+91${user.mobile}`);
    console.log(customerNumbers);
    const { message } = await req.body;
    console.log(message);

    const accountSid = ""; //accounts id
    const authToken = ""; //token

    const client = twilio(accountSid, authToken);

    client.messages
      .create({
        from: "",
        to: customerNumbers,
        body: message,
      })
      .then((message) => res.send("Message sent successfully"))
      .catch((error) => console.error("Error sending message:", error));
  } catch (error) {}
};

//-------use the services of textLocal  (git.) ------------

// export const sendMessage = axios.create({
//   baseURL: "https://api.textlocal.in/",
//   params: {
//     apiKey: "YOUR API KEY",
//     sender: "6 CHARACTER SENDER ID"
//   }
// });

// const smsClient = {
//   sendPartnerWelcomeMessage: user => {
//     if (user && user.phone && user.name) {
//       const params = new URLSearchParams();
//       params.append("numbers", [parseInt("91" + user.phone)]);
//       params.append(
//         "message",
//         `Hi ${user.name},
// Welcome to iWheels, Download our app to get bookings from our customers with better pricing.
// https://iwheels.co`
//       );
//       tlClient.post("/send", params);
//     }
//   },
//   sendVerificationMessage: user => {
//     if (user && user.phone) {
//       const params = new URLSearchParams();
//       params.append("numbers", [parseInt("91" + user.phone)]);
//       params.append(
//         "message",
//         `Your iWheels verification code is ${user.verifyCode}`
//       );
//       tlClient.post("/send", params);
//     }
//   }
// };

// --------------use of twilio service-----------------
// export const sendMessage = async (req, res) => {
//   try {
//     const customerData = await customerModel.find({
//       status: 1,
//     });
//     const customerNumbers = customerData.map((user) => `+91${user.mobile}`);
//     const customerBirthDay = customerData.map((user) => user.dateOfBirth);
//     const { message } = req.body;

//     cron.schedule("0 0 * * *", async () => {
//       // Check if any customers have birthdays today
//       const today = new Date();
//       const todayStr = `${today.getMonth() + 1}-${today.getDate()}`;
//       const birthdayCustomers = customerData.filter(
//         (user) =>
//           user.dateOfBirth &&
//           user.dateOfBirth.getMonth() + 1 === today.getMonth() + 1 &&
//           user.dateOfBirth.getDate() === today.getDate()
//       );

//       console.log(birthdayCustomers);

//       // Send birthday message to each customer
//       const accountSid = "";
//       const authToken = "";
//       const client = twilio(accountSid, authToken);

//       birthdayCustomers.forEach((user) => {
//         client.messages
//           .create({
//             from: "+",
//             to: `+91${user.mobile}`,
//             body: `Happy birthday, ${user.name}! ${message}`,
//           })
//           .then((message) => console.log("Birthday message sent:", message.sid))
//           .catch((error) => console.error("Error sending birthday message:", error));
//       });
//     });

//     // Send response
//     res.status(200).send("Cron job scheduled successfully");

//     // const accountSid = "";
//     // const authToken = "";

//     // const client = twilio(accountSid, authToken);

//     // client.messages
//     //   .create({
//     //     from: "", //contact number from the twilio
//     //     to: customerNumbers,
//     //     body: message,
//     //   })
//     //   .then((message) => res.send("Message sent successfully"))
//     //   .catch((error) => console.error("Error sending message:", error));
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// export const sendMessage = async (req, res) => {
//   try {
//     const customerData = await customerModel.find({
//       status: 1,
//     });
//     const customerNumbers = customerData.map((user) => `+91${user.mobile}`);
//     const customerBirthDay = customerData.map((user) => user.dateOfBirth);
//     const { message } = req.body;

//       // Check if any customers have birthdays today
//       const today = new Date();
//       const todayStr = `${today.getMonth() + 1}-${today.getDate()}`;
//       const birthdayCustomers = customerData.filter(
//         (user) =>
//           user.dateOfBirth &&
//           user.dateOfBirth.getMonth() + 1 === today.getMonth() + 1 &&
//           user.dateOfBirth.getDate() === today.getDate()
//       );

//       console.log(birthdayCustomers);

//       // Send birthday message to each customer
//       const accountSid = "";
//       const authToken = "";
//       const client = twilio(accountSid, authToken);

//       birthdayCustomers.forEach((user) => {
//         // Access message variable here
//         const birthdayMessage = `Happy birthday, ${user.name.firstName}`; // Modified message
//         client.messages
//           .create({
//             from: "+",
//             to: `+91${user.mobile}`,
//             body: birthdayMessage,
//           })
//           .then((message) => console.log("Birthday message sent:", message.sid))
//           .catch((error) =>
//             console.error("Error sending birthday message:", error)
//           );
//       });

//     // Send response
//     res.status(200).send("Cron job scheduled successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };
