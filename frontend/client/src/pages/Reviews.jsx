import React, {useState, useEffect} from "react";
import Auth from "../services/auth.js";
import Review from "../services/review.js";
import { Col, Container, Form, Row} from "react-bootstrap";
import Moment from "react-moment";
import {Link} from "react-router-dom";

const initialState = {
    text: "",
    createdAt: ""
};

const Reviews = () => {
    const currentUser = Auth.getCurrentUser();

    const [reviews, setReviews] = useState([]);
    const [data, setData] = useState(initialState);

    const [callback, setCallback] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        let cleanup = false;
        const fetchReviews = async () => {
            try {
                if (!cleanup) {
                    const reviews = await Review.getReviews();
                    reviews.sort((a, b) => b.id - a.id)
                    if (reviews !== null) {
                        setReviews(reviews);
                    }
                }
            } catch (err) {
                console.error(err.message)
            }
        };
        fetchReviews();
        return () => cleanup = true;
    }, [callback]);

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }

    const handleSendReview = async () => {
        await Review.sendReview(data.text, currentUser.id).then((response) => {
                data.text = "";
                setMessage(response.data.message);
            }, (err) => {
                setMessage(err.response.data.message);
            }
        );
        setCallback(!callback);
    }

    return (
        <div className='container'>
            <div className="w-50 mx-auto my-5">

                {currentUser ? (
                    <div>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label><p><strong>{currentUser.name},</strong> додайте ваш коментар:</p></Form.Label>
                                <Form.Control as="textarea" rows="4" cols="50" id="text" name="text" value={data.text}
                                              onChange={handleChangeInput}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                <Form.Control type="button" className="button-review" value="Додати" onClick={handleSendReview}/>
                            </Form.Group>
                        </Form>
                    </div>
                ) : (<>
                <h2>Для того, щоб додати коментар, необхідно <Link to="/login">авторизуватися</Link>.</h2>
                </>)}
                {reviews.length > 0 ? <>
                        {reviews.map((review, index) => <div key={index} className="review">
                            <div className='review__header'>
                                <div>
                                    <p className='review__name'>{review.user.name}</p>
                                </div>
                                <div>
                                    <p>
                                        <Moment format="DD.MM.YYYY HH:mm">{review.createdAt}</Moment>
                                    </p>
                                </div>
                            </div>
                            <div className="review__main">
                                <p className="mb-0">{review.text}</p>
                            </div>
                        </div>)}
                </> : <div>
                    <p className='error-title'>Відгуків немає.</p>
                </div>}
            </div>
        </div>
    );
};

export default Reviews;