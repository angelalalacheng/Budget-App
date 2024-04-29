const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

router.post("/addTransaction", async (req, res) => {
  const { userId, type, xData } = req.body;
  try {
    const firestore = admin.firestore();
    const collectionName = type === "income" ? "income" : "expense";

    await firestore
      .collection(collectionName)
      .add({ userId: userId, ...xData });

    res.json({ success: true });
  } catch (error) {
    console.error("Error adding transaction data:", error);
    res.status(500).json({ success: false });
  }
});
router.get("/getTransaction", async (req, res) => {
  // 通过req.query获取URL中的查询参数
  const { id, type } = req.query;

  try {
    const firestore = admin.firestore();

    const collectionName = type === "income" ? "income" : "expense";
    // 这部分代码直接通过文档ID获取一个特定的文档。这是一种非常高效的数据检索方式，因为它直接定位并返回单个文档
    const transactionDoc = await firestore
      .collection(collectionName)
      .doc(id)
      .get();

    if (transactionDoc.exists) {
      const xData = transactionDoc.data();
      res.json({ success: true, xData });
    } else {
      console.error("Transactions not found.");
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.error("Error getting transaction data:", error);
    res.status(500).json({ success: false });
  }
});
router.post("/getAllTransactions", async (req, res) => {
  try {
    const { userId, type } = req.body;

    const firestore = admin.firestore();
    const collectionName = type === "income" ? "income" : "expense";
    const transactionsRef = firestore.collection(collectionName);

    const querySnapshot = await transactionsRef
      .where("userId", "==", userId)
      .get();

    const userTransactions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({ success: true, userTransactions });
  } catch (error) {
    console.error("Error getting all transaction data:", error);
    res.status(500).json({ success: false });
  }
});
router.put("/editTransaction", async (req, res) => {
  const { id, type, transactionData } = req.body;

  try {
    const firestore = admin.firestore();
    const collectionName = type === "income" ? "income" : "expense";
    // update() != set() with merge: true
    // update() is used to update the existing document
    // set() with merge: true is used to update the existing document or create a new document if it doesn't exist
    // set() with merge: true can add new fields to the existing document while update() can only update the existing fields
    await firestore.collection(collectionName).doc(id).update(transactionData);

    res.json({ success: true });
  } catch (error) {
    console.error("Error editing transaction data:", error);
    res.status(500).json({ success: false });
  }
});
router.delete("/deleteTransaction", async (req, res) => {
  const { id, type } = req.query;

  try {
    const firestore = admin.firestore();
    const collectionName = type === "income" ? "income" : "expense";

    await firestore.collection(collectionName).doc(id).delete();

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting transaction data:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
