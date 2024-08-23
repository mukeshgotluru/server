const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const Register = require("./model");

mongoose
  .connect(
    "mongodb+srv://mukeshreddy:mukeshreddy@cluster0.a2qya7x.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDb Connected"));

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
// Routes
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new Register({ username, password: hashedPassword });
    await user.save();
    res.send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Login
/*
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Register.findOne({ username });
    if (!user) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res.send({ token, username: user.username });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
*/

// Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Register.findOne({ username });
    if (!user) {
      return res.status(401).send({ message: "Invalid Username " });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({ message: "Invalid  Password" });
    }

    res.send({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
