const db = require("../models");

const Type = db.type;

const createType = async (req, res) => {
    const { name, description } = req.body;
    const newType = new Type({ name, description });
    const savedType = await newType.save().catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається додати тип на даний момент." 
        });
    });
    if (savedType) {
        return res.status(200).send({ 
            message: "Тип успішно додано." 
        });
    }
}

const updateType = async (req, res) => {
    const { typeId, name, description } = req.body;
    if (!typeId) {
        return res.status(400).send({
            message: "Необхідний ID типа."
        })
    }
    const updatedType = await Type.update({ name, description }, {
        where: {
            id: typeId
        }
    }).catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається обновити тип на даний момент." 
        });
    });
    if (updatedType) {
        return res.status(200).send({ 
            message: "Тип успішно оновлено." 
        });
    }
}

const deleteType = async (req, res) => {
    const typeId = req.body.typeId;
    if (!typeId) {
        return res.status(400).send({
            message: "Необхідний ID типа."
        })
    }
    const deletedType = await Type.destroy({
        where: {
            id: typeId
        }
    }).catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається видалити тип на даний момент." 
        });
    });
    if (deletedType) {
        return res.status(200).send({ 
            message: "Тип успішно видалено." 
        });
    }
}

const allTypes = async (req, res) => {
    const types = await Type.findAll().catch((err) => {
        console.log("Error: ", err);
    });
    return res.status(200).send(types);
}

module.exports = {
    createType,
    updateType,
    deleteType,
    allTypes
}