const router = require("express").Router();
const authController = require("../controllers/authController");
const verify = require("../middleware/verifyJWT");

// Auth Routes
router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.post("/refresh", authController.requestRefreshToken);
router.post("/logout", authController.logoutUser);

// Protected Routes (Ví dụ Dashboard)
router.get("/dashboard", verify, (req, res) => {
  res.json({
    message: `Welcome to Dashboard, ${req.user.name}`,
    secretData: [100, 200, 300],
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email || "admin@gmail.com", // Thêm email nếu có trong token
    },
  });
});

module.exports = router;
