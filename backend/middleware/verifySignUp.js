const db = require("../models");
const User = db.user;
const ROLES = db.ROLES;

checkDuplicateUserOrEmail = async (req, res, next) => {
    // const alreadyExistsUser = await User.findOne({
    //     where: {
    //         name: req.body.name
    //     }
    // });
    // if (alreadyExistsUser) {
    //     return res.status(400).send({
    //         message: "Помилка! Ім'я користувача вже використовується."
    //     });
    // }
    const alreadyExistsEmail = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if (alreadyExistsEmail) {
        return res.status(400).send({
            message: "Введена електронна пошта вже використовується."
        });
    }
    next();
};

checkRoleExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).send({
                    message: "Помилка! Роль " + req.body.roles[i] + " не існує."
                });
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUserOrEmail: checkDuplicateUserOrEmail,
    checkRoleExisted: checkRoleExisted
};

module.exports = verifySignUp;