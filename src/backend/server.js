const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const passport = require("passport");
require("./config/passport");

dotenv.config();
connectDB();

const app = express();

app.use(
  session({
      secret: process.env.SESSION_SECRET || "yourSecretKey",
      resave: false,
      saveUninitialized: false,
      cookie: {
          secure: false, // Set to true in production with HTTPS
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
      },
  })
);

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./routes/auth"); // ✅ Use require instead of import
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


