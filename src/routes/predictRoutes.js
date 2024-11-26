const express = require("express");

const upload = require("../middleware/fileUpload");
const validateFileSize = require("../middleware/validateFileSize");
const { predictCancer } = require("../controller/predictController");

const router = express.Router();

router.post(
  "/predict",
  upload.single("image"), // Upload file
  validateFileSize, // Validasi ukuran file
  predictCancer // Controller prediksi
);

module.exports = router;
