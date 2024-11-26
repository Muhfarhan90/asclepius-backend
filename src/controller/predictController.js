const { v4: uuidv4 } = require("uuid");
const { predict } = require("../models/modelHandler.js");

const predictCancer = async (req, res, next) => {
  try {
    const file = req.file;

    // Pastikan file gambar ada
    if (!file) {
      return res.status(400).json({
        status: "fail",
        message: "No image file provided",
      });
    }

    // Ambil buffer gambar dari file yang di-upload
    const imageBuffer = file.buffer;

    // Lakukan prediksi menggunakan model
    const confidenceScore = await predict(imageBuffer); // Mengambil confidence score

    // Tentukan apakah gambar termasuk kanker atau tidak berdasarkan confidence score
    const isCancer = confidenceScore > 50; // Ambil threshold 50% (0.5)
    const result = isCancer ? "Cancer" : "Non-cancer";
    const suggestion = isCancer
      ? "Segera periksa ke dokter!"
      : "Penyakit kanker tidak terdeteksi.";

    // Generate ID unik untuk setiap prediksi
    const id = uuidv4();

    // Tentukan className untuk frontend berdasarkan hasil prediksi
    const className = isCancer ? "cancer-prediction" : "non-cancer-prediction";

    // Kirim response dengan hasil prediksi
    return res.status(201).json({
      status: "success",
      message: "Model is predicted successfully",
      data: {
        id,
        result,
        confidenceScore,  // Sertakan confidence score di response
        suggestion,
        className, // Menambahkan className di response
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Prediction Error:", error.message);
    return res.status(400).json({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    });
  }
};

module.exports = { predictCancer };
