const config = require("../config/auth.config.js");
const db = require("../models");
const jwt = require("jsonwebtoken");

const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "Токен не існує."
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized."
            });
        }
        req.id = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.id).then(user => {
        user.getRole().then(role => {
            if (role.name === "admin") {
                return next();
            }
            return res.status(403).send({
                message: "Потрібна роль адміністратора."
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
};

module.exports = authJwt;