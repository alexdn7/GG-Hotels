const { PrismaClient } = require("@prisma/client");
const { response, request } = require("express");
const { StatusCodes } = require("http-status-codes");
const prisma = new PrismaClient();

const validateReservation = async (request, response, next) => {
  try {
    const { userId, hotelId, roomId } = request.body;
    const reservation = request.body;
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: parseInt(userId) },
    });

    const hotel = await prisma.hotel.findUniqueOrThrow({
      where: { id: parseInt(hotelId) },
    });
    if (hotel.available_rooms === 0) {
      throw new Error(
        `There are no rooms available for the selected hotel: ${hotelId}`
      );
    } else if (hotel.allowPets === false && reservation.hasPets === true) {
      throw new Error(`Pets are no allowed in this hotel! ${hotelId}`);
    } else if (
      hotel.parking === false &&
      reservation.needParkingSpot === true
    ) {
      throw new Error(`This hotel doesn't offer a parking slot! ${hotelId}`);
    }

    const room = await prisma.room.findUniqueOrThrow({
      where: { id: parseInt(roomId) },
    });
    if (room.available === false) {
      throw new Error(
        `Room with ID ${roomId} is occupied until ${room.availableFrom}`
      );
    } else if (room.allowPets === false && reservation.hasPets === true) {
      throw new Error(`Pets are not allowed in this room (ID ${roomId}!`);
    } else if (
      room.offersParkingSpot === false &&
      reservation.needParkingSpot === true
    ) {
      throw new Error(
        `Reservation for this room (ID ${roomId}) doesn't include a parking spot!`
      );
    } else if (room.max_capacity < reservation.number_of_people) {
      throw new Error(`You exceed room (ID ${roomId}) capacity!`);
    }
    next();
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json({ message: `${error}` });
  }
};

module.exports = validateReservation;
