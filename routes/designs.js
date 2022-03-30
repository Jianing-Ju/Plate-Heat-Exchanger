import { Router } from "express";
import {deleteDesign, designExists, getDesigns, getInput, saveDesign, updateDesign} from "../controller/designs.js";

const router = Router();

router.post("/", saveDesign);
router.put("/", updateDesign);
router.get("/:userId", getDesigns);
router.get("/exists/:designId", designExists);
router.get("/input/:designId", getInput);
router.post("/delete", deleteDesign);

export default router;