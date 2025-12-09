const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const authController = require("../controllers/authControllers");

router.post("/login", authController.loginUser);
router.post("/refresh", authController.requestRefreshToken);
router.post("/logout", authController.logoutUser);

router.get("/dashboard", verify, (req, res) => {
  res.json({
    message: `Welcome to Dashboard, ${req.user.name}`,
    secrecData: [100, 200, 300],
  });
});

module.exports = router;
