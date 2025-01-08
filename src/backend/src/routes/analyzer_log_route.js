import express from "express";
import * as analyzer_log_controller from "../controllers/analyzer_log_controller.js";

const router = express.Router();

router.get("/analyzer-log", analyzer_log_controller.getAnalyzerLog);
router.post("/analyzer-log", analyzer_log_controller.addAnalyzerLog);
router.put("/analyzer-log/:id", analyzer_log_controller.updateAnalyzerLog);
router.delete("/analyzer-log/:id", analyzer_log_controller.deleteLogData);

export default router;
