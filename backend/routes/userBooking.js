import express from "express";
import { userBooking } from "../Controllers/bookingController.js";
// import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/:id", userBooking);

export default router;
