const jwt = require("jsonwebtoken");
const Admin = require("../ models/Admin");
const JWT_SECRET  = "secret";

exports.verifyAdmin = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(400).json({  msg: "Token not found" });
  let admin;
  try {
    const decoded  = jwt.verify(token, JWT_SECRET);
    adminEmail = decoded.adminEmail;

 } catch (err) {
    return res.status(401).json({  msg: "Invalid token" });
  }

  try {
    console.log(adminEmail) 
    admin = await Admin.findOne({email: adminEmail});
    if (!admin) {
      return res.status(501).json({  msg: "Forbidden" });
    }
    req.adminEmail = adminEmail;
    console.log(admin)
    next();
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({  msg: "Internal Server Error" });
  }
};