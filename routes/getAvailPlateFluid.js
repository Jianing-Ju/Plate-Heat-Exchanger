import { Router } from "express";
import getAvail from "../controller/getAvailPlateFluid.js";

const router = Router();
router.get("/", getAvail);

export default router;