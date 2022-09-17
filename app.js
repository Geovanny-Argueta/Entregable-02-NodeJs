const express = require("express");

//Routers
const { usersRoutes } = require("./Routes/users.routes");
const { tasksRoutes } = require("./Routes/tasks.routes");

//Init our Express App
const app = express();

//Enable express app to receive JSON data
app.use(express.json());

//Define EndPoints
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/tasks", tasksRoutes);

//Catch not exist endpoints
app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `${req.method} ${req.url} Does not exists in our Server`,
  });
});

module.exports = { app };
