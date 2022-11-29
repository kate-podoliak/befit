module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("reviews", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: Sequelize.STRING
        }
    });
    return Review;
};