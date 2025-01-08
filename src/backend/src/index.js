import express from "express";
import cors from "cors";
import analyzer_log_routes from "./routes/analyzer_log_route.js";

const app = express();
const port = 3000; // Port for the backened server

app.use(cors());
app.use(express.json());

app.use("/api", analyzer_log_routes);

// Starts the express server
app.listen(port, () => {
  console.log("Backend server running on http://localhost:" + port);
});
