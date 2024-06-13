import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import customerRouter from "./Router/customer.router";
import leaderRouter from "./Router/leader.router";
import memberRouter from "./Router/member.router";
import messageRouter from "./Router/message.router"
const cron = require("node-cron");


dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());

const PORT = 8888;

app.listen(PORT, () =>
  console.log(`Server is Running on http://localhost:${PORT}`)
);

mongoose
  .connect("mongodb://127.0.0.1:27017/dashbord")
  .then(() => console.log("DB connected"))
  .catch((error) => console.log(error));

app.use(customerRouter);
app.use(leaderRouter);
app.use(memberRouter);
app.use(messageRouter);
