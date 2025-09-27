import express from "express";
import postController from "../controllers/postController.js";

const router = express.Router();

router.get("/", postController.getAll);
router.post("/:userId", postController.create);
router.put("/:postId", postController.update);
router.delete("/:postId", postController.delete);

export default router;
