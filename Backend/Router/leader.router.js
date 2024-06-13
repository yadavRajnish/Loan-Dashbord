import express from "express";
import { addLeader, editLeader, getLeaders } from "../Controller/leader.controller";
const router = express.Router();

router.get("/get-all-leader", getLeaders);
router.post("/add-leader", addLeader);
router.put("/edit-leader/:_id", editLeader);

export default router;
