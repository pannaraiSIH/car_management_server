require("dotenv").config();

const CarRouter = require("./routes/CarRouter");
const connectDb = require("./db/connectDb");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Car Management");
});

app.use("/api/cars", CarRouter);

const startServer = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`start server on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
