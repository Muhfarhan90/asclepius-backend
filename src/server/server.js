const express = require("express");
const bodyParser = require("body-parser");
const predictRoutes = require("../routes/predictRoutes.js");
require('dotenv').config();

const app = express();

// Middleware global
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", predictRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: "fail", message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
