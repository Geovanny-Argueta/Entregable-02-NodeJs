const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
} = require("../Controller/users.control");

const { usersExists } = require("../Middleware/users.middleware");
const { userValidators } = require("../Middleware/validators.middlaware");

const usersRoutes = express.Router();
usersRoutes.get("/", getUsers);
usersRoutes.post("/", userValidators, postUsers);
usersRoutes.patch("/:id", usersExists, updateUsers);
usersRoutes.delete("/:id", usersExists, deleteUsers);

module.exports = { usersRoutes };
