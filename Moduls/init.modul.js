const { Users } = require("./users.modul");
const { Tasks } = require("./tasks.modul");

const initModul = () => {
  Users.hasMany(Tasks, { foreignKey: "userId" });
  Tasks.belongsTo(Users);
};

module.exports = { initModul };
