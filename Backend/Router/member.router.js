import express from "express";
import { addMember, editMember, getMembers } from "../Controller/member.controller";
const router = express.Router();

router.get("/get-all-member", getMembers);
router.post("/add-member", addMember);
router.put("/edit-member/:_id", editMember);

export default router;
