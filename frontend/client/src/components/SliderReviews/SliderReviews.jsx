import React, {useEffect, useState} from 'react';
import './SliderReviews.scss';
import {Carousel} from "react-bootstrap";
import Review from "../../services/review";
import Moment from "react-moment";


const SliderReviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        let cleanup = false;
        const fetchReviews = async () => {
            try {
                if (!cleanup) {
                    const reviews = await Review.getReviews();
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
    },);
    return (
        <div className='slider-reviews'>
            <div className='section-title'>
                <h3 className='title-black mb-0'>Що говорять наші клієнти про нас?</h3>
            </div>
            <Carousel className='carousel__box' variant='dark' indicators={false}>
                {/*{reviews.length > 0 ? <>*/}
                {/*    {reviews.map((review, index) => <Carousel.Item key={index} className="review">*/}
                {/*        <div className='reviews__row container'>*/}
                {/*            <div className='reviews__item'>*/}
                {/*                <p>{review.text}</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </Carousel.Item>)}*/}
                {/*          </>  : <div>*/}
                {/*        <p className='error-title'>Відгуків немає.</p>*/}
                {/*        </div>}*/}
                {/*    </Carousel>*/}
                <Carousel.Item>
                    <div className='reviews__row container'>
                        <div className='reviews__item'>
                            <p>Відвідую заняття йоги вже 2 тижні. До цього жодного разу не займалася і вперше виконувала
                                асани. Думала будуть проблеми. Але з тренером Олечкою Калуж все вийшло! Приголомшливий
                                інструктор! Уважна і видно, що займається тим, чим подобається.</p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className='reviews__row container'>
                        <div className='reviews__item'>
                            <p>Відвідую заняття йоги вже 2 тижні. До цього жодного разу не займалася і вперше виконувала
                                асани. Думала будуть проблеми. Але з тренером Олечкою Калуж все вийшло! Приголомшливий
                                інструктор! Уважна і видно, що займається тим, чим подобається.</p>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
            <div className='section-button'>
                <button className='button btn-black'>Всі відгуки</button>
            </div>
        </div>
    );
};

export default SliderReviews;