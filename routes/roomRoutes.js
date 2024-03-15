const express = require("express");
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/RoomController");
const router = express.Router();
const {  verifyAuth, verifyAdmin } = require("../middlewares/authorization");

router.post("/add", verifyAuth, verifyAdmin,createRoom);
router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.put("/update/:id", verifyAuth, verifyAdmin, updateRoom);
router.delete("/delete/:id", verifyAuth, verifyAdmin, deleteRoom);

module.exports = router;
