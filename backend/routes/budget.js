const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Route to save the budget
router.post("/saveBudget", async (req, res) => {
  const { budgetData, userId } = req.body;

  try {
    // Add the userId field to the formData object
    budgetData.userId = userId;

    const firestore = admin.firestore();
    const budgetCollectionRef = firestore.collection("budget");

    // Query the documents based on userId and get the first matching document
    const querySnapshot = await budgetCollectionRef
      .where("userId", "==", userId)
      .limit(1)
      .get();

    let budgetDataRef;

    if (querySnapshot.empty) {
      // If the document does not exist, create a new document with random document ID
      budgetDataRef = budgetCollectionRef.doc();
    } else {
      // If the document exists, get the reference of the document(can visit and modify document)
      budgetDataRef = querySnapshot.docs[0].ref;
    }

    // Save or update the form data in Firestore (merge: true is used to update the existing document partically)
    await budgetDataRef.set(budgetData, { merge: true });

    // Send a success response to the frontend
    res.json({ success: true });
  } catch (error) {
    console.error("Error saving budget data:", error);
    // Send error msg to the frontend
    res.status(500).json({ success: false });
  }
});

router.post("/getBudget", async (req, res) => {
  const { userId } = req.body;

  try {
    const firestore = admin.firestore();
    const budgetCollectionRef = firestore.collection("budget");

    const querySnapshot = await budgetCollectionRef
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (!querySnapshot.empty) {
      const budgetData = querySnapshot.docs[0].data();
      res.json({ success: true, budgetData });
    } else {
      // If the document doesn’t exist, return all fields as 0
      const budgetData = {
        groceries: 0,
        health: 0,
        transport: 0,
        accommodation: 0,
        gift: 0,
        other: 0,
      };

      res.json({ success: true, budgetData });
    }
  } catch (error) {
    console.error("Error getting budget data:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
