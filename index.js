const CarRouter = require("./routes/CarRouter");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/cars", CarRouter);

const startServer = () => {
  app.listen(port, () => {
    console.log(`start server on http://localhost:${port}`);
  });
};

startServer();
