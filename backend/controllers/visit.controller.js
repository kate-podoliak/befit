const db = require("../models");

const User = db.user;
const Visit = db.visit;
const Class = db.class;

const createVisit = async (req, res) => {
    const { userId, classId } = req.body;
    const visits = await Visit.findAll({ 
        where: { 
            classId: classId
        }
    });
    const clas = await Class.findOne({
        where: {
            id: classId
        }
    });
    if (visits.length === clas.count) {
        return res.status(400).send({
            message: "Вибачте, aле ви не можете записатися. На обрану дату немає вільних місць."
        });
    }
    else {
        const newVisit = new Visit({
            payment: req.body.payment != null ? req.body.payment : false,
            visited: req.body.visited != null ? req.body.visited : false,
            userId,
            classId
        });
        const savedVisit = await newVisit.save().catch((err) => {
            console.log("Error: ", err);
            return res.status(500).json({ 
                error: "Не вдається додати запис на даний момент." 
            });
        });
        if (savedVisit) {
            return res.status(200).send({ 
                message: "Запис успішно додано." 
            });
        }
    }
}

const updateVisit = async (req, res) => {
    const { visitId, payment, visited, userId, classId } = req.body;
    if (!visitId) {
        return res.status(400).send({
            message: "Необхідний ID запису."
        })
    }
    const updatedVisit = await Visit.update({ payment, visited, userId, classId}, {
        where: {
            id: visitId
        }
    }).catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається обновити запис на даний момент." 
        });
    });
    if (updatedVisit) {
        return res.status(200).send({ 
            message: "Запис успішно оновлено." 
        });
    }
}

const deleteVisit = async (req, res) => {
    const visitId = req.body.visitId;
    if (!visitId) {
        return res.status(400).send({
            message: "Необхідний ID запсиу."
        })
    }
    const deletedVisit = await Visit.destroy({
        where: {
            id: visitId
        }
    }).catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається видалити запис на даний момент." 
        });
    });
    if (deletedVisit) {
        return res.status(200).send({ 
            message: "Запис успішно видалено." 
        });
    }
}

const allVisits = async (req, res) => {
    let visits = [];
    const visit = await Visit.findAll().catch((err) => {console.log("Error: ", err);});
    for (let i = 0; i < visit.length; i++) {       
        const clas = await db.class.findOne({where: {id: visit[i].classId}});
        visits.push({
            id: visit[i].id,
            payment: visit[i].payment,
            visited: visit[i].visited,
            user: await db.user.findOne({where: {id: visit[i].userId}}),
            type: await db.type.findOne({where: {id: clas.typeId}}),
            class: await db.class.findOne({where: {id: visit[i].classId}})
        });
    }
    return res.status(200).send(visits);
}

const allVisitsByUser = async (req, res) => {
    let visits = [];
    const visit = await Visit.findAll({
        where: { 
            userId: req.body.userId
        }
    }).catch((err) => {console.log("Error: ", err);});
    for (let i = 0; i < visit.length; i++) {       
        const clas = await db.class.findOne({where: {id: visit[i].classId}});       
        visits.push({
            id: visit[i].id,
            payment: visit[i].payment,
            visited: visit[i].visited,
            user: await db.user.findOne({where: {id: visit[i].userId}}),
            type: await db.type.findOne({where: {id: clas.typeId}}),
            class: await db.class.findOne({where: {id: visit[i].classId}}),
            trainer: await db.user.findOne({where: {id: clas.trainerId}}),
        });
    }
    return res.status(200).send(visits);
}

module.exports = {
    createVisit,
    updateVisit,
    deleteVisit,
    allVisits,
    allVisitsByUser
}