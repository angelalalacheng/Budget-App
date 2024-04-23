const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const fetchBudgetData = async (userId) => {
  const firestore = admin.firestore();
  const budgetCollectionRef = firestore.collection("budget");

  try {
    const querySnapshot = await budgetCollectionRef
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      const budgetData = {
        groceries: 0,
        health: 0,
        transport: 0,
        accommodation: 0,
        gift: 0,
        other: 0,
      };

      return budgetData;
    }
  } catch (error) {
    console.error("Error getting budget data:", error);
    return null;
  }
};

const fetchTranscationsData = async (userId, type, startDate, endDate) => {
  const firestore = admin.firestore();
  const collectionName = type === "income" ? "income" : "expense";
  const transactionsCollectionRef = firestore.collection(collectionName);

  try {
    const query = await transactionsCollectionRef
      .where("userId", "==", userId)
      .where("date", ">=", startDate)
      .where("date", "<=", endDate);

    const transactionsSnapShot = query.get();
    const transactions = transactionsSnapShot.docs.map((doc) => doc.data());

    // Prepare an object to store the transactions grouped by category
    const transactionsByCategory = {};

    // Calculate the total of all transactions
    let totalAmount = 0;

    // Iterate through the documents and group transactions by category while summing the amounts
    transactions.forEach((transaction) => {
      const { category, amount } = transaction;

      // Add the transaction amount to the corresponding category sum
      transactionsByCategory[category] = transactionsByCategory[category] || {
        sum: 0,
        transactions: [],
      };
      transactionsByCategory[category].sum += parseFloat(amount);
      transactionsByCategory[category].transactions.push(transaction);

      // Add the transaction amount to the total
      totalAmount += parseFloat(amount);
    });

    // Return the transactions, transactions grouped by category, and the total amount
    return { transactions, transactionsByCategory, totalAmount };
  } catch (error) {
    console.error("Error getting transcation data:", error);
    return [];
  }
};

// Function to get the budget summary
const getBudgetSummary = (budget, transactionsByCategory) => {
  const combinedArray = [];

  for (let key of Object.keys(budget)) {
    if (key !== "userId") {
      const amountAllocated = budget[key];
      const amountSpent = transactionsByCategory[key]
        ? transactionsByCategory[key].sum
        : 0;
      const amountRemaining = amountAllocated - amountSpent;
      combinedArray.push({
        key,
        amountAllocated,
        amountSpent,
        amountRemaining,
      });
    }
  }
  return combinedArray;
};

// generate various financial reports for the user
router.post("/getReportsData", async (req, res) => {
  const { userId, startDate, endDate } = req.body;

  try {
    const budget = await fetchBudgetData(userId);
    const income = await fetchTranscationsData(
      userId,
      "income",
      startDate,
      endDate
    );
    const expenses = await fetchTranscationsData(
      userId,
      "expense",
      startDate,
      endDate
    );

    // Call the getBudgetSummary() function to get the budget summary
    const budgetSummary = getBudgetSummary(
      budget,
      expenses.transactionsByCategory
    );

    // Combine the income and expense data into a single response object
    const responseData = {
      success: true,
      budget: budget,
      income: income,
      expenses: expenses,
      budgetSummary: budgetSummary,
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error getting reports data:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
