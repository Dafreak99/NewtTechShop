const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });
const controller = require("../controller/IndexController");

const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.get("/products", controller.getProduct);

router.post("/add", upload.any(), controller.postAdd);

router.post("/delete", controller.deleteProduct);

router.get("/edit/:id", controller.getEdit);

router.post("/edit/:id", upload.single("image"), controller.postEdit);

router.post("/discount", controller.discountProduct);

router.post("/no-discount", controller.deDiscount);

router.get("/addtocart/:id", AuthMiddleware, controller.addtocart);

router.get("/removefromcart/:id", controller.removefromcart);

router.get("/info/cart", controller.cartInfo);

router.post("/updatecart", controller.updateCart);

router.get("/logout", controller.logout);

router.post("/message", controller.message);

router.post("/product/review", controller.productReview);

module.exports = router;
