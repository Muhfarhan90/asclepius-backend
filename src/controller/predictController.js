const { v4: uuidv4 } = require("uuid");
const { predict } = require("../models/modelHandler.js");

const predictCancer = async (req, res, next) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        status: "fail",
        message: "No image file provided",
      });
    }

    // Preprocessing gambar (opsional, bergantung pada model)
    const imageBuffer = file.buffer;

    // Lakukan prediksi menggunakan model
    const prediction = await predict(imageBuffer); // Hasil: 0 = Non-cancer, 1 = Cancer

    // Hasilkan respons berdasarkan prediksi
    const isCancer = prediction > 0.5; // Contoh threshold 0.5
    const id = uuidv4();
    const result = isCancer ? "Cancer" : "Non-cancer";
    const suggestion = isCancer
      ? "Segera periksa ke dokter!"
      : "Penyakit kanker tidak terdeteksi.";

    // Menambahkan className berdasarkan hasil prediksi
    const className = isCancer ? "cancer-prediction" : "non-cancer-prediction";

    return res.status(200).json({
      status: "success",
      message: "Model is predicted successfully",
      data: {
        id,
        result,
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
