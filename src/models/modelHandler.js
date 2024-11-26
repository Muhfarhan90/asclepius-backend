const tf = require("@tensorflow/tfjs-node");
// const path = require("path");

// const modelPath = path.resolve(__dirname, "model.json");
let model = null;

// Fungsi memuat model
const loadModel = async () => {
  if (!model) {
    console.log("Loading model...");
    model = await tf.loadGraphModel(process.env.MODEL_URL);
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
    .expandDims(0);

  // Lakukan prediksi
  const prediction = model.predict(imageTensor);
  // Tambahin code ini untuk mengambil score dan menghitung confidence score
  const score = await prediction.data();
  const confidenceScore = Math.max(...score) * 100;

  return confidenceScore;
};

module.exports = { predict };
