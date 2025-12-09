const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenUtils");

const users = [
  {
    id: 1,
    email: "nphuchoang.itus@gmail.com",
    password: "mySuperPassword@123",
  },
];

let refreshTokens = [];

const loginUser = (req, res) => {
  const { email, password } = req.body;
  // todo: hash password
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);

  // set cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "strict",
  });

  res.json({ user, accessToken });
};

const requestRefreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(404).json({
      message: "You are not authenticated!",
    });
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({
      message: "Refresh token is not valid!",
    });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token is not valid!" });

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
};

const logoutUser = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Logged out successfully",
  });
};

module.exports = { loginUser, requestRefreshToken, logoutUser };
