let express = require("express");
let router = express.Router();
let controller = require("../controller/UserController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

router.get("/api", controller.getUser);

router.post("/signup", controller.postSignUp);

// router.get("/error", controller.error);

router.post("/signin", controller.postSignIn);

router.get("/info", AuthMiddleware, controller.getUserInfo);

module.exports = router;
