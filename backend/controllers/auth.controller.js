const db = require("../models");
const config = require("../config/auth.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = db.user;

const signup = async (req, res) => {
    const { surname, name, email } = req.body;
    const newUser = new User({ surname, name, password: bcrypt.hashSync(req.body.password, 8), email, roleId: 1 });
    const savedUser = await newUser.save().catch((err) => {
        return res.status(500).json({ 
            error: "Помилка. Не вдається зареєструвати користувача на даний момент." 
        });
    });
    if (savedUser) {
        return res.status(200).send({ 
            message: "Користувача було успішно зареєстровано." 
        });
    }
};

const signin = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) {
        return res.status(404).send({ 
            message: "Користувача з введеною поштою не знайдено."
        });
    }
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({
            message: "Недійсний пароль."
        });
    }
    let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    user.getRole().then(role => {
        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            role: role.name.toUpperCase(),
            accessToken: token
        });
    });
};

module.exports = {
    signup,
    signin
}