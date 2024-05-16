require("dotenv").config();
const sequelize = require("./src/config/database.js");
const app = require("./src/app");
const port = process.env.PORT || 3001;

// Ensure the server starts after the database connection is established
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized.");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to synchronize the database:", err);
    process.exit(1);
  });
