const Product = require("../ models/Product");
const express = require("express");
const router = express.Router();
const Admin = require("../ models/Admin");
const jwt = require("jsonwebtoken");
const { verifyAdmin } = require("../middlewares/adminMiddleware");

// router.get("/check", (req, res) => {
//   // check is Admin exists in the database 
// });
const JWT_SECRET = "secret" ; 

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Email field not found" });
    }
    if (!password) {
      return res.status(400).json({ msg: "password field not found" });
    }
    const admin = await Admin.create({ email, password });
    res.status(200).json({ admin, msg: "Admin created successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
})

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ msg: "Email field not found" });
      }
      const admin = await Admin.findOne({email});
      if (!admin) {
        return res.status(400).json({ msg: "Admin with given email not found" });
      }
      //check the password 
      if (admin.password !== password) {
        return res.status(400).json({ msg: "Password is incorrect" });
      }
      const token = jwt.sign({adminEmail : admin.email}, JWT_SECRET);
      res.status(200).json({ token, msg: "Admin logged in successfully.." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
});


router.get("/products", async(req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
})

// router.post("/addproduct", verifyAdmin ,async (req, res) => {
//   try {
//     console.log(req.body,'This is body')
//     const productMap = req.body;
    
//     // Validate all products first
//     for (const product of productMap) {
//       const { title, price, image, category, subCategory } = product;
//       if (!title) {
//         return res.status(400).json({ msg: "title field not found" });
//       }
//       if (!image) {
//         return res.status(400).json({ msg: "image link field not found " });
//       }
//       if (!price) {
//         return res.status(400).json({ msg: "Price field not found" });
//       }
//       if (!category) {
//         return res.status(400).json({ msg: "Category field not found" });
//       }
//       if (!subCategory) {
//         return res.status(400).json({ msg: "subCategory field not found" });
//       }
//     }
    
//     // Create all products
//     const createdProducts = await Promise.all(
//       productMap.map(product => {
//         const { title, price, image, category, subCategory } = product;
//         return Product.create({ title, image, price, category, subCategory });
//       })
//     );
    
//     // Send a single response after all products are created
//     return res.status(200).json({ 
//       products: createdProducts, 
//       msg: "Products added successfully.." 
//     });
//   }
//   catch (err) {
//     console.error(err);
//     return res.status(500).json({ msg: "Internal Server Error" });
//   }
// });

router.post("/addproduct", verifyAdmin, async (req, res) => {
  try {
    console.log(req.body, 'This is body');
    const { title, price, image, category, subCategory } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "title field not found" });
    }
    if (!image) {
      return res.status(400).json({ msg: "image link field not found " });
    }
    if (price === undefined || price === null) {
      return res.status(400).json({ msg: "Price field not found" });
    }
    if (!category) {
      return res.status(400).json({ msg: "Category field not found" });
    }
    if (!subCategory) {
      return res.status(400).json({ msg: "subCategory field not found" });
    }

    // Await the creation of the product
    const product = await Product.create({ title, image, price, category, subCategory });

    return res.status(200).json({
      product,
      msg: "Product added successfully."
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

router.put("/updateProduct/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log(productId)
    const { title, price, image } = req.body;
    if (!title) {
      return res.status(400).json({ msg: "title field not found" });
    }
    if (!image) {
      return res.status(400).json({ msg: "image link field not found " });
    }
    if (!price) {
      return res.status(400).json({ msg: "Price field not found" });
    }
    console.log(productId);
    console.log(")a90fsi09dasiuf09uasd");
    let product = await Product.findById(productId);     
    if (!product) {       
      return res.status(400).json({ msg: "Product with given id not found" });     
    }      

    product = await Product.findByIdAndUpdate(productId, { title, price, image }, { new: true });
    res.status(200).json({ product, msg: "Product details updated successfully.." });
  } catch(e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});
router.delete("/delete/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // if (!mongoose.Types.ObjectId.isValid(productId)) {
    //   return res.status(400).json({ msg: "Invalid product ID format" });
    // }
    
    const product = await Product.findByIdAndDelete(productId);

    if (!product) return res.status(404).json({ msg: "Product with the given ID not found" });
    res.status(200).json({ product, msg: "Product deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;