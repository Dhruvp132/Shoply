const express = require("express");
const deliveryController = require("../controllers/deliveryController");
const { verifyDelivery } = require("../middlewares/deliveryMiddleware");
const router = express.Router();


router.post("/signup", deliveryController.addDeliveryUser);
router.post("/login", deliveryController.getDeliveryUser);
router.get("/check", deliveryController.checkDeliveryStatus);
router.get("/", verifyDelivery ,deliveryController.getDeliveries);
router.get("/cartDetails/:userId", deliveryController.getCartDetails);
router.post("/add", deliveryController.addDelivery);
router.put("/update", verifyDelivery, deliveryController.updateDelivery);

module.exports = router;