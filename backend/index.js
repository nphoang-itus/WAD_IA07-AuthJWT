const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth");

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
