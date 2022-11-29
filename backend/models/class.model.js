module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("classes", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        start_time: {
            type: Sequelize.DATE
        },
        end_time: {
            type: Sequelize.DATE
        },
        price: {
            type: Sequelize.INTEGER
        },
        place: {
            type: Sequelize.INTEGER(40)
        },
        count: {
            type: Sequelize.INTEGER
        }
    });
    return Class;
};