const { Firestore } = require("@google-cloud/firestore");

async function savePrediction(id, data) {
  const db = new Firestore({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  const predictCollection = db.collection("prediction");
  return predictCollection.doc(id).set(data);
}

module.exports = { savePrediction };
