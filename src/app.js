const express = require("express");
const { router } = require("./routes");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use("/uploads", express.static(path.resolve(__dirname, "../", "uploads")));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  app.use(cors());
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log("Server is running 3000");
});
