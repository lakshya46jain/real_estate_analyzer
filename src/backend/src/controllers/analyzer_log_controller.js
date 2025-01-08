import * as analyzer_log_service from "../services/analyzer_log_services.js";

export const getAnalyzerLog = async (req, res) => {
  try {
    const analyzer_log = await analyzer_log_service.getAnalyzerLog();
    res.status(200).json(analyzer_log);
  } catch (error) {
    console.error("Error fetching analyzer log:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addAnalyzerLog = async (req, res) => {
  try {
    const log_data = req.body;
    const new_log_data = await analyzer_log_service.addAnalyzerLog(log_data);
    res.status(200).json(new_log_data);
  } catch (error) {
    console.error("Error adding analyzer log:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateAnalyzerLog = async (req, res) => {
  try {
    const log_id = req.params.id;
    const log_data = req.body;
    const existing_log_data = await analyzer_log_service.updateAnalyzerLog(
      log_id,
      log_data
    );
    if (!existing_log_data) {
      return res.status(404).json({ message: "Log Not Found" });
    }
    res.status(200).json(existing_log_data);
  } catch (error) {
    console.error("Error updating analyzer log:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteLogData = async (req, res) => {
  try {
    const log_id = req.params.id;
    const delete_log_data = await analyzer_log_service.deleteLogData(log_id);
    if (delete_log_data) {
      return res.status(404).json({ message: "Log Not Found" });
    }
    res.status(200).send();
  } catch (error) {
    console.error("Error deleting analyzer log:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
