import { Router } from "express";
import { addFolder, getFolders, setFolder } from "../controller/folders.js";

const router = Router();
router.post("/", addFolder);
router.get("/:userId", getFolders);
router.put("/", setFolder);

export default router;