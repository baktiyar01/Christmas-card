const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "bsom25cnfaykmnlkft75-mysql.services.clever-cloud.com",
  database: "bsom25cnfaykmnlkft75",
  username: "umoz2xvusf29fapg",
  password: "LNIGFYqyy7RG2DpaEykz",
  port: 3306,
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;
