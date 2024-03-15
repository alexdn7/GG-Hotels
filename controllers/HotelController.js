const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new PrismaClient();

const createHotel = async (request, response) => {
  try {
    const hotel = await prisma.hotel.create({ data: request.body });
    response.status(StatusCodes.CREATED).json(hotel);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error creating hotel: ${error}` });
  }
};

const getAllHotels = async (request, response) => {
  try {
    const hotels = await prisma.hotel.findMany();
    response.status(StatusCodes.OK).json(hotels);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error fetching data: ${error}` });
  }
};

const getHotelById = async (request, response) => {
  try {
    const { id } = request.params;
    const hotel = await prisma.hotel.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    response.status(StatusCodes.OK).json(hotel);
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error fetching data: ${error}` });
    console.error(error);
  }
};

const updateHotel = async (request, response) => {
  try {
    const { id } = request.params;
    const hotel = await prisma.hotel.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    const updatedHotel = await prisma.hotel.update({
      where: { id: parseInt(id) },
      data: request.body,
    });
    response
      .status(StatusCodes.OK)
      .json({ message: `Hotel with id: ${id} successfully updated!` });
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error updating hotel: ${error}` });
  }
};

const deleteHotel = async (request, response) => {
  try {
    const { id } = request.params;
    const hotel = await prisma.hotel.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });
    const deletedHotel = await prisma.hotel.delete({
      where: { id: parseInt(id) },
    });
    response
      .status(StatusCodes.OK)
      .json({ message: `Hotel with id: ${id} successfully deleted!` });
  } catch (error) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `Error deleting hotel: ${error}` });
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
};
