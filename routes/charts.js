import { Router } from "express";
import { exportCharts, uploadChart } from "../controller/charts.js";
import multer from "multer";

const router = Router();
const upload = multer({storage: multer.memoryStorage()});

router.post("/export", exportCharts);
router.post("/:userId", upload.single("file"), uploadChart);

export default router;