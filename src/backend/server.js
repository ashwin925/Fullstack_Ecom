const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes"); // ✅ Import new routes
require("dotenv").config();
require("./config/passport");

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // ✅ Register new user routes

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log(err));
