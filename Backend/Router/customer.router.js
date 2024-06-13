import express from "express";
import { addCustomer, editCustomer, getAllCustomers, getCustomer } from "../Controller/customer.controller";
const router = express.Router();

router.get("/get-all-customers", getAllCustomers);
router.get("/get-customer/:customer_id" , getCustomer)
router.post("/add-customer", addCustomer);
router.put("/edit-customer/:_id", editCustomer)

export default router;