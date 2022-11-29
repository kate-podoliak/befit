const db = require("../models");
let bcrypt = require("bcryptjs");

const Role = db.role;
const User = db.user;

const createUser = async (req, res) => {
    const { surname, name, email } = req.body;
    const alreadyExistsUser = await User.findOne({ 
        where: { 
            email 
        } 
    });
    if (alreadyExistsUser) {
        return res.status(400).send({
            message: "Користувач із цією електронною адресою вже існує."
        });
    }
    const role = await Role.findOne({
        where: {
            name: req.body.role
        }
    });
    if (!role) {
        return res.status(404).send({
            message: "Роль не знайдено."
        });
    }
    const newUser = new User({ surname, name, password: bcrypt.hashSync(req.body.password, 8), email, roleId: role.id });
    const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається зареєструвати користувача на даний момент." 
        });
    });
    if (savedUser) {
        return res.status(200).send({ 
            message: "Користувача було успішно зареєстровано."
        });
    }
};

const updateUser = async (req, res) => {
    const { userId, surname, name } = req.body;
    if (!userId) {
        return res.status(400).send({
            message: "Необхідний ID користувача."
        })
    }
    if (req.body.role) {
        const role = await Role.findOne({
            where: {
                name: req.body.role
            }
        });
        if (!role) {
            return res.status(404).send({
                message: "Роль не знайдено."
            });
        }
        const updatedUser = await User.update({ surname, name, roleId: role.id }, {
            where: {
                id: userId
            }
        }).catch((err) => {
            console.log("Error: ", err);
            return res.status(500).json({ 
                error: "Не вдається оновити дані користувача на даний момент."
            });
        });
        if (updatedUser) {
            return res.status(200).send({ 
                message: "Користувача успішно оновлено." 
            });
        }
    }
};

const deleteUser = async (req, res) => {
    const userId = req.body.userId;
    if (!userId) {
        return res.status(400).send({
            message: "Необхідний ID користувача."
        })
    }
    const deletedUser = await User.destroy({
        where: {
            id: userId
        }
    }).catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається видалити користувача на даний момент." 
        });
    });
    if (deletedUser) {
        return res.status(200).send({ 
            message: "Користувача успішно видалено." 
        });
    }
};

const allUsers = async (req, res) => {
    const users = await User.findAll().catch((err) => {
        console.log("Error: ", err);
    });
    return res.status(200).send(users);
}

const allTrainers = async (req, res) => {
    const trainers = await User.findAll({ 
        /*where: { 
            roleId: 2
        }*/
        include: [{
            model: Role,
            as: "role",
            where: { 
                name: "trainer"
            },
        }]
    }).catch((err) => {
        console.log("Error: ", err);
    });
    return res.status(200).send(trainers);
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    allUsers,
    allTrainers
}