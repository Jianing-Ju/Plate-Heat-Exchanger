import { Router } from "express";
import { getFluidConds, saveFluidCond } from "../controller/fluidConditions.js";

const router = Router();

router.get("/:userId", getFluidConds);
router.post("/", saveFluidCond);

export default router;