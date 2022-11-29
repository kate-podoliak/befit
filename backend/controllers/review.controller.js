const db = require("../models");

const Review = db.review;

const createReview = async (req, res) => {
    const { text, userId } = req.body;
    const newReview = new Review({ text, userId });
    const savedReview = await newReview.save().catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається додати відгук на даний момент." 
        });
    });
    if (savedReview) {
        return res.status(200).send({ 
            message: "Відгук успішно додано." 
        });
    }
}

const deleteReview = async (req, res) => {
    const reviewId = req.body.reviewId;
    if (!reviewId) {
        return res.status(400).send({
            message: "Необхідний ID відгука."
        })
    }
    const deletedReview = await Review.destroy({
        where: {
            id: reviewId
        }
    }).catch((err) => {
        console.log("Error: ", err);
        return res.status(500).json({ 
            error: "Не вдається видалити відгук на даний момент." 
        });
    });
    if (deletedReview) {
        return res.status(200).send({ 
            message: "Відгук успішно видалено." 
        });
    }
}

const allReviews = async (req, res) => {
    let reviews = [];
    const review = await Review.findAll().catch((err) => {console.log("Error: ", err);});
    for (let i = 0; i < review.length; i++) {       
        reviews.push({
            id: review[i].id,
            text: review[i].text,
            createdAt: review[i].createdAt,
            user: await db.user.findOne({where: {id: review[i].userId}})
        });
    }
    return res.status(200).send(reviews);
}

module.exports = {
    createReview,
    deleteReview,
    allReviews
}