const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
const corsOptions = { origin: process.env.URL || "*" };
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use("/auth", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/todos", require("./routes/todos"));

const PORT = process.env.PORT || 4000;

// catch all

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
