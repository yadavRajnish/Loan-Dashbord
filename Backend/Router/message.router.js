import express from "express";
import {
  addMessage,
  getMessage,
  sendMessage,
} from "../Controller/message.controller";
// import { addMember, getMembers } from "../Controller/member.controller";
const router = express.Router();

router.get("/get-message", getMessage);
router.post("/add-message", addMessage);
router.post("/send-message", sendMessage);

export default router;
