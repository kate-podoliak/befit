module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        surname: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(40),
            allowNull: false
        }
    });
    return User;
};
