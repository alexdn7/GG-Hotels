const express = require("express");
const {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} = require("../controllers/HotelController");
const { verifyAuth,verifyAdmin } = require("../middlewares/authorization");
const router = express.Router();

router.post("/add", verifyAuth, verifyAdmin, createHotel);
router.get("/", getAllHotels);
router.get("/:id", getHotelById);
router.put("/update/:id", verifyAuth, verifyAdmin, updateHotel);
router.delete("/delete/:id", verifyAuth, verifyAdmin, deleteHotel);

module.exports = router;
