const express = require("express");
const cors = require("cors");

const orderRoutes = require("./routes/orderRoutes");
// const menuRoutes = require("./routes/menuRoutes"); // uncomment once Role 3 pushes theirs

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => res.send("Restaurant Menu API is running"));

app.use("/api/orders", orderRoutes);
// app.use("/api/menu", menuRoutes); // uncomment once Role 3 pushes theirs

app.use(errorHandler);

module.exports = app;