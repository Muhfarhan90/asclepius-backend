const { Firestore } = require("@google-cloud/firestore");

async function savePrediction(id, data) {
  const db = new Firestore({
    projectId: "submissionmlgc-farhan-442717",
    keyFilename: "src/service-accounts/firestore-serviceaccount.json",
  });

  const predictCollection = db.collection("prediction");
  return predictCollection.doc(id).set(data);
}

module.exports = { savePrediction };
