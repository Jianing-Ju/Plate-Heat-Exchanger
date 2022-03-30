import { Router } from "express";
import { getPlateGeos, savePlateGeo } from "../controller/plateGeometries.js";

const router = Router();

router.post("/", savePlateGeo);
router.get("/:userId", getPlateGeos);

export default router;