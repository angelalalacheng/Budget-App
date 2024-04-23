const express = require("express");
const router = express.Router();

const authenticationRoutes = require("./authentication");
const budgetRoutes = require("./budget");
const transactionsRoutes = require("./transactions");
const reportsRoutes = require("./reports");

// Mount the route handlers on the router
router.use("/api", authenticationRoutes);
router.use("/api", budgetRoutes);
router.use("/api", transactionsRoutes);
router.use("/api", reportsRoutes);

module.exports = router;
