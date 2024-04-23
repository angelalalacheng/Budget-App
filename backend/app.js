const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Firebase Admin SDK setup
const serviceAccount = require("./serviceAccountKey.json");

// Add necessary configurations
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World! This is BudgetBuddy API.");
});
const routes = require("./routes");
app.use(routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
