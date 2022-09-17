const { Tasks } = require("../Moduls/tasks.modul");
const { Users } = require("../Moduls/users.modul");

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll({
      include: [{ model: Users, attributes: ["id", "name", "status"] }],
    });
    res.status(200).json({
      status: "Success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getStatusTasks = async (req, res) => {
  try {
    const { status } = req.params;
    const tasksStatus = ["active", "completed", "late", "cancelled"];

    const tasks = await Tasks.findAll({ where: { status } });

    if (status.includes(tasksStatus)) {
      return res.status(404).json({
        status: "Error",
        message: "Status not found",
      });
    }
    res.status(202).json({
      status: "Success",
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const postTasks = async (req, res) => {
  try {
    const { userId, title, limiteDate, startDate } = req.body;
    const newTasks = await Tasks.create({
      userId,
      title,
      limiteDate,
      startDate,
    });
    res.status(201).json({
      status: "Success",
      data: {
        newTasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTasks = async (req, res) => {
  try {
    const { finishDate } = req.body;
    const { tasks } = req;
    await tasks.update({ finishDate });

    if (tasks.finishDate > tasks.limiteDate) {
      await tasks.update({ status: "Late" });
    } else if (tasks.finishDate <= tasks.limiteDate) {
      await tasks.update({ status: "Completed" });
    }
    res.status(200).json({
      status: "success",
      data: { tasks },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTasks = async (req, res) => {
  try {
    const { tasks } = req;
    await tasks.update({ status: "cancelled" });
    res.status(204).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getTasks,
  postTasks,
  updateTasks,
  deleteTasks,
  getStatusTasks,
  // getTaskStatus
};
