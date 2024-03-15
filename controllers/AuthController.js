const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { request, response } = require("express");
const { StatusCodes } = require("http-status-codes");
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const register = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    if (await prisma.user.findUnique({ where: { email: email } })) {
      throw new Error("Already exists an user with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const savedUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        role: "USER",
        password: hashedPassword,
      },
    });

    const { id, role } = savedUser;

    const token = jwt.sign(
      {
        id,
        name,
        email,
        role,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    response.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json({ message: `${error}` });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const existingUser = await prisma.user.findUniqueOrThrow({
      where: { email: email },
    });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      throw new Error("Incorrect password!");
    }

    const { id, name, role } = existingUser;
    const token = jwt.sign(
      {
        id,
        name,
        email,
        role,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    response.status(StatusCodes.ACCEPTED).json({ token });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json({ message: `${error}` });
  }
};

module.exports = {
  register,
  login,
};
