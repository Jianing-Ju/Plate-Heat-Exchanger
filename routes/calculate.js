import { Router } from "express";
import calculate from "../controller/calculator/calculate.js";

const router = Router();
router.post("/:type", calculate);

export default router;