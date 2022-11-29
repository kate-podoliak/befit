const controller = require("../controllers/class.controller");
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
        "/api/admin/class",
        [authJwt.verifyToken],
        controller.createClass
    );
    app.post(
        "/api/admin/classes",
        [authJwt.verifyToken],
        controller.allClassesByTypeAndTrainer
    );
    app.patch(
        "/api/admin/class",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateClass
    );
    app.delete(
        "/api/admin/class",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteClass
    );
    app.get(
        "/api/admin/class",
        controller.allClasses
    );
};