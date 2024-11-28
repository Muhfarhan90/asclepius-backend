const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

const historyPredict = async (req, res) => {
  try {
    // Mengakses koleksi 'predictions' di Firestore
    const predictionsRef = firestore.collection('prediction');
    const snapshot = await predictionsRef.get(); // Mengambil semua dokumen dari koleksi

    // Jika koleksi kosong, kirimkan respons dengan status 404
    if (snapshot.empty) {
      return res.status(404).json({ message: 'No predictions found' });
    }

    // Menyusun data prediksi yang diambil
    const predictions = [];
    snapshot.forEach(doc => {
      predictions.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Mengirimkan data prediksi ke frontend dalam format JSON
    res.status(200).json({
      success: true,
      message: 'Predictions retrieved successfully',
      data: predictions
    });
  } catch (error) {
    console.error('Error fetching predictions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}

module.exports = { historyPredict };
