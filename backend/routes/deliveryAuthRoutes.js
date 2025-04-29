const express = require("express");
const deliveryController = require("../controllers/deliveryController");
const router = express.Router();

router.post("/signup", deliveryController.checkDeliveryStatus);
router.post("/login", deliveryController.getDeliveries);

module.exports = router;