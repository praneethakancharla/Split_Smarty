/* eslint-disable no-unused-vars */
const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/database.js");
const userRoutes = require("./routes/user.routes.js");
const splitgroupRoutes = require("./routes/splitgroup.routes.js");
const cors = require("cors");
const moneyRoutes = require("./routes/money.routes.js");
const settleRoutes = require("./routes/settle.routes.js");

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

app.use(cors());
app.use(express.json());

async function ConnectToDatabaseAuthentication() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("All model was just checked!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

userRoutes(app);
splitgroupRoutes(app);
moneyRoutes(app);
settleRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
ConnectToDatabaseAuthentication();

// TODO: Convert the codebase to ESM format so that import statements can be used.
// TODO: Make a seperate file for routing.
// TODO: Update the controllers according to the architecture of databases.
// TODO: Export classes properly in controller files. Their import statments for them not working
// TODO: Implementing simplified transaction algorithm.
// TODO: Try to structurise the codebase to mvc architecture.
