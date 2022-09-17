const { Users } = require("../Moduls/users.modul");
const { Tasks } = require("../Moduls/tasks.modul");

const getUsers = async (req, res) => {
  try {
    const user = await Users.findAll({
      include: [
        {
          model: Tasks,
          attributes: ["title", "limiteDate", "startDate", "status"],
        },
      ],
    });
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const postUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUsers = await Users.create({ name, email, password });
    res.status(201).json({
      status: "Success",
      data: {
        newUsers,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUsers = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { users } = req;
    await users.update({ name, email });
    res.status(204).json({
      status: "Success",
      data: { users },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUsers = async (req, res) => {
  try {
    const { users } = req;
    await users.update({ status: "Deleted" });
    res.status(204).json({
      status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
};
