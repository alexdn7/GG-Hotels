const express = require("express");
const {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} = require("../controllers/HotelController");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();

router.get("/", getAllHotels);
router.get("/:id", getHotelById);
router.post("/add", createHotel);
router.put("/update/:id", updateHotel);
router.delete("/delete/:id", deleteHotel);

module.exports = router;
