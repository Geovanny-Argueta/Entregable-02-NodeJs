const dotenv = require("dotenv");
const { app } = require("./app");

//Utils
const { initModul } = require("./Moduls/init.modul");
const { db } = require("./Utils/database.utils");

dotenv.config({ path: "./config.env" });

const startServer = async () => {
  try {
    await db.authenticate();

    //Establish relation between the models:
    initModul();

    await db.sync();

    //Set port
    const PORT = 4000;

    app.listen(PORT, () => {
      console.log("Express server is running well!");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
