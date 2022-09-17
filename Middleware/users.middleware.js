const { Users } = require("../Moduls/users.modul");

const usersExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await Users.findOne({ where: { id } });

    //IF de Users does not exists send a message
    if (!users) {
      return res.status(404).json({
        status: "Error",
        message: "User was not found",
      });
    }
    //req.anyPropName = 'anyValue'
    req.users = users;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { usersExists };
