const { Tasks } = require("../Moduls/tasks.modul");

const tasksExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await Tasks.findOne({ where: { id } });

    //If the tasks not exists send a message
    if (!tasks) {
      return res.status(404).json({
        status: "Error",
        message: "The tasks not exists",
      });
    }
    req.tasks = tasks;
    next();
  } catch (error) {
    console.log(error);
  }
};

//const tasksStatus = async(req, res, next)=>{
//    try {
//        const {status} = req.params;
//       const tasksStatusExists = await Tasks.findOne({where://{status}})

//       if(!tasksStatusExists){
//         return res.status(404).json({
//           status:'Error',
//         message:'The status tasks not exists'
//           })
//     }
//     req.tasksStatusExists = tasksStatusExists;
//    next();
// } catch (error) {
//    console.log(error)
//}
//}

module.exports = { tasksExists };
