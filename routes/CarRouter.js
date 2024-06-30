const express = require("express");
const {
  getCars,
  getSingleCar,
  createCars,
  editCars,
  deleteCars,
} = require("../controllers/CarController");
const router = express.Router();

router.get("/", getCars);
router.get("/:id", getSingleCar);
router.post("/", createCars);
router.patch("/:id", editCars);
router.delete("/:id", deleteCars);

module.exports = router;
