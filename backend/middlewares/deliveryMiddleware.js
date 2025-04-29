const jwt = require("jsonwebtoken");
const DeliveryUser = require("../ models/DeliveryUser");
const JWT_SECRET  = "secret";

exports.verifyDelivery = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(400).json({  msg: "Token not found" });
  let delivery;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    deliveryEmail = decoded.deliveryEmail;
    console.log(decoded)
  } catch (err) {
    return res.status(401).json({  msg: "Invalid token" });
  }

  try {
    delivery = await DeliveryUser.findOne({email: deliveryEmail});
    if (!delivery) {
      return res.status(501).json({  msg: "Forbidden" });
    }
    req.deliveryEmail = deliveryEmail;
    console.log(delivery)
    next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({  msg: "Internal Server Error" });
  }
};