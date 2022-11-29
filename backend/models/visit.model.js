module.exports = (sequelize, Sequelize) => {
    const Visit = sequelize.define("visits", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        payment: {
            type: Sequelize.BOOLEAN,
        },
        visited: {
            type: Sequelize.BOOLEAN
        }
    });
    return Visit;
};