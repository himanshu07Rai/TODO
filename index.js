const express = require("express");
const cors = require("cors");
const path = require("path");
const createError = require("http-errors");

const app = express();

app.use(express.json());
const corsOptions = { origin: process.env.URL || "*" };
app.use(cors(corsOptions));

//if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "client/build")));
//}

app.get("/api", (req, res) => {
  res.send("🚀 Server running 🚀");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/todos", require("./routes/todos"));

app.use((req, res, next) => {
  next(createError(404, "Not found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log("Running on port 5000");
});
