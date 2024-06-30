const mongoose = require("mongoose");
const Car = require("../models/Car");

const getCars = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const cars = await Car.find()
      .limit(limit)
      .skip(limit * (page - 1));

    const total = await Car.countDocuments();

    res.status(200).json({
      error: false,
      message: "Success",
      data: cars || [],
      page,
      limit,
      total,
    });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

const getSingleCar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).json({ error: true, message: "Invalid id" });
    }

    const car = await Car.findById(id);

    if (!car) {
      return res.status(200).json({ error: true, message: "Car not found" });
    }

    res.status(200).json({ error: false, message: "Success", data: car });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

const createCars = async (req, res) => {
  try {
    const { licensePlate, brand, model, remark } = req.body;

    if (!licensePlate || !brand || !model) {
      return res.status(400).json({ error: true, message: "Bad request" });
    }

    await Car.create({ licensePlate, brand, model, remark });
    res.status(201).json({ error: false, message: "Success" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

const editCars = async (req, res) => {
  try {
    const { id } = req.params;
    const { licensePlate, brand, model, remark } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).json({ error: true, message: "Invalid id" });
    }

    if (!licensePlate || !brand || !model) {
      return res.status(400).json({ error: true, message: "Bad request" });
    }

    const car = await Car.findByIdAndUpdate(id, req.body, { new: true });

    if (!car) {
      return res.status(200).json({ error: true, message: "Car not found" });
    }

    res.status(200).json({ error: false, message: "Success" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

const deleteCars = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).json({ error: true, message: "Invalid id" });
    }

    const car = await Car.findByIdAndDelete(id, req.body, { new: true });

    if (!car) {
      return res.status(200).json({ error: true, message: "Car not found" });
    }

    res.status(200).json({ error: false, message: "Success" });
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

module.exports = { getCars, getSingleCar, createCars, editCars, deleteCars };
