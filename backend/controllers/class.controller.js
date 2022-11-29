const db = require("../models");

const Class = db.class;

const createClass = async (req, res) => {
    const { start_time, end_time, price, place, count, typeId, trainerId, adminId } = req.body;
    const newClass = new Class({ start_time, end_time, price, place, count, typeId, trainerId, adminId });
    const savedClass = await newClass.save().catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається додати заняття на даний момент." 
        });
    });
    if (savedClass) {
        return res.status(200).send({ 
            message: "Заняття успішно додано." 
        });
    }
}

const updateClass = async (req, res) => {
    const { classId, start_time, end_time, price, place, count, typeId, trainerId, adminId } = req.body;
    if (!classId) {
        return res.status(400).send({
            message: "Необхідний ID заняття."
        })
    }
    const updatedClass = await Class.update({ start_time, end_time, price, place, count, typeId, trainerId, adminId }, {
        where: {
            id: classId
        }
    }).catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається обновити заняття на даний момент." 
        });
    });
    if (updatedClass) {
        return res.status(200).send({ 
            message: "Заняття успішно оновлено." 
        });
    }
}

const deleteClass = async (req, res) => {
    const classId = req.body.classId;
    if (!classId) {
        return res.status(400).send({
            message: "Необхідний ID заняття."
        })
    }
    const deletedClass = await Class.destroy({
        where: {
            id: classId
        }
    }).catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається видалити заняття на даний момент." 
        });
    });
    if (deletedClass) {
        return res.status(200).send({ 
            message: "Заняття успішно видалено." 
        });
    }
}

const allClasses = async (req, res) => {
    let classes = [];
    const clas = await Class.findAll().catch((err) => {console.log("Error: ", err);});
    for (let i = 0; i < clas.length; i++) {
        classes.push({
            id: clas[i].id,
            start_time: clas[i].start_time,
            end_time: clas[i].end_time,
            price: clas[i].price,
            place: clas[i].place,
            count: clas[i].count,
            trainerId: clas[i].trainerId,
            typeId: clas[i].typeId,
            trainer: await db.user.findOne({where: {id: clas[i].trainerId}}),
            admin: await db.user.findOne({where: {id: clas[i].adminId}}),
            type: await db.type.findOne({where: {id: clas[i].typeId}})
        });
    }
    return res.status(200).send(classes);
}

const allClassesByTypeAndTrainer = async (req, res) => {
    let classes = [];
    const clas = await Class.findAll({
        where: { 
            typeId: req.body.typeId,
            trainerId: req.body.trainerId
        }
    }).catch((err) => {console.log("Error: ", err);});
    for (let i = 0; i < clas.length; i++) {
        classes.push({
            id: clas[i].id,
            start_time: clas[i].start_time,
            end_time: clas[i].end_time,
            price: clas[i].price,
            place: clas[i].place,
            count: clas[i].count,
            trainer: await db.user.findOne({where: {id: clas[i].trainerId}}),
            admin: await db.user.findOne({where: {id: clas[i].adminId}}),
            type: await db.type.findOne({where: {id: clas[i].typeId}})
        });
    }
    return res.status(200).send(classes);
}

module.exports = {
    createClass,
    updateClass,
    deleteClass,
    allClasses,
    allClassesByTypeAndTrainer
}