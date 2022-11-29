const controller = require("../controllers/type.controller");
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
        "/api/admin/type",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.createType
    );
    app.patch(
        "/api/admin/type",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateType
    );
    app.delete(
        "/api/admin/type",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteType
    );
    app.get(
        "/api/admin/type",
        [authJwt.verifyToken],
        controller.allTypes
    );
};