const dbConfig = require("../config/db.config");
const mysql = require("mysql2");
const Sequelize = require("sequelize");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
});

connection.query(
    `CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`,
    function (err, results) {
        //console.log(results);
        //console.log(err);
    }
);

connection.end();

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    //operatorsAliases: false,
    logging: false // ---> disable logging
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.type = require("../models/type.model.js")(sequelize, Sequelize);
db.review = require("../models/review.model.js")(sequelize, Sequelize);
db.class = require("../models/class.model.js")(sequelize, Sequelize);
db.visit = require("../models/visit.model.js")(sequelize, Sequelize);

db.user.belongsTo(db.role, {
    foreignKey: "roleId",
});

db.review.belongsTo(db.user, {
    foreignKey: "userId",
});

db.class.belongsTo(db.user, {
    foreignKey: "trainerId"
});
db.class.belongsTo(db.user, {
    foreignKey: "adminId"
});
db.class.belongsTo(db.type, {
    foreignKey: "typeId"
});

db.visit.belongsTo(db.user, {
    foreignKey: "userId"
});
db.visit.belongsTo(db.class, {
    foreignKey: "classId"
});

db.ROLES = ["user", "admin", "trainer"];

module.exports = db;