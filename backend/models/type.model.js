module.exports = (sequelize, Sequelize) => {
    const Type = sequelize.define("types", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(40)
        },
        description: {
            type: Sequelize.STRING(255)
        }
    });
    return Type;
};