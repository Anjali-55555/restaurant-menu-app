require("dotenv").config();
const express = require("express");
const cors = require("cors");
const menuRoutes = require("./src/routes/menuRoutes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => res.send("Menu API is running"));

app.use("/api/menu", menuRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Menu API server running on http://localhost:${PORT}`);
});