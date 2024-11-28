const express = require("express");

const upload = require("../middleware/fileUpload");
const validateFileSize = require("../middleware/validateFileSize");
const { predictCancer } = require("../controller/predictController");
// const { historyPredict } = require("../models/firestoreHandler");
const { historyPredict } = require("../controller/historyController") 
const router = express.Router();

router.post(
  "/predict",
  upload.single("image"), // Upload file
  validateFileSize, // Validasi ukuran file
  predictCancer // Controller prediksi
);

router.get("/", (req, res) => {
  res.json({
    message: "Anda berhasil melakukan GET pada server ini",
  });
});

router.get("/predict/histories", historyPredict);

module.exports = router;
