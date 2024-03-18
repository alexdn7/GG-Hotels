const express = require("express");
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} = require("../controllers/ReservationController");
const validateReservation = require("../middlewares/validateReservation");
const { verifyAuth, verifyAdmin } = require("../middlewares/authorization");
const router = express.Router();

router.post("/add", verifyAuth, validateReservation, createReservation);
router.get("/", verifyAuth, verifyAdmin, getAllReservations);
router.get("/:id", verifyAuth, getReservationById);
router.patch("/update/:id", verifyAuth, updateReservation);
router.delete("/delete/:id", verifyAuth, deleteReservation);

module.exports = router;
