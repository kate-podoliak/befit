const controller = require("../controllers/visit.controller");
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
        "/api/admin/visit",
        [authJwt.verifyToken],
        controller.createVisit
    );
    app.post(
        "/api/admin/history",
        [authJwt.verifyToken],
        controller.allVisitsByUser
    );
    app.patch(
        "/api/admin/visit",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateVisit
    );
    app.delete(
        "/api/admin/visit",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteVisit
    );
    app.get(
        "/api/admin/visit",
        [authJwt.verifyToken],
        controller.allVisits
    );
};