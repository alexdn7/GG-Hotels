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
    const queryKeys = Object.keys(request.query);
    const createdQuery = {};
    let sortingCriteria;
    let sortingDirection;

    if (queryKeys.length === 0) {
      var hotels = await prisma.hotel.findMany();
    } else {
      queryKeys.forEach((key) => {
        if (key !== "sort" && key !== "orderBy") {
          if (key === "stars") {
            createdQuery[key] = parseInt(request.query[key]);
          } else if (
            ["parking", "allowPets"].includes(key)
          ) {
            createdQuery[key] = request.query[key] === "true";
          } else if (key === "location") {
            createdQuery[key] = request.query[key];
          } else {
            throw new Error("Invalid parameter!");
          }
        } else if (key === "orderBy") {
          sortingCriteria = request.query[key];
        } else if (key === "sort") {
          sortingDirection = request.query[key];
        }
      })

      if (sortingCriteria) {
        let orderByBody = sortingDirection
          ? { [sortingCriteria]: sortingDirection }
          : { [sortingCriteria]: "asc" };
        var hotels = await prisma.hotel.findMany({
          where: { ...createdQuery },
          orderBy: [orderByBody],
        });
      } else {
        var hotels = await prisma.hotel.findMany({
          where: { ...createdQuery },
        });
      }
    }

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
