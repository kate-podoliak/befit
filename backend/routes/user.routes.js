const controller = require("../controllers/user.controller");
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
        "/api/admin/user",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.createUser
    );
    app.patch(
        "/api/admin/user",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateUser
    );
    app.delete(
        "/api/admin/user",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteUser
    );
    app.get(
        "/api/admin/user",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.allUsers
    );
    app.get(
        "/api/admin/trainer",
        [authJwt.verifyToken],
        controller.allTrainers
    );
};