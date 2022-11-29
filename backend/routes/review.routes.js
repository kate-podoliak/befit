const controller = require("../controllers/review.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/api/admin/review",
        [authJwt.verifyToken],
        controller.createReview
    );
    app.delete(
        "/api/admin/review",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteReview
    );
    app.get(
        "/api/admin/review",
        controller.allReviews
    );
};