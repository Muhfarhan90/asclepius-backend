const { v4: uuidv4 } = require("uuid");
const { predict } = require("../models/modelHandler.js");
const { savePrediction } = require("../models/firestoreHandler.js");

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
    const confidenceScore = await predict(imageBuffer); // Hasil: confidence score

    // Menentukan hasil prediksi berdasarkan threshold 50%
    const isCancer = confidenceScore > 50; // Prediksi kanker jika confidence score > 50%
    const result = isCancer ? "Cancer" : "Non-cancer";
    const suggestion = isCancer
      ? "Segera periksa ke dokter!"
      : "Penyakit kanker tidak terdeteksi.";

    // Membuat ID dan menyimpan data
    const id = uuidv4();
    const predictionData = {
      id,
      result,
      suggestion,
    //   confidenceScore,
      createdAt: new Date().toISOString(),
    };

    // Menyimpan data ke Firestore
    await savePrediction(id,predictionData);

    return res.status(200).json({
      status: "success",
      message: "Model is predicted successfully",
      data: predictionData,
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
