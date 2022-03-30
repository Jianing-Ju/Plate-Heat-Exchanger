import { Router } from "express";
import { addFolder, deleteFolder, getFolders, setFolder } from "../controller/folders.js";

const router = Router();
router.post("/", addFolder);
router.get("/:userId", getFolders);
router.put("/", setFolder);
router.delete("/:folderId", deleteFolder);

export default router;