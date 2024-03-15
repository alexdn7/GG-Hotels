const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new PrismaClient();

const createRoom = async (request, response) => {
  try {
    const { hotelId } = request.body;
    const hotel = await prisma.hotel.findUniqueOrThrow({
      where: { id: parseInt(hotelId) },
    });
    const room = await prisma.room.create({
      data: { ...request.body, availableFrom: new Date() },
    });
    response.status(StatusCodes.CREATED).json(room);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error creating room: ${error}` });
  }
};

const getAllRooms = async (request, response) => {
  try {
    const rooms = await prisma.room.findMany();
    response.status(StatusCodes.OK).json(rooms);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error fetching data ${error}` });
  }
};

const getRoomById = async (request, response) => {
  const { id } = request.params;
  try {
    const room = await prisma.room.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    response.status(StatusCodes.OK).json(room);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error fetching data ${error}` });
  }
};

const updateRoom = async (request, response) => {
  try {
    const { id } = request.params;
    const room = await prisma.room.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    const hotel = await prisma.hotel.findUniqueOrThrow({
      where: { id: parseInt(request.body.hotelId) },
    });
    const updatedRoom = await prisma.room.update({
      where: { id: parseInt(id) },
      data: request.body,
    });
    response.status(StatusCodes.OK).json({
      message: `Room with id: ${id} successfully updated!`,
      updatedRoom,
    });
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error updating room: ${error}` });
  }
};

const deleteRoom = async (request, response) => {
  try {
    const { id } = request.params;
    const room = await prisma.room.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    const deletedHotel = await prisma.room.delete({
      where: { id: parseInt(id) },
    });
    response
      .status(StatusCodes.OK)
      .json({ message: "Room successfully deleted!" });
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error deleting room: ${error}` });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
