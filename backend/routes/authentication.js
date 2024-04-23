const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Firebase Admin SDK setup

router.post("/google-signin", async (req, res) => {
  //verifyIdToken() method provided by the Authentication service of the Firebase Admin SDK
  try {
    const idToken = req.body.idToken;
    // Use decodedToken to get user information and perform further actions
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    res.json({ success: true });
  } catch (error) {
    console.error("Error verifying Google Sign-In token:", error);
    res.status(401).json({ success: false });
  }
});

module.exports = router;
