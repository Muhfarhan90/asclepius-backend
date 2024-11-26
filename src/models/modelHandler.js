const tf = require("@tensorflow/tfjs-node");
const path = require("path");

const modelPath = path.resolve(__dirname, "model.json");
let model = null;

// Fungsi memuat model
const loadModel = async () => {
  if (!model) {
    console.log("Loading model...");
    model = await tf.loadGraphModel(`file://${modelPath}`);
    console.log("Model loaded successfully");
  }
  return model;
};

// Fungsi prediksi
const predict = async (imageBuffer) => {
  if (!model) {
    await loadModel();
  }
  console.log("Starting prediction....");

  // Preprocessing gambar (resize, normalisasi, dll.)
  const imageTensor = tf.node
    .decodeImage(imageBuffer)
    .resizeNearestNeighbor([224, 224]) // Sesuaikan dengan input model
    .toFloat()
    .expandDims(0)
    .div(255.0);

  // Lakukan prediksi
  const prediction = model.predict(imageTensor);
  const predictionArray = prediction.arraySync();
 
  return predictionArray[0][0]; // Skalar prediksi (misal: 0.9)
};

module.exports = { predict };
