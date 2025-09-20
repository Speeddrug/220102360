const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// simple API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Backend API 🚀" });
});

// another example
app.post("/api/echo", (req, res) => {
  res.json({ youSent: req.body });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
