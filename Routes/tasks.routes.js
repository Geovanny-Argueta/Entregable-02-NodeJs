const express = require("express");
const { body, validationResult } = require("express-validator");

const {
  getTasks,
  postTasks,
  updateTasks,
  deleteTasks,
  getStatusTasks,
} = require("../Controller/tasks.control");

const { tasksExists } = require("../Middleware/tasks.middleware");
const { tasksValidators } = require("../Middleware/validators.middlaware");

const tasksRoutes = express.Router();
tasksRoutes.get("/", getTasks);
tasksRoutes.get("/:status", getStatusTasks);
tasksRoutes.post("/", tasksValidators, postTasks);
tasksRoutes.patch("/:id", tasksExists, updateTasks);
tasksRoutes.delete("/:id", tasksExists, deleteTasks);

module.exports = { tasksRoutes };
